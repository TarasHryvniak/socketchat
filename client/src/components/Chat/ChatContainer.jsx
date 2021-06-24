import { connect } from "react-redux"
import { changeMessageFieldAC, getDialogAC, reloadDialogAC, sendMessageAC } from "../../redux/actions/ChatActions"
import Chat from "./Chat"

const mapStateToProps = (state) =>{
    return{
        messages: [...state.ChatPage.messages],
        currentSession: state.ChatPage.currentSession,
        messageFieldValue: state.ChatPage.messageFieldValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getDialog: (payload) =>{
            dispatch(getDialogAC(payload))
        },
        sendMessage: (payload) =>{
            dispatch(sendMessageAC(payload))
        },
        reloadDialog: (payload) =>{
            dispatch(reloadDialogAC(payload))
        },
        changeMessageFiled: (payload) =>{
            dispatch(changeMessageFieldAC(payload))
        }
    }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer