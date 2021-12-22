import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom"
import MyNavbar from "../UI/Navbar/MyNavbar"
import WordGroupPage from "../../pages/WordGroupPage";
import WordGroupsPage from "../../pages/WordGroupsPage";
import WordsPage from "../../pages/WordsPage";
import UserPage from "../../pages/UserPage"
import GuessPage from "../../pages/GuessPage";
import { useProfileState } from "../../hooks/useProfileState";

const AuthLayout = () => {
    const [profile, isLoading] = useProfileState()
    
    function userProfileLink() {
        if(isLoading) return "/"
        else return `/user/${profile.id}`
    }

    const links = [
        // {id: 1, name: "Auth0", link: "/profile"},
        {id: 2, name: "Профиль", link: userProfileLink()},
        {id: 3, name: "Словарь", link: "/dictionary"},
        {id: 4, name: "Группы слов", link: "/word-groups"}
    ]

    return(
        <Container fluid style={{height: "100vh"}} className="bg-light">
            <MyNavbar links={links}/>
            <Container style={{height: "100vh"}} className="bg-white">
                <Routes>
                    <Route path="/dictionary" element={<WordsPage/>} />
                    <Route exact path="/word-groups" element={<WordGroupsPage/>} />
                    <Route exact path="/word-group/:id" element={<WordGroupPage/>} />
                    <Route exact path ="/user/:id" element={<UserPage/>} />
                    <Route exact path ="/word-group/:id/guess" element={<GuessPage/>} />
                    <Route path="*" element={<WordsPage/>} />
                </Routes>
            </Container>
        </Container>
    )
}

export default AuthLayout;