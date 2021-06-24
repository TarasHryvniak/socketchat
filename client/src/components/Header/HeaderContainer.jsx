import { connect } from "react-redux"
import { logoutAC, reloginAC } from "../../redux/actions/ChatActions"
import Header from "./Header"


const mapStateToProps = (state) =>{
    return{ 
        user:{...state.Auth.user},
        }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        logout: () =>{
            dispatch(logoutAC())
        },
        relogin: (payload) =>{
            dispatch(reloginAC(payload))
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
export default HeaderContainer