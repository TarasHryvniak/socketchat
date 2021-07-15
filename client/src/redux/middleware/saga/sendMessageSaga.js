import { put } from '@redux-saga/core/effects'
import { actions } from '../../actions/ChatActions'
import socket from '../../../socket/socket'
import client from '../../../api/client/client';

function* sendMessage (action){
    try {
        const response = yield client.post('/api/chat/send',{
            ...action.payload
        })
        const messages = yield response.data.messages
        const newMessage = yield messages[messages.length - 1]
        yield socket
            socket.emit('private message',{
            dialogId: action.payload.dialogId,
            to: action.payload.to,
            message: {...newMessage}
            })
       yield put({type: actions.MESSAGE_SEND_SUCCEEDED, payload:{ message:{...newMessage}}})

    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.ERROR, payload:message})
    }
}

export default sendMessage