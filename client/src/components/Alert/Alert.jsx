import { useEffect } from 'react'
import style from './Alert.module.scss'

const Alert = (props) =>{

    useEffect((hideAlert = props.hideAlert) => {
        hideAlert()
    }, [props.hideAlert])

    let messageStyle = style.alert_message
    if(props.isError){
        messageStyle = style.error_message
    }
    return(
        <div className={style.alert_wrapper}>
            <h4 className={messageStyle}>{props.message||'something went wrong, please try again'}</h4>
        </div> 
    
    )}

export default Alert