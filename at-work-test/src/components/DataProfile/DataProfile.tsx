import { FC } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface DataProfileProps {

}

const DataProfile: FC<DataProfileProps> = () => {
    return (
        <div>
            <h1>Данные профиля</h1>
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
            <Button>Сохранить</Button>
        </div>
    );
}

export default DataProfile;