import { createAsyncThunk } from "@reduxjs/toolkit";
import requester from "../../common/requester";
import axios from "axios";
import {BASE_URL} from "../../common/requester";

export const registerAction = createAsyncThunk(
    'login/registerAction',
    async ({navigate, ...data}, thunkAPI) => {
        try {
            const response = await axios.post(BASE_URL + '/auth/register', data);
            navigate('/signup/confirm');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const loginAction = createAsyncThunk(
    'login/loginAction',
    async ({navigate, ...data }, thunkAPI) => {
        try {
            let res = await axios.post(BASE_URL + '/auth/login', data);
            localStorage.setItem('token', res.data.accessToken);
            await thunkAPI.dispatch(userInfoAction());
            navigate('/');
            return res.data;
        } catch (error) {
            console.warn(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const userInfoAction = createAsyncThunk(
    'login/userInfoAction',
    async (thunkAPI) => {
        try {
            const response = await requester.get('/user/info');
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
