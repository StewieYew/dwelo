import React from 'react'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Device } from '../../../types';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;



interface ModalProps {
  device: Device
  
}

const Modal = ({ device }: ModalProps) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
  
  return (
    <div>
      <Button onClick={open}>{`details`}</Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <p>{JSON.stringify(device)}</p>
        <button onClick={close}>Okay</button>
      </Dialog>
    </div>
  );
}

export default Modal
