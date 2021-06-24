import style from './Chat.module.scss'

const Message = (props) =>{
    return(
        <div className={style.message_wrapper}>
            <div className={props.messageStyle}>
                <h4>{props.message.sendersName}</h4>
                <h3>{props.message.body}</h3>
            </div>
        </div>
    )
}

export default Message