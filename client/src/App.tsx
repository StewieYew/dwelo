import { useEffect, useState } from 'react';
import  * as contracts  from "../../types";
import './App.css';
import Switch from './components/Switch';
import Display from './components/Display'
import Modal from './components/Modal';

function App() {
  const [deviceList, setDeviceList] = useState<contracts.DeviceList>({
    switches: [],
    locks: [],
    dimmers: [],
    thermostats: []
  });


  const fetchDevices = async () => {
    const response: contracts.DeviceList = await fetch("/api/devices")
      .then(res => res.json())
      .catch(err => console.log(err));
    setDeviceList(response);
  };
  
  useEffect(() => {
    fetchDevices();
  }, []);
  
  // const displayModal = () => {
  //   alert("yo!")
  // };


  /*
    When a user opens a device they should be able to view 
    the details of the device and any comments associated with that device.
  */ 

  return (
    <div>
      <Display devices={deviceList.switches} Modal={ Modal }/>

    </div>
  );
}

export default App;
