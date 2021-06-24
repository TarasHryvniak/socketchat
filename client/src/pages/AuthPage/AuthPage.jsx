import {NavLink} from 'react-router-dom'
import style from './AuthPage.module.scss'


export const AuthPage = (props) => {

    const onFieldСhangeHandler = (event) =>{
        props.changeAuthForm({[event.target.name]: event.target.value})
    }

    const loginHandler = () =>{
        props.login({form:props.authForm})
    }

    return(
        <div className = {style.auth_wrapper}>
            <h4 className={style.auth_title}>LOGIN</h4>
            <div className={style.auth_fields_wrapper}>
                
                <input
                    className={style.auth_field}
                    type = "textarea"
                    name = 'email'
                    value = {props.authForm.email}
                    onChange = {onFieldСhangeHandler}
                    placeholder="input email"></input>
                <input 
                    className={style.auth_field}
                    type = "password"
                    name = 'password'
                    value = {props.authForm.password} 
                    onChange = {onFieldСhangeHandler}  
                    placeholder="input password"></input>
            </div>
            <div className={style.auth_button_wrapper}>
                <button className = {style.auth_button} onClick={loginHandler}>Login</button>
                <NavLink className = {style.auth_link} to='/register' >Register Now</NavLink>
            </div>
        </div>
    )
}