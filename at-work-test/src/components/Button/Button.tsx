import { FC, ReactNode } from "react";
import st from './Button.module.css';

interface ButtonProps {
    children: ReactNode,
    onClick: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button className={st['button']} onClick={onClick}>{children}</button>
    );
}

export default Button;