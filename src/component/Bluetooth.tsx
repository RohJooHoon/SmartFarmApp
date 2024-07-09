import React, {useEffect, createContext, useContext} from 'react';
import {View, ViewStyle, Platform, PermissionsAndroid, NativeEventEmitter, NativeModules} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '@/store';
import {setIsScanning, setDevices, setConnectedDevice, setData} from '@/store/bluetooth';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface BluetoothProps {
  style?: ViewStyle;
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

const BluetoothProvider: React.FC<BluetoothProps> = ({style, children}) => {
  const dispatch = useDispatch();
  const storeBluetooth = useSelector((state: StoreState) => state.bluetooth);

  useEffect(() => {
    const startBleManager = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
      BleManager.start({showAlert: false});
    };

    startBleManager();

    const handleDiscoverPeripheral = (peripheral: any) => {
      console.log('Discovered peripheral:', peripheral);
      dispatch(
        setDevices((prevDevices: any) => {
          const updatedDevices = [...prevDevices, peripheral];
          return removeDuplicateDevices(updatedDevices);
        })
      );
    };

    const handleStopScan = () => {
      console.log('Scan stopped');
      dispatch(setIsScanning(false));
    };

    const handleUpdateValueForCharacteristic = (data: any) => {
      console.log('Received data from peripheral:', data);
      dispatch(setData(data.value));
    };

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    };
  }, [dispatch]);

  const removeDuplicateDevices = (devices: any[]) => {
    const uniqueDevices = devices.filter((device, index, self) => index === self.findIndex((d) => d.id === device.id));
    return uniqueDevices;
  };

  const startScan = () => {
    if (!storeBluetooth.isScanning) {
      dispatch(setDevices([]));
      dispatch(setIsScanning(true));
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
      });
    }
  };

  const connectDevice = (device: any) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to', device.id);
        dispatch(setConnectedDevice(device));

        BleManager.retrieveServices(device.id).then((peripheralInfo) => {
          console.log('Peripheral info:', peripheralInfo);

          BleManager.startNotification(device.id, storeBluetooth.SERVICE_UUID, storeBluetooth.CHARACTERISTIC_UUID)
            .then(() => {
              console.log('Started notification on', device.id);
            })
            .catch((error) => {
              console.log('Notification error', error);
            });
        });

        BleManager.stopScan().then(() => {
          console.log('Stopped scanning');
          dispatch(setIsScanning(false));
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
          console.log('Disconnected from', storeBluetooth.connectedDevice.id);
          dispatch(setConnectedDevice(null));
          dispatch(setData(null));
          startScan();
        })
        .catch((error) => {
          console.log('Disconnection error', error);
        });
    }
  };

  const sendData = (inputValue: string) => {
    if (storeBluetooth.connectedDevice) {
      const buffer = Buffer.from(inputValue, 'utf-8');
      console.log('Sending data:', inputValue);
      BleManager.write(storeBluetooth.connectedDevice.id, storeBluetooth.SERVICE_UUID, storeBluetooth.CHARACTERISTIC_UUID, Array.from(buffer))
        .then(() => {
          console.log('Sent data to', storeBluetooth.connectedDevice.id);
        })
        .catch((error) => {
          console.log('Write error', error);
        });
    }
  };

  return (
    <BluetoothContext.Provider value={{startScan, connectDevice, disconnectDevice, sendData}}>
      <View style={style}>{children}</View>
    </BluetoothContext.Provider>
  );
};

export default BluetoothProvider;
