import BleManager from 'react-native-ble-manager';
import React, {useEffect, createContext, useContext} from 'react';
import {Platform, PermissionsAndroid, NativeEventEmitter, NativeModules} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState, AppDispatch} from '@/store';
import {setScanning, setScannedDevices, setConnectedDevice, setConnectedData, setInputValue} from '@/store/bluetooth';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface BluetoothProps {
  children: React.ReactNode;
}

interface CreateContext {
  startScan: () => void;
  connectDevice: (device: any) => void;
  disconnectDevice: () => void;
  sendData: (inputValue: string) => void;
}

const BluetoothContext = createContext<CreateContext | undefined>(undefined);

export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};

const BluetoothProvider: React.FC<BluetoothProps> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();
  const storeBluetooth = useSelector((state: StoreState) => state.bluetooth);

  useEffect(() => {
    const startBleManager = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
      BleManager.start({showAlert: false, restoreIdentifierKey: 'BleManagerRestore'});
    };

    startBleManager();

    const handleDiscoverPeripheral = (peripheral: any) => {
      const updatedDevices = [...storeBluetooth.scannedDevices, peripheral];
      const uniqueDevices = removeDuplicateDevices(updatedDevices);
      dispatch(setScannedDevices(uniqueDevices));
    };

    const handleStopScan = () => {
      dispatch(setScanning(false));
    };

    const handleUpdateValueForCharacteristic = (data: any) => {
      dispatch(setConnectedData(data.value));
    };

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    };
  }, [dispatch, storeBluetooth.scannedDevices]);

  const removeDuplicateDevices = (devices: any[]) => {
    const uniqueDevices = devices.filter((device, index, self) => index === self.findIndex((d) => d.id === device.id));
    return uniqueDevices;
  };

  const startScan = () => {
    if (!storeBluetooth.scanning) {
      dispatch(setScannedDevices([]));
      dispatch(setScanning(true));
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
      });
    }
  };

  const connectDevice = (device: any) => {
    BleManager.connect(device.id)
      .then(() => {
        dispatch(setConnectedDevice(device));

        BleManager.retrieveServices(device.id).then((peripheralInfo) => {
          BleManager.startNotification(device.id, storeBluetooth.SERVICE_UUID, storeBluetooth.CHARACTERISTIC_UUID).catch((error) => {
            console.log('Notification error', error);
          });
        });

        BleManager.stopScan().then(() => {
          dispatch(setScanning(false));
        });
      })
      .catch((error) => {
        console.log('Connection error', error);
      });
  };

  const disconnectDevice = () => {
    if (storeBluetooth.connectedDevice) {
      BleManager.disconnect(storeBluetooth.connectedDevice.id)
        .then(() => {
          dispatch(setConnectedDevice(null));
          dispatch(setConnectedData(null));
          startScan();
        })
        .catch((error) => {
          console.log('Disconnection error', error);
        });
    }
  };

  const sendData = () => {
    if (storeBluetooth.connectedDevice) {
      const buffer = Buffer.from(storeBluetooth.inputValue, 'utf-8');
      BleManager.write(storeBluetooth.connectedDevice.id, storeBluetooth.SERVICE_UUID, storeBluetooth.CHARACTERISTIC_UUID, Array.from(buffer)).catch((error) => {
        console.log('Write error', error);
      });
    }
  };

  return <BluetoothContext.Provider value={{startScan, connectDevice, disconnectDevice, sendData}}>{children}</BluetoothContext.Provider>;
};

export default BluetoothProvider;
