import axios from "axios";
import { credsMiddleware } from "./middlewares/credsMiddleware";

export default class CookieAuthAPI {
    static async responseOf(request) {
        return await credsMiddleware(request)
    }

    static async login(username, password) {
        return this.responseOf(axios.post("http://localhost:8080/login", {
            'username': username,
            'password': password
        }))
    }
    static async register(username, password, email) {
        return this.responseOf(axios.post("http://localhost:8080/register", {
            "username": username,
            "password": password,
            "email": email
        }))
    }
}