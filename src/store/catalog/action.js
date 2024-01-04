import {createAsyncThunk} from "@reduxjs/toolkit";
import requester, {BASE_URL} from "../../common/requester";

export const getCatalogAction = createAsyncThunk(
    'catalog/getCatalogAction',
    async ({...data}, thunkAPI) => {
        try {
            const response = await requester.get('/catalog/words', data);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const addWordAction = createAsyncThunk(
    'catalog/addWordAction',
    async ({query, page, size, ...newWord}, thunkAPI) => {
        try {
            const response = await requester.post('/catalog/words', newWord);
            thunkAPI.dispatch(getCatalogAction({query, page, size}));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateWordAction = createAsyncThunk(
    'catalog/updateWord',
    async ({query, page, size, ...updateWord}, thunkAPI) => {
        try {
            const response = await requester.put('/catalog/words', updateWord);
            thunkAPI.dispatch(getCatalogAction({query, page, size}));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteWordAction = createAsyncThunk(
    'catalog/deleteWord',
    async ({query, page, size, id}, thunkAPI) => {
        try {
            const response = await requester.delete('/catalog/words', {id});
            thunkAPI.dispatch(getCatalogAction({query, page, size}))
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);



