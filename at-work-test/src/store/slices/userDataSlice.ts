import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../components/DataProfile/DataProfile";

interface IUserData {
    datas: IData[],
    archiveDatas: IData[],
    hiddenDatas: IData[]
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
        setUsers: (state, action: PayloadAction<IData[]>) => {
            if (localStorage.getItem('data') && localStorage.getItem('data') !== undefined) {
                state.datas = JSON.parse(localStorage.getItem('data')!);
            } else {
                state.datas = action.payload;
                localStorage.setItem('data', JSON.stringify(action.payload));
            }
            if (localStorage.getItem('data_archive') && localStorage.getItem('data_archive') !== undefined) {
                state.archiveDatas = JSON.parse(localStorage.getItem('data_archive')!);
            } else {
                state.archiveDatas = [];
            }
            if (localStorage.getItem('data_hidden') && localStorage.getItem('data_hidden') !== undefined) {
                state.hiddenDatas = JSON.parse(localStorage.getItem('data_hidden')!);
            } else {
                state.hiddenDatas = [];
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
        },
        uploadItem: (state, action: PayloadAction<IData>) => {
            const user = action.payload;
            state.datas = state.datas.map(r => 
                r.id === user.id ? {
                    ...r,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    company: {
                        ...r.company,
                        name: user.company.name
                    },
                    address: {
                        ...r.address,
                        city: user.address.city
                    }
                } : r
            );
            
            localStorage.setItem('data', JSON.stringify(state.datas));
        }
        
        
    },
})

export const { moveArchiveData, moveHiddenData, moveActive, setUsers, uploadItem } = userDataSlice.actions;
export default userDataSlice.reducer;
