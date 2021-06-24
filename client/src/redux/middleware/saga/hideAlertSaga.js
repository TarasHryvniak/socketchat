import { actions } from "../../actions/ChatActions";
import { put, delay } from "redux-saga/effects";

function* hideAlert(){
    try{
        yield delay(3000)
        yield put({type: actions.HIDE_ALERT})
    } catch (error) {
        console.log(error)
    }
}

export default hideAlert