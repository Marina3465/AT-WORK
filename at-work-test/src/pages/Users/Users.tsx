import { FC, useEffect } from "react";
import st from './Users.module.css';
import Card from "../../components/Card/Card";
import { useGetPostsQuery } from "../../store/slices/APISlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUsers } from "../../store/slices/userDataSlice";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { IData } from "../../components/DataProfile/DataProfile";

interface UsersProps {

}


const Users: FC<UsersProps> = () => {
    const users = useSelector((state: RootState) => state.users.datas);
    const archive = useSelector((state: RootState) => state.users.archiveDatas);
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetPostsQuery(undefined,
        {
            refetchOnReconnect: true,
            refetchOnFocus: true
        }
    );

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
        }
    }, [data, dispatch]);

    const reloadData = () => {
        localStorage.removeItem('data_archive');
        localStorage.removeItem('data_hidden');
        localStorage.removeItem('data');
        dispatch(setUsers(data));
    }

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке данных</div>;
    return (
        <>
            <Header />
            <div className='content'>
                <div className={st['user-active']}>
                    <h1>Активные</h1>
                    <div className={st['active-content']}>
                        {users.map((user: IData) => {
                            return <Card key={user.id} archive={false} id={user.id} name={user.username} company={user.company.name} city={user.address.city} colorBlack={false} />
                        })
                        }
                    </div>
                </div>

                <div className={st['user-archive']}>
                    <h1>Архив</h1>
                    <div className={st['archive-content']}>
                        {archive.map((user: IData) => {
                            return <Card key={user.id} archive={true} id={user.id} name={user.username} company={user.company.name} city={user.address.city} colorBlack={true} />
                        })
                        }
                    </div>
                </div>
                <Button onClick={reloadData}>Загрузить заново данные</Button>
            </div>
        </>
    );
}

export default Users;