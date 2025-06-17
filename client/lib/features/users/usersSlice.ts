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

            // login user
            .addCase(loginUser.pending, state =>{
                state.loginStatus = false;
            })
            .addCase(loginUser.fulfilled, (state, action) =>{
                // console.log('LOGIN PAYLOAD:', action.payload);
                state.loginStatus = true;
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, state =>{
                // console.log('LOGIN REJECTED:');
                state.loginStatus = false;
            })

            // current user
            .addCase(fetchCurrentUser.pending, state => {
                state.loginStatus = false
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>{
                // console.log('CURRENTUSER PAYLOAD:', action.payload);
                state.loginStatus = true;
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.loginStatus = false
            })

            // logout user
            .addCase(logoutUser.pending, state =>{
                state.loginStatus = true
            })
            .addCase(logoutUser.fulfilled, (state) =>{
                // console.log('LOGOUT PAYLOAD:', action.payload);
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

        return resp.data;
    }
);

export const logoutUser = createAsyncThunk(
    'users/logout',
    async () =>{
        let resp = await axios.get('http://localhost:8080/auth/signout', {withCredentials: true});
        let currentUser = resp.data;
        // console.log('SLICE LOGOUT:', currentUser);
        return currentUser;
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async (body: {email: string, password: string}) =>{
        try{
            let resp = await axios.post(
                'http://localhost:8080/auth/signin',
                body,
                {
                    // validateStatus: function (status) {
                    //     return status < 500; // Resolve only if status code is < 500
                    // },
                    withCredentials: true // Attach cookies
                }
            );
            // console.log('LOGIN RESP:', resp.data);
            return resp.data;
        }
        catch(err){
            throw Error();
        }
    }
);

export default loginSlice.reducer;