import {createSlice} from "@reduxjs/toolkit";
import {loginAction, registerAction, userInfoAction} from "./action";

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

export const loginSlice = createSlice({
    name: 'login',
    initialState: {error: '', isLoad: false, token: token || null, user: user || null},
    reducers: {
        signOut: (state) => {
            state.token = null
            state.user= null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.isLoad = false;
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.isLoad = false;
            state.error = action.payload.response.data.message;
        });
        builder.addCase(registerAction.pending, (state) => {
            state.isLoad = true;
        });

        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.isLoad = false;
            state.error = '';
            state.token = action.payload.accessToken
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isLoad = false;
            state.error = action.payload.response.data.message;
        });
        builder.addCase(loginAction.pending, (state) => {
            state.isLoad = true;
        });
        builder.addCase(userInfoAction.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
});

export const {signOut} = loginSlice.actions