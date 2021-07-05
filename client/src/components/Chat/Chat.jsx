import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import style from './Chat.module.scss'
import Message from './Message'

const Chat = (props) =>{

    const id = useParams().id
    const currentSession = useCallback(
        () => {
            return JSON.parse(localStorage.getItem('currentSession'))
        },[])()


    useEffect(() => {
        // loading another chat or reloading current
        if(!currentSession||currentSession.id!==id){
            props.getDialog({userId: id})
        }
        else{
            props.reloadDialog({...currentSession})
        }
    }, [id])

    const keyPressHendler = (event) =>{
        if(event.key === 'Enter'&& event.target.value){
            const dialogId = currentSession.id
            props.sendMessage({
                dialogId,
                to: id,
                content: event.target.value
            })
        }
    }

    const onFieldChangeHandler = (event) =>{
        props.changeMessageFiled(event.target.value)
    }
       const messageItems = props.messages.map(message => {
        let messageStyle = style.message
        if(message.from === id){
            messageStyle = style.your_message
        }
        return (<Message 
                key={message._id} 
                messageStyle={messageStyle}
                message={message} />)
       })

    return(
        <div className = {style.Dialog}>
            <div className = {style.dialog_wrapper}>
            {messageItems}
            </div>
            <input
                 className = {style.messageInput}
                 type='text'
                 placeholder='write your message here'
                 value={props.messageFieldValue}
                 onChange={onFieldChangeHandler}
                 onKeyPress={keyPressHendler}>
            </input>
        </div>
    )
}

export default Chat