import { render, screen } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const testDevice = { "name": "light switch 1", "type": "SWITCH", "state": "off" }

test("Device information renders on page", () => {
    render(
        <DragDropContext onDragEnd={() => { }}>
            <Column title={""} device={[testDevice]} />
        </DragDropContext>
    )
    const deviceName = screen.getByText(/light switch 1/i);
    expect(deviceName).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "light switch 1 SWITCH View Details" })).toBeInTheDocument();
});