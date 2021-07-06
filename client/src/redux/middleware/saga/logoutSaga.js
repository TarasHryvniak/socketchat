import { put } from '@redux-saga/core/effects'
import socket from '../../../socket/socket'
import { actions } from '../../actions/ChatActions'

const axios = require('axios')

function* logout (){
    try {
        yield axios.delete('/api/auth/logout',{ withCredantials: true })
        localStorage.clear()
        yield socket.disconnect()
        yield put({type: actions.LOGOUT_SUCCEEDED}) 
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.LOGIN_FAILED, payload:message})
    }
}

export default logout