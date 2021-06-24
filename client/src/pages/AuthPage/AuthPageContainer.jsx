import { connect } from "react-redux"
import { changeAuthFormAC, loginAC, registrationAC } from "../../redux/actions/ChatActions"
import { AuthPage } from "./AuthPage"

const mapStateToProps = (state) => {
    return {
        ...state.Auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registration: (payload) => {
            dispatch(registrationAC(payload))
        },
        login: (payload) => {
            dispatch(loginAC(payload))
        },
        changeAuthForm: (payload) =>{
            dispatch(changeAuthFormAC(payload))
        }
    }
}

const AuthPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthPage)

export default AuthPageContainer