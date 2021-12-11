import React, { useState } from "react";
import CookieAuthAPI from "../../API/CookieAuthAPI";

const Login = ({resultCallback}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function login(n, p) {
        const response = await CookieAuthAPI.login(n, p)
        resultCallback(getResult(response))
    }

    // TODO отлавливать ошибки через try-catch
    function getResult(response) {
        if(response.status === 200) return "Логин успешный!"
        else if(response.status === 400) return "Неправильный логин-пароль."
        else return response.data
    }

    return(
        <div>
            <b>Имя пользователя:</b>
            <input
                placeholder="Имя пользователя"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <b>Пароль:</b>
            <input
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <p/>
            <button onClick={() => login(username, password)}>Залогиниться</button>
        </div>
    )
}

export default Login