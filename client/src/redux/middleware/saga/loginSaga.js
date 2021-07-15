import { put } from "@redux-saga/core/effects";
import socket from "../../../socket/socket";
import { actions } from "../../actions/ChatActions";
import client from '../../../api/client/client';

function* login(action){
    try {
        const response = yield client.post('api/auth/login',
        {
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