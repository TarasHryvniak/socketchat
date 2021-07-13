import UsersItem from "./UsersItem"
import style from './Users.module.scss'

const ChatUsers = (props) =>{

    if(props.users.length === 0){
        return(
            <div>
                <p> something wrong </p>
            </div>
        )
    }
    
    const users = props.users.map(user =>{
        const selected = props.currentSession === user.sessionId
        console.log(user.userName, selected)
        return(
            <UsersItem 
            isSelected = {selected}
            key = {user.userId}
            user = {user}/>)
    })

    return(
        <div className={style.chatUsers}>
            <ul className={style.user_wrapper} id='users'>
                {users}
            </ul>
        </div>
    )
}

export default ChatUsers