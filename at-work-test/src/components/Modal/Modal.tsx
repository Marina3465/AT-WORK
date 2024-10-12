import { FC, useEffect } from "react";
import st from './Modal.module.css';

interface ModalProps {
    modalOpen: boolean,
    setModalOpen: (val: boolean) => void
}

const Modal: FC<ModalProps> = (props) => {
    const close = () => {
        props.setModalOpen(false);
        document.body.style.overflow = '';
    }

    useEffect(() => {
        setTimeout(() => {
            props.setModalOpen(false);
            document.body.style.overflow = '';
        }, 2000)
    }, [props.modalOpen === true])

    return (
        <div className={st['modal-bg']}>
            <div className={st['modal']}>
                <button onClick={close} className={st['btn-close']}><img src="/icons/close.svg" alt="Кнопка закрыть" /></button>
                <div className={st['icon']}></div>
                <p>Изменения сохранены!</p>
            </div>
        </div>
    );
}

export default Modal;