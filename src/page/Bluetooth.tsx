import BleManager from 'react-native-ble-manager';
import {View, Button, Text, TextInput, FlatList, StyleSheet, NativeModules, NativeEventEmitter, Platform, PermissionsAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '@/store';
import {setScanning, setScannedDevices, setConnectedDevice, setConnectedData, setInputValue} from '@/store/bluetooth';
import {useEffect} from 'react';
import {Buffer} from 'buffer';
import _ from 'lodash';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SERVICE_UUID = 'FFE0';
const CHARACTERISTIC_UUID = 'FFE1';

const Bluetooth: React.FC = () => {
  const dispatch = useDispatch();
  const bluetoothState = useSelector((state: StoreState) => state.bluetooth);

  useEffect(() => {
    const startBleManager = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
      BleManager.start({showAlert: false, restoreIdentifierKey: 'BleManagerRestore'});
    };

    startBleManager();

    const handleDiscoverPeripheral = (peripheral: any) => {
      const prevScannedDevices = _.cloneDeep(bluetoothState.scannedDevices);
      const updatedDevices = [...prevScannedDevices, peripheral];
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
  }, [dispatch, bluetoothState.scannedDevices]);

  const removeDuplicateDevices = (devices: any[]) => {
    const uniqueDevices = devices.filter((device, index, self) => index === self.findIndex((d) => d.id === device.id));
    return uniqueDevices;
  };

  const startScan = () => {
    if (!bluetoothState.scanning) {
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
          BleManager.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_UUID).catch((error) => {
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
    if (bluetoothState.connectedDevice) {
      BleManager.disconnect(bluetoothState.connectedDevice.id)
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
    if (bluetoothState.connectedDevice) {
      const buffer = Buffer.from(bluetoothState.inputValue, 'utf-8');
      BleManager.write(bluetoothState.connectedDevice.id, SERVICE_UUID, CHARACTERISTIC_UUID, Array.from(buffer)).catch((error) => {
        console.log('Write error', error);
      });
    }
  };

  return (
    <View style={styles.container}>
      {!bluetoothState.connectedDevice && (
        <View>
          <Button title="Start Scan" onPress={startScan} />
          {bluetoothState.scanning && <Text>Scanning...</Text>}
          <FlatList
            data={bluetoothState.scannedDevices}
            keyExtractor={(item) => item.id || item.advertising.localName || Math.random().toString()}
            renderItem={({item}) => (
              <View>
                <Text>{item.name || 'Unnamed Device'}</Text>
                <Text>ID: {item.id}</Text>
                <Text>RSSI: {item.rssi}</Text>
                <Button title="Connect" onPress={() => connectDevice(item)} />
              </View>
            )}
          />
        </View>
      )}
      {bluetoothState.connectedDevice && (
        <View>
          <Text>Connected to {bluetoothState.connectedDevice.name || bluetoothState.connectedDevice.id}</Text>
          <Text>Data: {bluetoothState.connectedData}</Text>
          <TextInput placeholder="Enter data to send" value={bluetoothState.inputValue} onChangeText={(text) => dispatch(setInputValue(text))} />
          <Button title="Send Data" onPress={sendData} />
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Bluetooth;
