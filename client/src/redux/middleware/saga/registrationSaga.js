import {  put } from "@redux-saga/core/effects"
import { actions } from "../../actions/ChatActions"

const axios = require('axios')

function* registration(action){
    try {
        yield axios.post('api/auth/register', {...action.payload.form})
        yield put({type: actions.REGISTRATION_SUCCEEDED})
    } catch (e) {
        console.error(e.response.data.message)
        yield put({type: actions.REGISTRATION_FAILED, payload: e.response.data.message})
    }
}

export default registration