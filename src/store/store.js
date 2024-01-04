import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./auth/slice";
import {catalogSlice} from "./catalog/slice";
import {gameSlice} from "./game/slice";
import {myStatisticsSlice, statisticsSlice} from "./statistics/slice";

export const store = configureStore({
    reducer: {
        loginReducer: loginSlice.reducer,
        catalogReducer: catalogSlice.reducer,
        gameReducer: gameSlice.reducer,
        statisticsReducer: statisticsSlice.reducer,
        myStatisticsReducer: myStatisticsSlice.reducer,
    }
})