import {createAsyncThunk} from "@reduxjs/toolkit";
import requester from "../../common/requester";


export const getStatisticsAction = createAsyncThunk(
    'game/statistics',
    async ({...params}, thunkAPI) => {
        try {
            const response = await requester.get("/statistics", params);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }

    }
)

export const getMyStatisticsAction = createAsyncThunk(
    'game/statistics',
    async ({...params}, thunkAPI) => {
        try {
            const response = await requester.get("/my/statistics", params);
            return response.data;
        }
        catch (e) {
            thunkAPI.rejectWithValue(e);
        }

    }
)