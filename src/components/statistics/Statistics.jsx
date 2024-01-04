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
import {getStatisticsAction} from "../../store/statistics/action";

const hangmanTheme = createTheme();

const Statistics = () => {
  const dispatch = useDispatch();
  const {statisticsPage} = useSelector(state => state.statisticsReducer);

  const [searchParams, setSearchParams] = useState({
    word: "",
    start: "",
    finish: "",
    result: "All",
    fullName: "",
  })

  const [sort, setSort] = useState({
    orderBy: "createdAt",
    direction: "desc"
  })

  useEffect(() => {
    dispatch(getStatisticsAction({
      ...searchParams,
      page: 0,
      size: statisticsPage.size,
      ...sort,
    }));
  }, [searchParams, sort]);

  const handleChangePage = (event, newPage) => {
    dispatch(
      getStatisticsAction({
        ...searchParams,
        page: newPage,
        size: statisticsPage.size,
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
      getStatisticsAction({
        ...searchParams,
        page: 0,
        size: newSize,
      })
    );
  };

    return (
        <ThemeProvider theme={hangmanTheme}>
          <CssBaseline/>
          <Navbar currentPage='Statistics'/>
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
                    <TableCell
                        sx={{color: "white", fontWeight: "bold"}}
                        align="center" className="tableHeaderCell">
                      <TableSortLabel active={sort.orderBy === 'user.firstName'}
                                      onClick={() => handleSort('user.firstName')}
                                      direction={sort.direction}>User</TableSortLabel>
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
                    <TableCell align="center">
                      <TextField
                          label="Search User"
                          variant="outlined"
                          type="search"
                          size="small"
                          value={searchParams.fullName}
                          onChange={(e) => setSearchParams({...searchParams, fullName: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  {statisticsPage.content.map((statistic) => (
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
                        <TableCell align="center">{statistic.fullName}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={statisticsPage.totalElements}
                  rowsPerPage={statisticsPage.size}
                  page={statisticsPage.page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
        </ThemeProvider>
    );
};

export default Statistics;
