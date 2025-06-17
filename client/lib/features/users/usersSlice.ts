import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    currentUser: {},
    loginStatus: false
}

export const loginSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUser.pending, state => {
                state.loginStatus = false
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>{
                console.log('CURRENTUSER PAYLOAD:', action.payload);
                state.loginStatus = true;
                state.currentUser = action.payload
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.loginStatus = false
            })

            .addCase(logoutUser.pending, state =>{
                state.loginStatus = true
            })
            .addCase(logoutUser.fulfilled, (state, action) =>{
                console.log('LOGOUT PAYLOAD:', action.payload);
                state.loginStatus = false;
                state.currentUser = {};
            })
            .addCase(logoutUser.rejected, state =>{
                state.loginStatus = true;
            })

    }
});

export const fetchCurrentUser = createAsyncThunk(
    'users/currenuser',
    async () =>{
        let resp = await axios.get('http://localhost:8080/auth/currentuser', {withCredentials: true});
        let currentUser = resp.data;

        return currentUser;
    }
);

export const loginUser = createAsyncThunk(
    'users/logout',
    async () =>{
        let resp = await axios.get('http://localhost:8080/auth/signout', {withCredentials: true});
        let currentUser = resp.data;

        return currentUser;
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async () =>{
        let resp = await axios.get('http://localhost:8080/auth/logout', {withCredentials: true});

        return resp.data;
    }
);

export default loginSlice.reducer;