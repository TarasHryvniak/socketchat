import { NavLink } from "react-router-dom"
import style from './AuthPage.module.scss'

const RegisterPage = (props) =>{

    const onFieldChangeHandler = (event) =>{
        props.changeRegistrationForm({[event.target.name]: event.target.value})
    }

    const registerHandler = (event) =>{
        event.preventDefault()
        props.registration({form:props.authForm})
    }
    return(
            <div className={style.auth_wrapper}>
                <h4 className={style.auth_title}>REGISTER</h4> 
                <form className={style.auth_form} onSubmit={registerHandler}>
                    <input
                        className={style.auth_field}
                        type='email'
                        name='email'
                        placeholder='enter email'
                        value={props.authForm.email}
                        pattern='[A-Za-z_.1-9]+[@][A-Za-z.]+'
                        required
                        onChange={onFieldChangeHandler}
                    ></input>
                    <input
                        className={style.auth_field}
                        type='password'
                        name='password'
                        placeholder='enter password'
                        value={props.authForm.password}
                        pattern='[A-Za-z1-9]+'
                        required
                        onChange={onFieldChangeHandler}
                    ></input>
                    <input
                        className={style.auth_field}
                        type='text'
                        name='userName'
                        placeholder='enter your nickname'
                        value={props.authForm.userName}
                        pattern='[A-Za-z1-9_. -]+'
                        required
                        onChange={onFieldChangeHandler}
                    ></input>
                    <div className={style.auth_button_wrapper}>
                        <input 
                            type='submit' 
                            className={style.auth_button}
                            value='Register'></input>
                        <NavLink className={style.auth_link} to='/'>login</NavLink>
                    </div>
                </form>
            </div>
    )
}

export default RegisterPage