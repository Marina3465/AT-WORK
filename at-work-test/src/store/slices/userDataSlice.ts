import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../pages/Users/Users";

interface IUserData {
    datas: IUser[],
    archiveDatas: IUser[],
    hiddenDatas: IUser[]
}

const initialState: IUserData = {
    datas: [],
    archiveDatas: [],
    hiddenDatas: []
}

export const userDataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            if (localStorage.getItem('data') && localStorage.getItem('data') !== undefined
                && localStorage.getItem('data_archive') && localStorage.getItem('data_archive') !== undefined
                && localStorage.getItem('data_hidden') && localStorage.getItem('data_hidden') !== undefined) {

                state.datas = JSON.parse(localStorage.getItem('data')!);
                state.archiveDatas = JSON.parse(localStorage.getItem('data_archive')!);
                state.hiddenDatas = JSON.parse(localStorage.getItem('data_hidden')!);
            } else {
                state.datas = action.payload;
                state.archiveDatas = [];
                state.hiddenDatas = [];
                localStorage.setItem('data', JSON.stringify(action.payload));
            }

        },
        moveArchiveData: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            const userIndex = state.datas.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                const [element] = state.datas.splice(userIndex, 1);
                state.archiveDatas.push(element);
                localStorage.setItem('data', JSON.stringify(state.datas));
                localStorage.setItem('data_archive', JSON.stringify(state.archiveDatas));

            }
        },
        moveHiddenData: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            const userIndex = state.datas.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                const [element] = state.datas.splice(userIndex, 1);
                state.hiddenDatas.push(element);
                localStorage.setItem('data', JSON.stringify(state.datas));
                localStorage.setItem('data_hidden', JSON.stringify(state.hiddenDatas));
            }
        },
        moveActive: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            const userIndex = state.archiveDatas.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                const [element] = state.archiveDatas.splice(userIndex, 1);
                state.datas.push(element);
                localStorage.setItem('data', JSON.stringify(state.datas));
                localStorage.setItem('data_archive', JSON.stringify(state.archiveDatas));
            }
        }
    },
})

export const { moveArchiveData, moveHiddenData, moveActive, setUsers } = userDataSlice.actions;
export default userDataSlice.reducer;
