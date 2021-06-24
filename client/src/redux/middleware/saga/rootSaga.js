import {takeLatest, all} from "redux-saga/effects"
import registration from "./registrationSaga"
import login from "./loginSaga"
import logout from "./logoutSaga"
import sendMessage from "./sendMessageSaga"
import getDialog from "./getDialogSaga"
import { actions } from "../../actions/ChatActions"
import hideAlert from "./hideAlertSaga"

function* rootSaga(){
    yield all([
        takeLatest(actions.REGISTRATION_REQUESTED, registration),
        takeLatest(actions.LOGIN_REQUESTED, login),
        takeLatest(actions.LOGOUT_REQUESTED,logout),
        takeLatest(actions.MESSAGE_SEND_REQUESTED, sendMessage),
        takeLatest(actions.GET_DIALOG_REQUESTED, getDialog),
        takeLatest(actions.HIDE_ALERT_REQUESTED, hideAlert)
    ])
}

export default rootSaga