import { FC, useState } from "react";
import Header from "../../components/Header/Header";
import st from './EditUser.module.css';
import { useNavigate } from "react-router-dom";
import DataProfile from "../../components/DataProfile/DataProfile";
import Modal from "../../components/Modal/Modal";

interface EditUserProps {

}

const EditUser: FC<EditUserProps> = () => {
    const navigate = useNavigate();
    const [dataProf, setDataProf] = useState<boolean>(true);
    const [workSpace, setWorkSpace] = useState<boolean>(false);
    const [dataPrivate, setDataPrivate] = useState<boolean>(false);
    const [security, setSecurity] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);


    const backToMainPage = () => {
        navigate('/');
    }

    const getData = (value: string) => {
        setDataProf(false);
        setWorkSpace(false);
        setDataPrivate(false);
        setSecurity(false);
        switch (value) {
            case 'prof':
                setDataProf(true);
                break;
            case 'space':
                setWorkSpace(true);
                break;
            case 'prive':
                setDataPrivate(true);
                break;
            case 'secur':
                setSecurity(true);
                break;
        }
    }
    return (
        <>
            <Header />
            <div className='content'>
                <button className={st['btn-back']} onClick={backToMainPage}>Назад</button>
                <div className={st['data-blocks']}>
                    <div className={st['menu']}>
                        <div className={st['photo']} style={{backgroundImage: 'url("/photo.jpg")'}}>
                        </div>
                        <div className={st['btn-select-data']}>
                            <button onClick={() => getData('prof')} style={{ color: `${dataProf ? 'black' : ''}` }}>Данные профиля</button>
                            <button onClick={() => getData('space')} style={{ color: `${workSpace ? 'black' : ''}` }}>Рабочие пространство</button>
                            <button onClick={() => getData('prive')} style={{ color: `${dataPrivate ? 'black' : ''}` }}>Приватность</button>
                            <button onClick={() => getData('secur')} style={{ color: `${security ? 'black' : ''}` }}>Безопасность</button>
                        </div>
                    </div>
                    <div className={st['data']}>
                        {dataProf &&
                            <DataProfile modalOpen={modalOpen} setModalOpen={setModalOpen} />
                        }
                        {workSpace &&
                            <>
                                <h1>Рабочие пространство</h1>
                                <p>Нет данных</p>
                            </>
                        }
                        {dataPrivate &&
                            <>
                                <h1>Приватность</h1>
                                <p>Нет данных</p>
                            </>
                        }
                        {security &&
                            <>
                                <h1>Безопасность</h1>
                                <p>Нет данных</p>
                            </>
                        }
                    </div>

                </div>
            </div>
            {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
        </>
    );
}

export default EditUser;