import { FC, useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadItem } from "../../store/slices/userDataSlice";

interface DataProfileProps {
    modalOpen: boolean,
    setModalOpen: (val: boolean) => void
}

export interface IData {
    id: number,
    name: string | undefined,
    username: string | undefined,
    email: string | undefined,
    phone: string | undefined,
    company: {
        name: string | undefined
    },
    address: {
        city: string | undefined
    }
}

const DataProfile: FC<DataProfileProps> = (props) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [name, setName] = useState<string | undefined>('');
    const [userName, setUserName] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [phone, setPhone] = useState<string | undefined>('');
    const [company, setCompany] = useState<string | undefined>('');
    const [city, setCity] = useState<string | undefined>('');

    useEffect(() => {
        const localDate: IData[] = JSON.parse(localStorage.getItem('data')!);
        if (localDate && localDate !== undefined) {
            let item = localDate.find((r) => r.id === Number(id));
            setName(item?.name);
            setUserName(item?.username);
            setEmail(item?.email);
            setPhone(item?.phone);
            setCompany(item?.company.name);
            setCity(item?.address.city);
        }

    }, []);

    const onSubmit = () => {

        if (!(name === '' || userName === '' || email === '' || phone === '' || company === '' || city === '')) {
            const item: IData = {
                id: Number(id),
                name: name,
                username: userName,
                email: email,
                phone: phone,
                company: {
                    name: company
                },
                address: {
                    city: city
                }
            }
            dispatch(uploadItem(item));
            props.setModalOpen(true);
            document.body.style.overflow = 'hidden';
        }
    }

    return (
        <div>
            <h1>Данные профиля</h1>

            <Input
                label={'Имя'}
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input
                label={'Никнейм'}
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            />
            <Input
                label={'Почта'}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Input
                label={'Город'}
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            />
            <Input
                label={'Телефон'}
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
            <Input
                label={'Название компании'}
                value={company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
            />

            <Button onClick={onSubmit}>Сохранить</Button>
        </div>
    );
}

export default DataProfile;