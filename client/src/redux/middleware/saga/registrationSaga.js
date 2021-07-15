import {  put } from "@redux-saga/core/effects"
import { actions } from "../../actions/ChatActions"
import client from '../../../api/client/client';

function* registration(action){
    try {
        yield client.post('api/auth/register', {...action.payload.form})
        yield put({type: actions.REGISTRATION_SUCCEEDED})
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.REGISTRATION_FAILED, payload:message})
    }
}

export default registration