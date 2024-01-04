import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    TablePagination,
    CssBaseline,
    Box,
    createTheme,
    ThemeProvider, Typography, TableSortLabel,
} from "@mui/material";
import Navbar from "../NavBar";
import './style.css';
import {getMyStatisticsAction} from "../../store/statistics/action";

const hangmanTheme = createTheme();

const MyStatistics = () => {
    const dispatch = useDispatch();
    const {myStatisticsPage} = useSelector(state => state.myStatisticsReducer);

    const [searchParams, setSearchParams] = useState({
        word: "",
        start: "",
        finish: "",
        result: "All",
    })

    const [sort, setSort] = useState({
        orderBy: "createdAt",
        direction: "desc"
    })

    useEffect(() => {
        dispatch(getMyStatisticsAction({
            ...searchParams,
            page: 0,
            size: myStatisticsPage.size,
            ...sort,
        }));
    }, [searchParams, sort]);

    const handleChangePage = (event, newPage) => {
        dispatch(
            getMyStatisticsAction({
                ...searchParams,
                page: newPage,
                size: myStatisticsPage.size,
            })
        );
    };

    const handleSort = (column) => {
        if(column === sort.orderBy){
            if(sort.direction === 'asc') {
                setSort({...sort, direction: "desc"});
            }
            else {
                setSort({...sort, direction: "asc"});
            }
        }
        else {
            setSort({orderBy: column, direction: "asc"});
        }

    }

    const handleChangeRowsPerPage = (event) => {
        const newSize = parseInt(event.target.value, 10);
        dispatch(
            getMyStatisticsAction({
                ...searchParams,
                page: 0,
                size: newSize,
            })
        );
    };

    return (
        <ThemeProvider theme={hangmanTheme}>
            <CssBaseline/>
            <Navbar currentPage="My statistics"/>
            <Box component="main">
                <CssBaseline/>

                <TableContainer component={Paper} className="tableContainer">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{color: "white", fontWeight: "bold"}}
                                    className="tableHeaderCell" align="center">
                                    <TableSortLabel active={sort.orderBy === "actualWord"}
                                                    onClick={() => handleSort('actualWord')}
                                                    direction={sort.direction}>Word</TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{color: "white", fontWeight: "bold"}}
                                    className="tableHeaderCell" align="center">
                                    <TableSortLabel active={sort.orderBy === 'createdAt'}
                                                    onClick={() => handleSort('createdAt')}
                                                    direction={sort.direction}>Start</TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{color: "white", fontWeight: "bold"}}
                                    align="center" className="tableHeaderCell">
                                    <TableSortLabel active={sort.orderBy === 'updatedAt'}
                                                    onClick={() => handleSort('updatedAt')}
                                                    direction={sort.direction}>Finish</TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{color: "white", fontWeight: "bold"}}
                                    align="center" className="tableHeaderCell">Guessed Letters</TableCell>
                                <TableCell
                                    sx={{color: "white", fontWeight: "bold"}}
                                    align="center" className="tableHeaderCell">
                                    <TableSortLabel active={sort.orderBy === 'result'}
                                                    onClick={() => handleSort('result')}
                                                    direction={sort.direction}>Result</TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key="search" className="search">
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        label="Search Word"
                                        variant="outlined"
                                        type="search"
                                        value={searchParams.word}
                                        onChange={(e) => setSearchParams({
                                            ...searchParams,
                                            word: e.target.value
                                        })}
                                    />

                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        type="date"
                                        variant="outlined"
                                        value={searchParams.start}
                                        onChange={(e) => setSearchParams({...searchParams, start: e.target.value})}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        type="date"
                                        variant="outlined"
                                        value={searchParams.finish}
                                        onChange={(e) => setSearchParams({...searchParams, finish: e.target.value})}
                                    />
                                </TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined" size="small">
                                        <Select
                                            label="Search Result"
                                            value={searchParams.result}
                                            onChange={(e) => setSearchParams({...searchParams, result: e.target.value})}
                                        >
                                            <MenuItem value="All">All</MenuItem>
                                            <MenuItem value="WIN">WIN</MenuItem>
                                            <MenuItem value="LOSE">LOSE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            {myStatisticsPage.content.map((statistic) => (
                                <TableRow key={statistic.gameId} className="tableRow">
                                    <TableCell align="center">{statistic.word}</TableCell>
                                    <TableCell align="center">{statistic.start}</TableCell>
                                    <TableCell align="center">{statistic.finish}</TableCell>
                                    <TableCell align="center">
                                        {statistic.guessedLetters.map((guess) => {
                                            if(guess.correct) {
                                                return (<Typography
                                                    display="inline"
                                                    paragraph={true}
                                                    sx={{color: "green"}}>{guess.letter + ' '}</Typography>)
                                            }
                                            return (<Typography
                                                display="inline"
                                                paragraph={true}
                                                sx={{color: "red"}}>{guess.letter + ' '}</Typography>)
                                        })}
                                    </TableCell>
                                    <TableCell
                                        sx={statistic.result === 'WIN' ? {color: "green"} : {color: "red"}}
                                        align="center">{statistic.result}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={myStatisticsPage.totalElements}
                        rowsPerPage={myStatisticsPage.size}
                        page={myStatisticsPage.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
};

export default MyStatistics;
