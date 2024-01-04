import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const defaultTheme = createTheme();

export default function ConfirmEmail() {
    const [openSnackbar, setOpenSnackbar] = React.useState(true);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="primary" gutterBottom>
                        Confirm Your Email
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                        We've sent you a confirmation letter to your email address. Please
                        follow the link in the letter to confirm your email address!
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            onClose={handleSnackbarClose}
                            severity="info"
                        >
                            Check your email for the confirmation link.
                        </MuiAlert>
                    </Snackbar>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
