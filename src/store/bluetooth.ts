import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';

// Define a type for the slice state
export interface BluetoothState {
  scanning: boolean;
  scannedDevices: any[];
  connectedDevice: any;
  connectedData: string;
  inputValue: string;
}

// Define the initial state using that type
const initialState: BluetoothState = {
  scanning: false,
  scannedDevices: [],
  connectedDevice: null,
  connectedData: '',
  inputValue: '',
};

function dataSet(state: BluetoothState, action: PayloadAction, target: string) {
  const clone: any = _.cloneDeep(state);
  clone[target] = action.payload;
  return clone;
}

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setScanning: (state, action) => dataSet(state, action, 'scanning'),
    setScannedDevices: (state, action) => dataSet(state, action, 'scannedDevices'),
    setConnectedDevice: (state, action) => dataSet(state, action, 'connectedDevice'),
    setConnectedData: (state, action) => dataSet(state, action, 'connectedData'),
    setInputValue: (state, action) => dataSet(state, action, 'inputValue'),
  },
});

export const {setScanning, setScannedDevices, setConnectedDevice, setConnectedData, setInputValue} = bluetoothSlice.actions;

export default bluetoothSlice;
