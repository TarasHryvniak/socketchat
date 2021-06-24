import { hideAlertAC } from "../../redux/actions/ChatActions"
import { connect } from "react-redux"
import Alert from "./Alert"

const mapStateToProps = (state) =>{
    return{
        ...state.Auth.alert
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        hideAlert: () =>{
            dispatch(hideAlertAC())
        }
    }
}

const AlertContainer = connect(mapStateToProps,mapDispatchToProps)(Alert)
export default AlertContainer