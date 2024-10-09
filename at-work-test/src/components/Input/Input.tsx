import { FC } from "react";
import st from './Input.module.css';

interface InputProps {

}

const Input: FC<InputProps> = () => {
    return (
        <div className={st['input']}>
            <label htmlFor="input">Данные</label>
            <input type="text" id="input" />
        </div>
    );
}

export default Input;