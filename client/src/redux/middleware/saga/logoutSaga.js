import { put } from '@redux-saga/core/effects'
import { actions } from '../../actions/ChatActions'

const axios = require('axios')

function* logout (){
    try {
        yield axios.delete('/api/auth/logout',{ withCredantials: true })
        localStorage.clear()
        yield put({type: actions.LOGOUT_SUCCEEDED}) 
    } catch (e) {
        console.error(e.response.data.message)
        yield put({type: actions.ERROR, payload: e.response.data.message})
    }
}

export default logout