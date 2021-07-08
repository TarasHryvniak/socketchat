import { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { useHistory } from 'react-router'
import style from './Header.module.scss'

const Header = (props) =>{

    const history = useHistory()

    useEffect((relogin = props.relogin) => {
        const user = localStorage.getItem('user')
        if(user){
            relogin(JSON.parse(user))
        }
    }, [props.relogin])

    const logoutHandler = () =>{
        props.logout()
        history.push('/')

    }
    return(
        <div className = {style.header_wrapper}>
            <div className={style.chat_title}>
                <h1>THIS IS A CHAT</h1>
            </div>
            <div className = {style.auth_block}>
            <h3 className={style.user_name}>{props.user.userName}</h3>
            <NavLink 
                to="/"
                className={style.logout} 
                onClick={logoutHandler}>Logout</NavLink>
            </div>
        </div>
    )
}

export default Header