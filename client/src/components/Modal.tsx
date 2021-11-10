import React from 'react'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Device } from '../../../types';


interface ModalProps {
  device: Device
  
}

const Modal = ({ device }: ModalProps) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
  
  return (
    <div>
      <button onClick={open}>{`details`}</button>
  
      <Dialog isOpen={showDialog} onDismiss={close}>
        <p>{JSON.stringify(device)}</p>
        <button onClick={close}>Okay</button>
      </Dialog>
    </div>
  );
}

export default Modal
