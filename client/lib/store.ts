import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './features/users/usersSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            users: UsersReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']