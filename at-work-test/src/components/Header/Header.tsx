import { FC } from "react";
import st from './Header.module.css';

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
    return (
        <div className={st['header']}>
            <div className={st['header-content']}>
                <div className={st['header-logo']}>
                    <img src="/icons/logo-sign.svg" alt="Логотип компании" />
                    <p>at-<b>work</b></p>
                </div>
                <div className={st['header-user-data']}>
                    <div className={st['icons']}>
                        <button className={st['btn-icon']}>
                        <img src="/icons/favorite.svg" alt="Значок избранное" />
                    </button>
                    <button className={st['btn-icon']}>
                        <img src="/icons/notification.svg" alt="Значок уведомления" />
                    </button>
                    </div>
                    
                    <div className={st['user-photo']}></div>
                    <p className={st['user-name']}>Maria123</p>

                </div>
            </div>

        </div>
    );
}

export default Header;