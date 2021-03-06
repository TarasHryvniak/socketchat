import { put } from "@redux-saga/core/effects";
import socket from "../../../socket/socket";
import { actions } from "../../actions/ChatActions";
import client from '../../../api/client/client';

function* getDialog(action){
    try {
        const response = yield client.get(`/api/chat/dialog/${action.payload.userId}`)
        const currentSession = yield {...response.data.session}
        yield localStorage.setItem('currentSession',JSON.stringify(currentSession))
        yield socket.emit('dialog loaded', {
            dialogWithId: action.payload.userId,
            lastMessage: response.data.lastMessage,
            sessionId: response.data.session.id,
        })

        yield put({type: actions.GET_DIALOG_SUCCEEDED, payload:{...currentSession}})
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.ERROR, payload:message})
    }
}

export default getDialog