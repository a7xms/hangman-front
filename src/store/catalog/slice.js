

import {createSlice} from "@reduxjs/toolkit";
import {addWordAction, getCatalogAction, updateWordAction} from "./action";


export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {error: '', isLoad: false, pageResponse: {content: [], page: 0, size: 10, totalElements: 0, totalPages: 0}},
    reducers: {
        resetError: (state) => {state.error = ''}
    },
    extraReducers: (builder) => {
        builder.addCase(getCatalogAction.fulfilled, (state, action) => {
            state.pageResponse = action.payload;
            state.error = '';
        });
        builder.addCase(addWordAction.pending, (state) => {
            state.isLoad = true;
        });
        builder.addCase(addWordAction.rejected, (state, action) => {
            state.isLoad = false;
            state.error = action.payload.response.data.message;
        });
        builder.addCase(addWordAction.fulfilled, (state) => {
            state.isLoad = false;
            state.error = '';
        });
        builder.addCase(updateWordAction.pending, (state) => {
            state.isLoad = true;
        });
        builder.addCase(updateWordAction.rejected, (state, action) => {
            state.isLoad = false;
            state.error = action.payload.response.data.message;
        });
        builder.addCase(updateWordAction.fulfilled, (state) => {
            state.isLoad = false;
            state.error = '';
        });
    }
});

export const {resetError} = catalogSlice.actions;
