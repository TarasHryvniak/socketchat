import { NavLink } from 'react-router-dom'
import style from './Users.module.scss'

const UsersItem = (props) =>{
    const onClickHandler = () =>{
        localStorage.removeItem('currentSession')
    }

    let message = props.user.lastMessage||''
    let userStyle = style.user

    if(props.isSelected){
        userStyle = style.selected_user
    }

    if(message.length > 10){
        message = message.slice(0,15) + '...'
    }
    return(
        <li className={userStyle}>
            <NavLink 
            to={`/dialog/${props.user.userId}`} 
            onClick={onClickHandler}>
                <div className={style.user_info}>
                    <h5 className={style.user_name}>{props.user.userName}</h5>
                    <p className={style.user_status}>{props.user.connected ? 'online': 'offline'}</p>
                </div>
                <div className={style.message_wrapper}>
                    {message||<p className={style.message_placeholder}>no messages yet</p>}
                    <p className={style.message_new}>{props.user.newMessageCount || ''}</p>
                </div>
            </NavLink>
        </li>
    )
}

export default UsersItem