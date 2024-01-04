import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import requester from "../common/requester";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const successTheme = createTheme({
    palette: {
        primary: {
            main: "#4CAF50",
        },
    },
});

const errorTheme = createTheme({
    palette: {
        primary: {
            main: "#f44336",
        },
    },
});

export default function EmailConfirmed() {
    const [confirmed, setConfirmed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const params = useParams();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await requester.get(`/auth/confirm?token=${params.token}`);
                if (response.data === 'Email successfully confirmed') {
                    setConfirmed(true);
                }
            } catch (error) {
                setErrorMessage('An error occurred during email confirmation.');
                console.error('Email confirmation failed:', error);
            }
        };

        confirmEmail();
    }, [params.token]);

    return (
        <ThemeProvider theme={confirmed ? successTheme : errorTheme}>
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
                    {confirmed ? (
                        <CheckCircleOutlineIcon sx={{ color: "primary.main", fontSize: 80 }} />
                    ) : (
                        <ErrorOutlineIcon sx={{ color: "primary.main", fontSize: 80 }} />
                    )}
                    <Typography component="h1" variant="h5" color={confirmed ? "primary" : "error"} gutterBottom>
                        {confirmed ? "Email Successfully Confirmed" : "Email Confirmation Failed"}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                        {confirmed
                            ? "Congratulations! Your email address has been successfully confirmed."
                            : errorMessage}
                    </Typography>
                    {confirmed ? null : (
                        <Typography variant="body2" align="center" color="text.secondary">
                            Retry or contact support for assistance.
                        </Typography>
                    )}
                    {confirmed ?
                        (<Typography variant="body2" align="center" color="text.secondary">
                            Continue to the{" "}
                            <Link href="/" color="primary">
                                homepage
                            </Link>
                        </Typography>) : ""}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
