import { NavLink } from 'react-router-dom'
import style from './Users.module.scss'

const UsersItem = (props) =>{
    return(
        <NavLink 
         to={`/users/${props.user.userId}`} 
         className={style.user}>
            <div className={style.user_info}>
                <h5 className={style.user_name}>{props.user.userName}</h5>
                <p className={style.user_status}>{props.user.connected ? 'online': 'offline'}</p>
            </div>
            <div className={style.message_wrapper}>
                <p>{props.user.lastMessage||''}</p>
                <p className={style.message_new}>{props.user.newMessageCount || ''}</p>
            </div>
        </NavLink>
    )
}

export default UsersItem