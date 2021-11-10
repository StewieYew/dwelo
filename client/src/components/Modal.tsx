import React from 'react'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { DeviceList } from '../../../types';


interface ModalProps {
    name: String
}

const Modal = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
  
  return (
    <div>
      <button onClick={open}>{`Show`}</button>
  
      <Dialog style={{ color: "red" }} isOpen={showDialog} onDismiss={close}>
        <p>My text is red because the style prop got applied to the div</p>
        <button onClick={close}>Okay</button>
      </Dialog>
    </div>
  );
}

export default Modal
