import React, {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    ThemeProvider,
    CssBaseline,
    Box,
    createTheme,
    TablePagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../NavBar";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import {addWordAction, deleteWordAction, getCatalogAction, updateWordAction} from "../../store/catalog/action";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {resetError} from "../../store/catalog/slice";

const hangmanTheme = createTheme();

const WordCatalog = () => {
    const dispatch = useDispatch();
    const {error, isLoad, pageResponse} = useSelector(state => state.catalogReducer)

    const [newWord, setNewWord] = useState({letters: "", attempts: null});
    const [updateWord, setUpdateWord] = useState({id: null, letters: "", attempts: null});
    const [openDialog, setOpenDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [wordValidationError, setWordValidationError] = useState(false);
    const [wordValidationText, setWordValidationText] = useState("");
    const [attemptsValidationError, setAttemptsValidationError] = useState(false);
    const [attemptsValidationText, setAttemptsValidationText] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const handleUpdate = (word) => {
        setUpdateWord({id: word.id, letters: word.letters, attempts: word.attempts});
        setOpenUpdateDialog(true);
    };

    const validateData = (letters, attempts) => {
        const isValidWord = /^[a-zA-Z]+$/.test(letters);
        const isValidAttempts = /^[0-9]+$/.test(attempts);

        if (!isValidWord) {
            setWordValidationError(true);
            setWordValidationText("Only english letters are allowed!")
            return false;
        }

        if(!isValidAttempts) {
            setAttemptsValidationError(true);
            setAttemptsValidationText("Please, enter a number");
            return false;
        }
        if(attempts < 1 || attempts > 26) {
            setAttemptsValidationError(true);
            setAttemptsValidationText("Please, enter a number between 1 and 26 inclusive!");
            return false;
        }
        return true;
    }



    const handleUpdateWord = () => {
        if(!validateData(updateWord.letters, updateWord.attempts)) {
            return;
        }
        dispatch(updateWordAction({
            query: searchTerm,
            page: pageResponse.page,
            size: pageResponse.size,
            ...updateWord
        }));

        setOpenUpdateDialog(false);

    }

    const handleDelete = (id) => {
        dispatch(deleteWordAction({
            query: searchTerm,
            page: pageResponse.page,
            size: pageResponse.size,
            id
        }));
    };

    const handleAddWord = () => {
        if(!validateData(newWord.letters, newWord.attempts)){
            return;
        }

        dispatch(addWordAction({
            query: searchTerm,
            page: pageResponse.page,
            size: pageResponse.size,
            ...newWord
        }));

        setOpenDialog(false);
        setNewWord({letters: "", attempts: null});
        setWordValidationError(false);

    };

    const handleChangePage = (event, newPage) => {
        const params = {
            query: searchTerm,
            page: newPage,
            size: pageResponse.size
        }
        dispatch(getCatalogAction(params))
    };

    const handleChangeRowsPerPage = (event) => {
        const params = {
            query: searchTerm,
            page: 0,
            size: event.target.value
        }
        dispatch(getCatalogAction(params))
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const params = {
            query: searchTerm,
            page: 0,
            size: pageResponse.size
        }
        dispatch(getCatalogAction(params));
    }, [searchTerm]);


    return (
        <ThemeProvider theme={hangmanTheme}>
            <CssBaseline/>
            <Navbar currentPage='Catalog'/>
            <Box component="main">
                <CssBaseline/>
                <Snackbar
                    open={error}
                    autoHideDuration={5000}
                    onClose={event => {dispatch(resetError())}}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity="error"
                        onClose={event => {dispatch(resetError())}}
                    >
                        {error}
                    </MuiAlert>
                </Snackbar>

                <TableContainer component={Paper} className="tableContainer">
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            className="addButton"
                            startIcon={<AddIcon/>}
                            onClick={() => setOpenDialog(true)}
                        >
                            Add word
                        </Button>
                        <div className="searchContainer">
                            <TextField
                                size="small"
                                label="Search"
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </Box>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableHeaderCell" align="center"
                                           sx={{color: "white", fontWeight: "bold"}}>Word</TableCell>
                                <TableCell className="tableHeaderCell" align="center"
                                           sx={{color: "white", fontWeight: "bold"}}>Attempts</TableCell>
                                <TableCell className="tableHeaderCell" align="center"
                                           sx={{color: "white", fontWeight: "bold"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageResponse.content.map((word) => (
                                <TableRow key={word.id} className="tableRow">
                                    <TableCell align="center">{word.letters}</TableCell>
                                    <TableCell align="center">{word.attempts}</TableCell>
                                    <TableCell align="center">
                                        <div className="actionButtons">
                                            <Tooltip title="Update">
                                                <IconButton size="small" onClick={() => handleUpdate(word)}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton size="small" onClick={() => handleDelete(word.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pageResponse.totalElements}
                        rowsPerPage={pageResponse.size}
                        page={pageResponse.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
                    <DialogTitle>Update Word</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Word"
                            variant="outlined"
                            fullWidth
                            required
                            value={updateWord.letters}
                            onChange={(e) => {
                                setUpdateWord({...updateWord, letters: e.target.value});
                                setWordValidationError(false);
                                setWordValidationText("");
                            }}
                            margin="normal"
                            error={wordValidationError}
                            helperText={wordValidationText}
                        />
                        <TextField
                            label="Attempts"
                            variant="outlined"
                            fullWidth
                            required
                            type="number"
                            value={updateWord.attempts}
                            onChange={(e) => {
                                setUpdateWord({...updateWord, attempts: e.target.value});
                                setAttemptsValidationError(false);
                                setAttemptsValidationText("");
                            }}
                            margin="normal"
                            error={attemptsValidationError}
                            helperText={attemptsValidationText}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpdateDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateWord} disabled={isLoad} color="primary" variant="contained">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Add New Word</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Word"
                            variant="outlined"
                            fullWidth
                            required
                            value={newWord.letters}
                            onChange={(e) => {
                                setNewWord({...newWord, letters: e.target.value});
                                setWordValidationError(false);
                                setWordValidationText("");
                            }}
                            margin="normal"
                            error={wordValidationError}
                            helperText={wordValidationText}
                        />
                        <TextField
                            label="Attempts"
                            variant="outlined"
                            fullWidth
                            required
                            type="number"
                            value={newWord.attempts}
                            onChange={(e) => {
                                setNewWord({...newWord, attempts: e.target.value});
                                setAttemptsValidationError(false);
                                setAttemptsValidationText("");
                            }}
                            margin="normal"
                            error={attemptsValidationError}
                            helperText={attemptsValidationText}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddWord} disabled={isLoad} color="primary" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default WordCatalog;
