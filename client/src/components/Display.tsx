import React from 'react'
import Card from 'react-bootstrap/Card'
import { Device } from '../../../types';
import Modal from './Modal';

interface DisplayProps {
    devices: Device[]
    Modal: React.ComponentType
}

const Display = ({ devices, Modal }: DisplayProps) => {
    return (
        <>
            {
                devices.map(device => {
                    
                    return <Card  border="primary" style={{ width: '18rem' }}>
                        <Card.Header>{`${device.name}`}</Card.Header>
                        <Card.Body>
                            <Card.Title>{`${device.type}`}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Modal />
                    </Card>
                })
            
            
            
            }
            
          

        </>
    )
};

export default Display
