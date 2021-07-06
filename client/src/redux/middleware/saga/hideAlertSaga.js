import { actions } from "../../actions/ChatActions";
import { put, delay } from "redux-saga/effects";

function* hideAlert(){
    try{
        yield delay(3000)
        yield put({type: actions.HIDE_ALERT})
    } catch (e) {
        const message = e.response?e.response.data.message:e.message
        console.error(message)
        yield put({type: actions.ERROR, payload:message})
    }
}

export default hideAlert