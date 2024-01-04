import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../store/auth/slice";
import {useNavigate} from "react-router-dom";


function ResponsiveAppBar({currentPage}) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.loginReducer)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [
        {
            title: 'Log Out',
            action: () => {
                dispatch(signOut())
                navigate('/');
                handleCloseUserMenu()
            }
        },
    ];

    const userPages = [
        {
            page: "Play",
            action: () => {
                navigate('/play');
            }
        },
        {
            page: "My statistics",
            action: () => {
                navigate('/my/statistics');
            }
        }
    ]

    const adminPages = [
        {
            page: "Catalog",
            action: () => {
                navigate('/catalog');
            }
        },
        {
            page: "Play",
            action: () => {
                navigate('/play');
            }
        },
        {
            page: "My statistics",
            action: () => {
                navigate('/my/statistics');
            }
        },
        {
            page: "Statistics",
            action: () => {
                navigate('/statistics');
            }
        },
    ]

    const pages = user.userRole === 'ROLE_ADMIN' ? adminPages: userPages;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Hangman
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.page} onClick={page.action}
                                          sx={{"&.Mui-disabled": {
                                              background: "#ffffff",
                                              color: "#1976d2"
                                          }}}
                                    >
                                    <Typography textAlign="center">{page.page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Hangman
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.page}
                                disabled={currentPage === page.page}
                                onClick={page.action}
                                sx={currentPage === page.page ? {"&.Mui-disabled": {
                                        background: "#ffffff",
                                        color: "#1976d2",
                                        border: "none"
                                    }} :{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar >{user.firstName[0]} {user.lastName[0]}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.title}
                                          onClick={setting.action}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
