import React from "react"
import { Route, Routes } from "react-router";
import Auth0LoginPage from "../pages/Auth0LoginPage";
import WordGroupPage from "../pages/WordGroupPage";
import WordGroupsPage from "../pages/WordGroupsPage";
import WordsPage from "../pages/WordsPage";
import Profile from "./auth0/Profile";
import UserPage from "../pages/UserPage"
import GuessPage from "../pages/GuessPage";

const AppRouter = () => {
    return(
        <Routes>
            <Route path="/login" element={<Auth0LoginPage/>} />
            <Route path="/dictionary" element={<WordsPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route exact path="/word-groups" element={<WordGroupsPage/>} />
            <Route exact path="/word-group/:id" element={<WordGroupPage/>} />
            <Route exact path ="/user/:id" element={<UserPage/>} />
            <Route exact path ="/word-group/:id/guess" element={<GuessPage/>} />
        </Routes>
    )
}

export default AppRouter;