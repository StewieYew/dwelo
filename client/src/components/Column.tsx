import styled from 'styled-components';
import Item from './Item';
import { Droppable } from 'react-beautiful-dnd';
import * as uuid from 'uuid'
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
            <Droppable droppableId={uuid.v4()}>
                {provided => (
                    <DeviceListStyle ref={provided.innerRef} {...provided.droppableProps}
                    >
                        {device.map((test, idx) => {
                            return <Item name={test.name} device={test} type={test.type} index={idx} />
                        })}
                        {provided.placeholder}
                    </DeviceListStyle>
                )}
            </Droppable>
        </Container>
    );
};

export default Column
