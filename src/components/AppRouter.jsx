import React from "react"
import { Route, Routes } from "react-router";
import CookieLogin from "../pages/CookieLogin";
import WordsPage from "../pages/WordsPage";

const AppRouter = () => {
    return(
        <Routes>
            <Route path="/login" element={<CookieLogin/>} />
            <Route path="/dictionary" element={<WordsPage/>} />
        </Routes>
    )
}

export default AppRouter;