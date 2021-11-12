import { useEffect, useState } from 'react';
import  * as contracts  from "../../types";
import './App.css';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Device } from '../../types';
import * as uuid from 'uuid';
import styled from 'styled-components';

/**
 * LEFT TO DO
 * Create Board with 4 Columns: requested, purchased, shipped, installed. 
 *   
 * As part of a transition, a comment should be added to the 
 * device to signal the state change as well as a timestamp that is automatically 
 * supplied
 * 
 * 
 * When a user opens a device display data AND ALSO notes (state, timechanged)
 * 
 * unit test
 */



 const Container = styled.div`
 display: flex;
`;


function App() {
  const [deviceArray, setDeviceArray] = useState<Device[]>([])
  // const [columns, setColumns] = useState<DeviceColumn[]>([])
  
  const fetchDevices = async () => {
    const response: contracts.DeviceList = await fetch("/api/devices")
      .then(res => res.json())
      .catch(err => console.log(err));
    createDeviceArray(response)
  };

  const createDeviceArray = (list: contracts.DeviceList) => {
    const devices: Device[] = [];
    const arr = [...list.dimmers, ...list.locks, ...list.switches, ...list.thermostats];
    arr.forEach(device => {
      devices.push(device)
    });
    setDeviceArray(devices);
  };

  const test = {
    [uuid.v4()]: {
      name: 'Requested',
      devices: deviceArray
    },
    [uuid.v4()]: {
      name: 'Purchased',
      devices: []
    },
    [uuid.v4()]: {
      name: 'Shipped',
      devices: []
    },
    [uuid.v4()]: {
      name: 'Installed',
      devices: []
    }
  };

  //not complete
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return;
    
    if (destination.droppableId === source.droppableId
      && destination.index === source.index
      ) {
        return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;
    const items = Array.from(deviceArray);

    
    if (start === finish) {

      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 0, newOrder);
      return;
    };


    items.splice(source.index, 1); 
    // const newStart = {
    //   ...items,
    //   deviceArray: items
    // };

};
  
  useEffect(() => {
    fetchDevices();
  });
  

  return (
    <div>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(test).map(([id, column]) => {
            return <Column title={column.name} device={column.devices} />
          })}
        </DragDropContext>
      </Container>
    </div>
  );
}

export default App;
