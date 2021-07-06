import {  put } from "@redux-saga/core/effects"
import { actions } from "../../actions/ChatActions"

const axios = require('axios')

function* registration(action){
    try {
        yield axios.post('api/auth/register', {...action.payload.form})
        yield put({type: actions.REGISTRATION_SUCCEEDED})
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.REGISTRATION_FAILED, payload:message})
    }
}

export default registration