import axios from "axios";
import Constants from "./constants";

export default class WordsAPI {
    static api() {
        return Constants.api()
    }

    static allWords() {
        return axios.get(`${this.api()}/words`)
    }
    static wordById(wordId) {
        return axios.get(`${this.api()}/words`, {
            params: {
                id: wordId
            }
        })
    }
    static addWord(wordd) {
        return axios.post(`${this.api()}/add-word`, {
            word: wordd
        })
    }
}