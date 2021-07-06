import {NavLink} from 'react-router-dom'
import style from './AuthPage.module.scss'


export const AuthPage = (props) => {

    const onFieldСhangeHandler = (event) =>{
        props.changeAuthForm({[event.target.name]: event.target.value})
    }

    const loginHandler = (e) =>{
        e.preventDefault()
        props.login({form:props.authForm})
    }

    return(
        <div className={style.auth_wrapper}>
            <h4 className={style.auth_title}>LOGIN</h4>
            <form className={style.auth_form} onSubmit={loginHandler}>
                <input
                    type='email'
                    name='email'
                    className={style.auth_field}
                    value={props.authForm.email}
                    onChange = {onFieldСhangeHandler}
                    pattern='[A-Za-z_.1-9]+[@][A-Za-z.]+'
                    required
                    placeholder='input email'></input>
                <input
                    type = 'password'
                    name = 'password'
                    className={style.auth_field}
                    value = {props.authForm.password}
                    onChange = {onFieldСhangeHandler}
                    pattern='[A-Za-z1-9]+' 
                    required  
                    placeholder="input password"></input>
                <div className={style.auth_button_wrapper}>
                    <input 
                        type='submit' 
                        className = {style.auth_button}
                        value='Login'></input>
                    <NavLink className = {style.auth_link} to='/register' >Register Now</NavLink>
                </div>
            </form>
        </div>
    )
}