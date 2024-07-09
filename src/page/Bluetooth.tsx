import React, {useState} from 'react';
import {View, Text, Button, TextInput, FlatList, StyleSheet} from 'react-native';
import {StoreState} from '@/store';
import {useSelector} from 'react-redux';
import {useBluetooth} from '@/component/Bluetooth';

const Bluetooth: React.FC = () => {
  const storeBluetooth = useSelector((state: StoreState) => state.bluetooth);
  const {startScan, connectDevice, disconnectDevice, sendData} = useBluetooth();
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <View style={styles.container}>
      {!storeBluetooth.connectedDevice && (
        <View>
          <Button title="Start Scan" onPress={startScan} />
          {storeBluetooth.scanning && <Text>Scanning...</Text>}
          <FlatList
            data={storeBluetooth.scannedDevices}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              if (item) {
                return (
                  <View>
                    <Text>{item.name || 'Unnamed Device'}</Text>
                    <Text>ID: {item.id}</Text>
                    <Text>RSSI: {item.rssi}</Text>
                    <Button title="Connect" onPress={() => connectDevice(item)} />
                  </View>
                );
              } else {
                return <Text>not item</Text>;
              }
            }}
          />
        </View>
      )}
      {storeBluetooth.connectedDevice && (
        <View>
          <Text>open</Text>
          <Text style={styles.text}>Connected to {storeBluetooth.connectedDevice.name || storeBluetooth.connectedDevice.id}</Text>
          <Text style={styles.text}>Data: {storeBluetooth.connectedData}</Text>
          <TextInput
            placeholder="Enter data to send"
            value={inputValue}
            onChangeText={(value) => {
              setInputValue(value);
            }}
          />
          <Button
            title="Send Data"
            onPress={() => {
              sendData(inputValue);
              setInputValue('');
            }}
          />
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Bluetooth;
