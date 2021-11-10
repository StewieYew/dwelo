import Card from 'react-bootstrap/Card'
import { Device } from '../../../types';
import Modal from './Modal'

interface DisplayProps {
    devices: Device[]
}

const Display = ({ devices }: DisplayProps) => {
    return (
        <>
            {
                devices.map((device, idx) => {
                    return <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header>{`${device.name}`}</Card.Header>
                        <Card.Body>
                            <Card.Title>{`${device.type}`}</Card.Title>
                            <Card.Text>
                                {`state prolly`}
                            </Card.Text>
                        </Card.Body>
                        <Modal key={idx} device={device} />
                    </Card>
                })
            }
        </>
    )
};

export default Display
