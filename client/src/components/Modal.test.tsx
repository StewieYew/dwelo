import { fireEvent, render, screen } from "@testing-library/react";
import { Card } from "react-bootstrap";
import Modal from "./Modal";

const testDevice = { "name": "light switch 1", "type": "SWITCH", "state": "off" }

test('Modal opens and content appears', () => {
    render(
        <Card className="text-center">
            <Card.Header>{`light switch 1`}</Card.Header>
            <Card.Body>
                <Card.Title>{`Title`}</Card.Title>
            </Card.Body>
            <Modal key={"abc123"} device={testDevice} />
        </Card>
    )
    const button = screen.getByRole('button', { name: /view details/i })            
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
});