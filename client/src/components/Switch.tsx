import Modal from './Modal';

interface SwitchProps {
    name: string;
    onClickHandler: () => void;
  }

const Switch = (props: SwitchProps) => {
    return (
        <>
        <button onClick={props.onClickHandler}>
            {props.name}
        </button>
        <Modal />
        </>
    );
}


export default Switch;


