import styled from 'styled-components';
import DeviceItem from './DeviceItem';
import { Droppable } from 'react-beautiful-dnd';
import { Device } from '../../../types';

interface ColumnProps {
    title: string
    device: Device[]
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40em;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const DeviceListStyle = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height:
`;

const Column = ({ device, title }: ColumnProps) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Droppable droppableId={title}>
                {provided => (
                    <DeviceListStyle ref={provided.innerRef} {...provided.droppableProps}
                    >
                        {device.map((device, idx) => {
                            return <DeviceItem name={device.name} device={device} type={device.type} index={idx} />
                        })}
                        {provided.placeholder}
                    </DeviceListStyle>
                )}
            </Droppable>
        </Container>
    );
};

export default Column
