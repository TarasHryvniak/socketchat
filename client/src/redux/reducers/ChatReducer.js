import { actions } from "../actions/ChatActions"

const initialState = {
    users:[],
    messages:[],
    currentSession:'',
    messageFieldValue: ''
}

const ChatReducer = (state = initialState ,action) =>{
    switch (action.type) {
        case actions.GET_USERS_SUCCEEDED:{
            return {
                ...state,
                users:[...action.payload.Users], 
            }
        }
        case actions.GET_DIALOG_SUCCEEDED:{
            return{
                ...state,
                messages:[ ...action.payload.messages],
                currentSession: action.payload.id
            }
        }
        case actions.CHANGE_MESSAGE_FIELD:{
            return{
                ...state,
                messageFieldValue: action.payload
            }   
        }
        case actions.MESSAGE_SEND_SUCCEEDED:{
            return{
                ...state,
                messages:[...state.messages, action.payload.message],
                messageFieldValue: ''
            }
        }
        case actions.RELOAD_DIALOG:{
            return{
                ...state,
                messages:[...action.payload.messages],
                currentSession: action.payload.id
            }
        }
        case actions.MESSAGE_RECIVED:{
            return{
                ...state,
                messages:[...state.messages, action.payload.message]
            }
        }
        default:{
            return state
        }
    }
}

export default ChatReducer