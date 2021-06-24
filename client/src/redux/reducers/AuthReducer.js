import { actions } from "../actions/ChatActions"


const initialState = {
    user:{
        userId: '',
        userName: '',
        sessions: []
    },
    authForm:{
        email:'',
        password:'',
        userName:''
    },
    auth: false,
    alert: {
        hasMessage: false,
        isError: false,
        message: ''
    }
}

const AuthReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.CHANGE_AUTHFORM_VALUE:{
            return{
                ...state,
                authForm:{
                    ...state.authForm,
                    ...action.payload
                }
            }
        }
        case actions.REGISTRATION_SUCCEEDED:{
            return {
                ...state,
                alert: {
                    hasMessage: true,
                    isError: false,
                    message: 'registration succeeded'
                }
            }
        }
        case actions.REGISTRATION_FAILED:{
            return {
                ...state,
                alert:{
                    hasMessage: true,
                    isError: true,
                    message: action.payload
                }
            }
        }
        case actions.LOGIN_SUCCEEDED:{
            return {
                ...state,
                user:{
                    ...action.payload.user
                },
                authForm:{
                    email:'',
                    password:''
                },
                auth: true,
                alert: {
                    hasMessage: true,
                    isError: false,
                    message: 'login succeeded'
                }
            }
        }
        case actions.LOGIN_FAILED:{
            return{
                ...state,
                alert: {
                    hasMessage: true,
                    isError: true,
                    message: action.payload
                }
            }
        }
        case actions.ERROR:{
            return{
                ...state,
                alert: {
                    hasMessage: true,
                    isError: true,
                    message: action.payload
                }
            }
        }
        case actions.LOGOUT_SUCCEEDED:{
            return{
                ...state,
                user:{
                    userId: '',
                    userName: '',
                    sessions: []
                },
                auth: false
            }
        }
        case actions.RELOGIN:{
            return{
                ...state,
                user: {...action.payload},
                auth: true
            }
        }
        case actions.READ_MESSAGES:{
            const sessionsCopy = [...state.user.sessions]
            for(let session of sessionsCopy){
                if(session.users.includes(action.payload.userId)){
                    session.lastMessage.newMessageCount = 0
                    break
                }
            }
            return{
                ...state,
                user: {...state.user,
                        sessions:[...sessionsCopy]},
            }
        }
        case actions.HIDE_ALERT:{
            return{
                ...state,
                alert: {
                    hasMessage: false,
                    isError: false,
                    message: ''
                }
            }
        }
        default:{
            return state
        }
    }
}

export default AuthReducer