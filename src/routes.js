import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ConfirmEmail from "./components/ConfirmEmail";
import EmailConfirmed from "./components/EmailConfirmed";
import Hangman from "./components/Hangman";
import Home from "./components/Home";
import {createBrowserRouter} from "react-router-dom";
import WordCatalog from "./components/catalog/Catalog";
import Statistics from "./components/statistics/Statistics";
import MyStatistics from "./components/statistics/MyStatistics";


const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signin',
        element: <SignIn/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/signup/confirm',
        element: <ConfirmEmail/>
    },
    {
        path: '/confirm/email/:token',
        element: <EmailConfirmed/>
    },
    {
        path: '/catalog',
        element: <WordCatalog/>
    },
    {
        path: '/play',
        element: <Hangman/>
    },
    {
        path: '/statistics',
        element: <Statistics/>
    },
    {
        path: '/my/statistics',
        element: <MyStatistics/>
    }
];

export const router = createBrowserRouter(routes);
