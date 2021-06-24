import { NavLink } from "react-router-dom"
import style from './AuthPage.module.scss'

const RegisterPage = (props) =>{

    const onFieldChangeHandler = (event) =>{
        props.changeRegistrationForm({[event.target.name]: event.target.value})
    }

    const registerHandler = () =>{
        props.registration({form:props.authForm})
    }

    return(
            <div className={style.auth_wrapper}>
                <h4 className={style.auth_title}>REGISTER</h4> 
                <div className={style.auth_fields_wrapper}>
                <input
                    className={style.auth_field}
                    type="text"
                    name="email"
                    placeholder="enter email"
                    onChange={onFieldChangeHandler}
                ></input>
                <input
                    className={style.auth_field}
                    type="password"
                    name="password"
                    placeholder="enter password"
                    onChange={onFieldChangeHandler}
                ></input>
                <input
                    className={style.auth_field}
                    type="text"
                    name="userName"
                    placeholder='enter your nickname'
                    onChange={onFieldChangeHandler}
                ></input>
                </div>
                <div className={style.auth_button_wrapper}>
                    <button className={style.auth_button} onClick={registerHandler}>Register</button>
                    <NavLink className={style.auth_link} to='/'>login</NavLink>
                </div>
            </div>
    )
}

export default RegisterPage