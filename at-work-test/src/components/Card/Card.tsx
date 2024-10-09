import { FC } from "react";
import st from './Card.module.css';
import Dropdown from "../Dropdown/Dropdown";
import { useDropdown } from "../../hooks/useDropdown";

interface CardProps {
    id: number,
    name: string,
    company: string,
    city: string,
    colorBlack: boolean
    archive: boolean
}

const Card: FC<CardProps> = (props) => {
    const { isOpen, toggleDropdown, dropdownRef, buttonRef } = useDropdown<HTMLDivElement>();


    return (
        <>
            <div className={st['card']}>
                <div className={st['card-content']}>
                    <div className={st['card-photo']}>
                        <img src="/photo.jpg" alt="Фото пользователя" style={{ filter: `${props.colorBlack && 'grayscale(100%)'}` }} />
                    </div>
                    <div className={st['card-data']}>
                        <p className={st['user-name']}>{props.name}</p>
                        <p className={st['company-name']}>{props.company}</p>
                        <p className={st['city']}>{props.city}</p>
                    </div>
                </div>
                <button className={st['btn-more']} ref={buttonRef} onClick={toggleDropdown}></button>
                {isOpen && <Dropdown archive={props.archive} active={isOpen} ref={dropdownRef} id={props.id} />}
            </div>
        </>
    );
}

export default Card;