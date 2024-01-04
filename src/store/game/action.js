import {createAsyncThunk} from "@reduxjs/toolkit";
import requester from "../../common/requester";

export const startGameAction = createAsyncThunk(
    'game/start',
    async (thunkAPI) => {
        try {
            const response = await requester.post('/game/start', null);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const guessAction = createAsyncThunk(
    'game/guess',
    async ({...data}, thunkAPI) => {
        try {
            const response = await requester.post('/game/guess', data);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
