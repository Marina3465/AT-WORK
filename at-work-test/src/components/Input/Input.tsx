import { ChangeEvent, FC } from "react";
import st from './Input.module.css';

interface InputProps {
    label: string,
    value: string | undefined,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
    return (
        <div className={st['input']}>
            <label htmlFor="input">{props.label}</label>
            <input type="text" id="input" value={props.value} onChange={props.onChange} style={{border: `${!props.value ? '1px solid red' : ''}`}} />
            {!props.value &&
                <div className={st['error']}>Введите значение</div>
            }
        </div>
    );
}

export default Input;