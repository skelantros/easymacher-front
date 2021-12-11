import { useState } from "react"
import Login from "../components/authcookie/Login"

const CookieLogin = () => {
    const [error, setError] = useState("")

    return(
        <div>
            <h2>Вход в систему:</h2>
            <Login resultCallback={(x) => setError(x)}/>
            <p>{error}</p>
        </div>
    )
}

export default CookieLogin