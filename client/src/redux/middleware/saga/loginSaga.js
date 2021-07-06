import { put } from "@redux-saga/core/effects";
import socket from "../../../socket/socket";
import { actions } from "../../actions/ChatActions";

const axios = require('axios')

function* login(action){
    try {
        const response = yield axios.post('api/auth/login',
        {
            withCredantials: true,
            ...action.payload.form
        })
        yield socket.auth = {
            user:response.data.user,
            users:[...response.data.users]
        }
        yield socket.connect()
        yield localStorage.setItem('user', JSON.stringify(response.data.user))
        yield put({type: actions.LOGIN_SUCCEEDED, payload:{user:response.data.user}})
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.LOGIN_FAILED, payload:message})
    } 
}

export default login