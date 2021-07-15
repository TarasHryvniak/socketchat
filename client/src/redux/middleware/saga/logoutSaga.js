import { put } from '@redux-saga/core/effects'
import socket from '../../../socket/socket'
import { actions } from '../../actions/ChatActions'
import client from '../../../api/client/client';

function* logout (){
    try {
        yield client.delete('/api/auth/logout')
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