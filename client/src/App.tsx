import { useEffect, useState } from 'react';
import  * as contracts  from "../../types";
import './App.css';
import Display from './components/Display'

/**
 * LEFT TO DO
 * Create Board with 4 Columns: requested, purchased, shipped, installed. 
 * 
 * Drag and drop deach card between given states
 * 
 * As part of a transition, a comment should be added to the 
 * device to signal the state change as well as a timestamp that is automatically 
 * supplied
 * 
 * 
 * When a user opens a device display data AND ALSO notes (state, timechanged)
 */

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
  

  return (
    <div>
      <Display devices={deviceList.switches} />
      <Display devices={deviceList.locks}  />
      <Display devices={deviceList.thermostats}  />
      <Display devices={deviceList.dimmers} />
    </div>
  );
}

export default App;
