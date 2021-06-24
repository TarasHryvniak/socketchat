export const actions={
    CHANGE_AUTHFORM_VALUE: 'CHANGE_AUTHFORM_VALUE',

    GET_USERS_REQUESTED: 'GET_USERS_REQUESTED',
    GET_USERS_SUCCEEDED: 'GET_USERS_SUCCEDED',
    USER_CONNECTED: 'USER_CONNECTED',

    LOGOUT_REQUESTED: 'LOGOUT_REQUESTED',
    LOGOUT_SUCCEEDED: ' LOGOUT_SUCCEEDED',

    LOGIN_REQUESTED: 'LOGIN_REQUESTED',
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    LOGIN_FAILED: 'LOGIN_FAILED',

    RELOGIN: 'RELOGIN',
    MESSAGE_SEND_REQUESTED: 'MESSAGE_SEND_REQUESTED',
    MESSAGE_SEND_SUCCEEDED: 'MESSAGE_SEND_SUCCEEDED',

    GET_DIALOG_REQUESTED: 'GET_DIALOG_REQUESTED',
    GET_DIALOG_SUCCEEDED: 'GET_DIALOG_SUCCEEDED',
    
    RELOAD_DIALOG: 'RELOAD_DIALOG',
    
    REGISTRATION_REQUESTED: 'REGISTRATION_REQUESTED',
    REGISTRATION_SUCCEEDED: 'REGiSTRATION_SUCCEEDED',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED',
    
    CHANGE_MESSAGE_FIELD: 'CHANGE_MESSAGE_FIELD',
    MESSAGE_RECIVED: 'MESSAGE_RECIVED',
    READ_MESSAGES: 'READ_MESSAGES',

    HIDE_ALERT_REQUESTED: 'HIDE_ALERT_REQUESTED',
    HIDE_ALERT: 'HIDE_ALERT',
    ERROR: 'ERROR'
}

export const changeAuthFormAC= (payload) =>{
    return{type: actions.CHANGE_AUTHFORM_VALUE, payload}
}

export const getUsersAC = () =>{
    return{type: actions.GET_USERS_REQUESTED}
}

export const registrationAC = (payload) =>{
    return{type: actions.REGISTRATION_REQUESTED, payload}
}

export const loginAC = (payload) =>{
    return{type: actions.LOGIN_REQUESTED, payload}
}

export const logoutAC = () =>{
    return{type:actions.LOGOUT_REQUESTED}
}

export const reloginAC = (payload) =>{
    return{type: actions.RELOGIN, payload}
}

export const sendMessageAC = (payload) =>{
    return{type: actions.MESSAGE_SEND_REQUESTED, payload}
}

export const getDialogAC = (payload) =>{
    return{type: actions.GET_DIALOG_REQUESTED, payload}
}

export const reloadDialogAC = (payload) =>{
    return{type: actions.RELOAD_DIALOG, payload}
}

export const hideAlertAC = () =>{
    return({type: actions.HIDE_ALERT_REQUESTED})
}

export const changeMessageFieldAC = (payload) =>{
    return({type: actions.CHANGE_MESSAGE_FIELD, payload})
}