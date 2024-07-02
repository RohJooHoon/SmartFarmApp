import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, NativeEventEmitter, NativeModules, Platform, PermissionsAndroid, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SERVICE_UUID = 'FFE0';
const CHARACTERISTIC_UUID = 'FFE1';

const Bluetooth: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [data, setData] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

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
      setDevices((prevDevices) => {
        const updatedDevices = [...prevDevices, peripheral];
        return removeDuplicateDevices(updatedDevices);
      });
    };

    const handleStopScan = () => {
      console.log('Scan stopped');
      setIsScanning(false);
    };

    const handleUpdateValueForCharacteristic = (data: any) => {
      console.log('Received data from peripheral:', data);
      setData(data.value);
    };

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    };
  }, []);

  const removeDuplicateDevices = (devices: any[]) => {
    const uniqueDevices = devices.filter((device, index, self) => index === self.findIndex((d) => d.id === device.id));
    return uniqueDevices;
  };

  const startScan = () => {
    if (!isScanning) {
      setDevices([]);
      setIsScanning(true);
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
      });
    }
  };

  const connectDevice = (device: any) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to', device.id);
        setConnectedDevice(device);

        BleManager.retrieveServices(device.id).then((peripheralInfo) => {
          console.log('Peripheral info:', peripheralInfo);

          BleManager.startNotification(device.id, SERVICE_UUID, CHARACTERISTIC_UUID)
            .then(() => {
              console.log('Started notification on', device.id);
            })
            .catch((error) => {
              console.log('Notification error', error);
            });
        });

        BleManager.stopScan().then(() => {
          console.log('Stopped scanning');
          setIsScanning(false);
        });
      })
      .catch((error) => {
        console.log('Connection error', error);
      });
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      BleManager.disconnect(connectedDevice.id)
        .then(() => {
          console.log('Disconnected from', connectedDevice.id);
          setConnectedDevice(null);
          setData(null);
          startScan();
        })
        .catch((error) => {
          console.log('Disconnection error', error);
        });
    }
  };

  const sendData = () => {
    if (connectedDevice) {
      const buffer = Buffer.from(inputValue, 'utf-8');
      console.log('Sending data:', inputValue);
      BleManager.write(connectedDevice.id, SERVICE_UUID, CHARACTERISTIC_UUID, Array.from(buffer))
        .then(() => {
          console.log('Sent data to', connectedDevice.id);
        })
        .catch((error) => {
          console.log('Write error', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {!connectedDevice && (
          <View>
            <Button title="Start Scan" onPress={startScan} />
            {isScanning && <Text>Scanning...</Text>}
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id}
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
        {connectedDevice && (
          <View>
            <Text>Connected to {connectedDevice.name || connectedDevice.id}</Text>
            <Text>Data: {data}</Text>
            <TextInput placeholder="Enter data to send" value={inputValue} onChangeText={setInputValue} />
            <Button title="Send Data" onPress={sendData} />
            <Button title="Disconnect" onPress={disconnectDevice} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
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
