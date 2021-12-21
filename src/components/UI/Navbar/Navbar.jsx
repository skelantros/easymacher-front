import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useProfileState } from "../../../hooks/useProfileState";
import LogoutButton from "../../auth0/LogoutButton";
import cl from './Navbar.module.css';

const Navbar = () => {
    const [profile, isProfileLoading] = useProfileState()
    const { isAuthenticated } = useAuth0()
    function userProfileLink() {
        if(isProfileLoading)
            return "/profile"
        else
            return `/user/${profile.id}`
    }

    return(
        <div className={cl.navbar}>
            <div className={cl.navbarLinks}>
                <Link to="/profile">Auth0</Link>|
                <Link to={userProfileLink()}>Ваш профиль</Link>|
                <Link to="/dictionary">Словарь</Link>|
                <Link to="/word-groups">Группы слов</Link>
                { isAuthenticated ? <LogoutButton/> : <div/> }
            </div>
        </div>
    )
}

export default Navbar;