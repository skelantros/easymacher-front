import { Link } from "react-router-dom";
import cl from './Navbar.module.css';

const Navbar = () => {
    return(
        <div className={cl.navbar}>
            <div className={cl.navbarLinks}>
                <Link to="/login">Логин и регистрация</Link>
                <Link to="/profile">Профиль</Link>
                <Link to="/dictionary">Словарь</Link>
            </div>
        </div>
    )
}

export default Navbar;