import { useEffect, useReducer, useRef, useState } from 'react';
import  * as contracts  from "../../types";
import './App.css';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Device } from '../../types';
import styled from 'styled-components';


/**
 *  left to implement:
 * 
 * As part of a transition, a comment should be added to the 
 * device to signal the state change as well as a timestamp that is automatically 
 * supplied
 * 
 * When a user opens a device (state, timechanged)
 * 
 * unit test
 */


 const Container = styled.div`
 display: flex;
 justify-content: center;
`;


interface ColumProps {
  [name: string]: {
    id: string,
    devices: Device[],
  }
}

// interface DeviceStatus {
//   state: string
//   timeStateChanged: Date
// }

function App() {
  const [columns, setColumns] = useState<ColumProps>({});
  const referenceFetchDevices = useRef(() => { });
  // const [device, setDevice] = useState<Device>();
  // const [state, dispatch] = useReducer(dragReducer, );

  const fetchDevices = async () => {
    const response: contracts.DeviceList = await fetch("/api/devices")
      .then(res => res.json())
      .catch(err => console.log(err));
    createColumns(response);
  };

  referenceFetchDevices.current = () => {
    fetchDevices();
  };


  const createColumns = (list: contracts.DeviceList) => {
    const devices: Device[] = [];
    const arr = [...list.dimmers, ...list.locks, ...list.switches, ...list.thermostats];
    arr.forEach(device => {
      devices.push(device);
    });
    setColumns({
      Requested: {
        id: 'Requested',
        devices: devices,
      },
      Purchased: {
        id: 'Purchased',
        devices: [] as Device[]
      },
      Shipped: {
        id: 'Shipped',
        devices: [] as Device[]
      },
      Installed: {
        id: 'Installed',
        devices: [] as Device[]
      }
    }
    );
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
     // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

     // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;
 
     // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];
 
     // If start is the same as end, we're in the same column
     if (start === end) {
       // Move the item within the list
       // Start by making a new list without the dragged item
       const newList = start.devices.filter(
         (_: any, idx: number) => idx !== source.index
       );
 
       // Then insert the item at the right location
       newList.splice(destination.index, 0, start.devices[source.index]);
 
       // Then create a new copy of the column object
       const newCol = {
         id: start.id,
         devices: newList
       };
 
       // Update the state
       setColumns(state => ({ ...state, [newCol.id]: newCol }));
       return null;
     } else {
       // If start is different from end, we need to update multiple columns
       // Filter the start list like before
       const newStartList = start.devices.filter(
         (_: any, idx: number) => idx !== source.index
       );
 
       // Create a new start column
       const newStartCol = {
         id: start.id,
         devices: newStartList
       };
 
       // Make a new end list array
       const newEndList = end.devices;
 
       // Insert the item into the end list
       newEndList.splice(destination.index, 0, start.devices[source.index]);
    
 
       // Create a new end column
       const newEndCol = {
         id: end.id,
         devices: newEndList
       };

       setColumns(state => ({
         ...state,
         [newStartCol.id]: newStartCol,
         [newEndCol.id]: newEndCol,
          
       }));

       return null;
     }
};
  
  useEffect(() => {
    referenceFetchDevices.current();
  }, []);
  

  return (
    <div>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          {
            Object.values(columns).map((col) => {
              return (col.id && col.devices) ?
                <Column title={col.id} device={col.devices} />
                : <div>loading...</div>
          })
          }
        </DragDropContext>
      </Container>
    </div>
  );
}

export default App;
