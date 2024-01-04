import {createSlice} from "@reduxjs/toolkit";
import {getMyStatisticsAction, getStatisticsAction} from "./action";


export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {statisticsPage: {content: [], page: 0, size: 10, totalElements: 0, totalPages: 0}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatisticsAction.fulfilled, (state, action) => {
            state.statisticsPage = action.payload;
        });
    }
});

export const myStatisticsSlice = createSlice({
    name: 'myStatistics',
    initialState: {myStatisticsPage: {content: [], page: 0, size: 10, totalElements: 0, totalPages: 0}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyStatisticsAction.fulfilled, (state, action) => {
            state.myStatisticsPage = action.payload;
        });
    }
});