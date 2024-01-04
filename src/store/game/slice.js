


import {createSlice} from "@reduxjs/toolkit";
import {guessAction, startGameAction} from "./action";


export const gameSlice = createSlice({
    name: 'game',
    initialState: {gameId: null, secretWord: "", remainingAttempts: 0, result: null, correct: null},
    reducers: {
        resetGame: (state) => {state.gameId = null}
    },
    extraReducers: (builder) => {
        builder.addCase(startGameAction.fulfilled, (state, action) => {
            const response = action.payload;
            state.gameId = response.gameId;
            state.secretWord = response.secretWord;
            state.remainingAttempts = response.attempts;
            state.result = null;
            state.correct = null;
        });
        builder.addCase(guessAction.fulfilled, (state, action) => {
            const response = action.payload;
            state.secretWord = response.secretWord;
            state.remainingAttempts = response.remainingAttempts;
            state.result = response.result;
            state.correct = response.correct;
        })
    }
});

export const {resetGame} = gameSlice.actions;
