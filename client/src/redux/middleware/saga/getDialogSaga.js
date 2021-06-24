import { put } from "@redux-saga/core/effects";
import socket from "../../../socket/socket";
import { actions } from "../../actions/ChatActions";

const axios = require('axios')

function* getDialog(action){
    try {
        const response = yield axios.get(`/api/chat/dialog/${action.payload.userId}`,{
            withCredantials: true
        })
        const currentSession = yield {...response.data.session}
        yield localStorage.setItem('currentSession',JSON.stringify(currentSession))
        yield socket.emit('dialog loaded', response.data.lastMessage)

        yield put({type: actions.GET_DIALOG_SUCCEEDED, payload:{...currentSession}})
    } catch (e) {
        console.error(e.response.data.message)
        yield put({type: actions.ERROR, payload: e.response.data.message})
    }
}

export default getDialog