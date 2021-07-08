import { connect } from "react-redux"
import ChatUsers from "./Users"

const mapStateToProps = (state) =>{
    return{
        users:[...state.ChatPage.users],
        currentSession: state.ChatPage.currentSession
    }
}

const mapDispatchToProps = (dispath) =>{
    return{

    }
}

const ChatUsersContainer = connect(mapStateToProps,mapDispatchToProps)(ChatUsers)

export default ChatUsersContainer