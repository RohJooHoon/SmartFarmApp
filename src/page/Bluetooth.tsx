import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useBluetooth} from '@/component/Bluetooth';
import {StoreState} from '@/store';

const Bluetooth: React.FC = () => {
  const storeBluetooth = useSelector((state: StoreState) => state.bluetooth);
  const {startScan, connectDevice, disconnectDevice, sendData} = useBluetooth();
  const [inputValue, setInputValue] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [volt, setVolt] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [soilMoisture, setSoilMoisture] = useState<string>('');

  useEffect(() => {
    if (storeBluetooth.connectedData) {
      const data = storeBluetooth.connectedData.split(',');
      console.log('data : ', data);
      setVolt(data[0]);
      setTemperature(data[1]);
      setHumidity(data[2]);
      setSoilMoisture(data[3]);
    }
  }, [storeBluetooth.connectedData]);

  return (
    <View style={styles.container}>
      {!storeBluetooth.connectedDevice ? (
        <View>
          <Button title="Start Scan" onPress={startScan} />
          {storeBluetooth.scanning && <Text>Scanning...</Text>}
          <FlatList
            data={storeBluetooth.scannedDevices.filter((device) => device.name)} // 이름이 없는 장치를 필터링
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
      ) : (
        <View>
          <Text style={styles.text}>연결 기기 : {storeBluetooth.connectedDevice.name || storeBluetooth.connectedDevice.id}</Text>
          <Text style={styles.text}>온도 : {temperature}°C</Text>
          <Text style={styles.text}>볼트 : {volt}V</Text>
          <Text style={styles.text}>공중 습도 : {humidity}%</Text>
          <Text style={styles.text}>토양 습도 : {soilMoisture}%</Text>
          <TextInput
            style={styles.textInput}
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
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    flexWrap: 'nowrap',
  },
  textInput: {
    height: 20,
    fontSize: 18,
    borderColor: '#333',
    borderWidth: 1,
  },
});

export default Bluetooth;
