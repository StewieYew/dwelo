import Card from 'react-bootstrap/Card';
import Modal from './Modal';
import * as uuid from 'uuid';
import { Device } from '../../../types';
import { Draggable } from 'react-beautiful-dnd';

interface ItemProps {
    name: string;
    type: string;
    device: Device;
    index: number;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: `0 15px 50px`,
    background: isDragging ? "clear" : "white",
    color: isDragging ? 'white' : 'black',
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle
});

const Item = ({ name, type, device, index }: ItemProps) => {
    return (
        <Draggable draggableId={`${name} ${index}`} key={uuid.v4()} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header>{`${name}`}</Card.Header>
                        <Card.Body>
                            <Card.Title>{`${type}`}</Card.Title>
                        </Card.Body>
                        <Modal key={uuid.v4()} device={device} />
                    </Card>
                </div>

            )}
        </Draggable>

    )
};

export default Item
