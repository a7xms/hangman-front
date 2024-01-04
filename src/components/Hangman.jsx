import React, { useState, useEffect } from "react";
import {
    createTheme,
    ThemeProvider,
    Container,
    CssBaseline,
    Box,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import ResponsiveAppBar from "./NavBar";
import {useDispatch, useSelector} from "react-redux";
import {guessAction, startGameAction} from "../store/game/action";
import {resetGame} from "../store/game/slice";

const hangmanTheme = createTheme();

const HangmanGame = () => {

    const dispatch = useDispatch();
    const {gameId, secretWord, remainingAttempts, result, correct} = useSelector(state => state.gameReducer)

    const [guessedLetters, setGuessedLetters] = useState([]);

    useEffect(() => {
        dispatch(resetGame());
    }, []);


    useEffect(() => {
        const handleKeyPress = (event) => {
            const inputLetter = event.key.toLowerCase();
            if (/[a-z]/.test(inputLetter) && !guessedLetters.includes(inputLetter)) {
                handleGuess(inputLetter);
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [guessedLetters]);


    function handleGuess(letter) {
        if (result !== 'WIN' || result !== 'LOSE') {
            setGuessedLetters([...guessedLetters, letter]);
            dispatch(guessAction({letter, gameId}))
        }
    }

    function handleRestart() {
        setGuessedLetters([]);
        dispatch(startGameAction());
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function renderDisplayWord() {
        const rectangleStyle = {
            display: "inline-block",
            width: "30px",
            height: "40px",
            border: "2px solid #3f51b5",
            borderRadius: "4px",
            margin: "4px",
            textAlign: "center",
            lineHeight: "40px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#3f51b5",
        };

        return secretWord.split("").map((char, index) => (
            <span key={index} style={rectangleStyle}>
        {char === "_" ? "" : char}
      </span>
        ));
    }

    return (
        <ThemeProvider theme={hangmanTheme}>
            <CssBaseline />
            <ResponsiveAppBar currentPage='Play'/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {gameId ? (<div>
                        <Typography component="h1" variant="h5" align="center" color="primary" gutterBottom>
                            Hangman Game
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary">
                            {result === 'LOSE' ? `The word was: ${secretWord}` : renderDisplayWord()}
                        </Typography>
                        {gameId && (
                            <Typography variant="body2" align="center" color="text.secondary">
                                {`Remaining attempts: ${remainingAttempts}`}
                            </Typography>)}
                        <Grid container spacing={1} justifyContent="center" marginTop={2}>
                            {alphabet.split("").map((letter) => (
                                <Grid item key={letter}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        disabled={guessedLetters.includes(letter) || result}
                                        onClick={() => handleGuess(letter)}
                                    >
                                        {letter}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        {result && (
                            <div align="center">
                                <Typography variant="body2" align="center" color={result === 'WIN' ? 'green' : 'red'}>
                                    {result === 'WIN' ? "Congrats! You win!" : "Game over! You lose!"}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    align="center"
                                    onClick={handleRestart}
                                    style={{ marginTop: "16px" }}
                                >
                                    Restart
                                </Button>
                            </div>
                        )}
                    </div>) : (<Button
                        variant="contained"
                        color="primary"
                        size="big"
                        onClick={handleRestart}
                        style={{ marginTop: "16px" }}
                        >
                        Start game
                        </Button>)}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default HangmanGame;
