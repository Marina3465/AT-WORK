import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/APISlice";
import { userDataSlice } from "./slices/userDataSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: userDataSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
})

export type RootState = ReturnType<typeof store.getState>;
