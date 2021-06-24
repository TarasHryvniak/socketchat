import { connect } from 'react-redux'
import { changeAuthFormAC, registrationAC } from '../../redux/actions/ChatActions'
import RegisterPage from "./RegisterPage"

const mapStateToProps = (state) =>{
    return{
        ...state.Auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        registration: (payload) => {
            dispatch(registrationAC(payload))
        },
        changeRegistrationForm: (payload) =>{
            dispatch(changeAuthFormAC(payload))
        }   
    }
}

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
export default RegisterPageContainer