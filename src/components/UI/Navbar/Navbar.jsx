import { Link } from "react-router-dom";
import { useProfileState } from "../../../hooks/useProfileState";
import cl from './Navbar.module.css';

const Navbar = () => {
    const [profile, isProfileLoading] = useProfileState()
    function userProfileLink() {
        if(isProfileLoading)
            return "/profile"
        else
            return `/user/${profile.id}`
    }

    return(
        <div className={cl.navbar}>
            <div className={cl.navbarLinks}>
                <Link to="/login">Логин и регистрация</Link>
                <Link to="/profile">Auth0</Link>
                <Link to={userProfileLink()}>Ваш профиль</Link>
                <Link to="/dictionary">Словарь</Link>
                <Link to="/word-groups">Группы слов</Link>
            </div>
        </div>
    )
}

export default Navbar;