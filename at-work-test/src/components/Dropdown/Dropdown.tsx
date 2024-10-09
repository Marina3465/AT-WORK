import { forwardRef } from "react";
import st from './Dropdown.module.css'
import { useDispatch } from "react-redux";
import { moveActive, moveArchiveData, moveHiddenData } from "../../store/slices/userDataSlice";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
    id: number,
    active: boolean,
    archive: boolean
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleArchive = () => {
        dispatch(moveArchiveData(props.id));
    }

    const handleHidden = () => {
        dispatch(moveHiddenData(props.id));
    }

    const handleActive = () => {
        dispatch(moveActive(props.id));
    }

    const handleEdit =()=>{
        navigate(`user/${props.id}`);
    }

    return (
        <div className={st['dropdown']} ref={ref} style={{ display: `${props.active ? 'block' : 'none'} ` }}>
            <div className={st['dropdown-content']}>
                {props.archive &&
                        <button className={st['dropdown-btn']} onClick={handleActive}>Активировать</button>
                }
                {!props.archive &&
                    <>
                        <button className={st['dropdown-btn']} onClick={handleEdit}>Редактировать</button>
                        <button className={st['dropdown-btn']} onClick={handleArchive}>Архивировать</button>
                        <button className={st['dropdown-btn']} onClick={handleHidden}>Скрыть</button>
                    </>
                }
            </div>
        </div>
    );
})

export default Dropdown;