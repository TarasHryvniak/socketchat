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
    
    const users = props.users.map(user =>
            <UsersItem 
            key = {user.userId}
            user = {user}/>)

    return(
        <div className={style.chatUsers}>
            <div className={style.user_wrapper} id='users'>
                {users}
            </div>
        </div>
    )
}

export default ChatUsers