import {io} from 'socket.io-client'
import { actions } from '../redux/actions/ChatActions'
import store from '../redux/store'

export let Users=[]
let userSessions=[]

const URL = 'http://localhost:5000'

const socket = io(URL, { autoConnect: false})

/*socket.onAny((event, ...args)=>{
    console.log( 'onAny:  ',event, args)
})*/

socket.on('user disconnected', id =>{
    let user
    for(user of Users){
        if(user.userId === id){
            user.connected = false
        }
    }
    store.dispatch({type: actions.GET_USERS_SUCCEEDED, payload:{Users}})
})

//changing users data when new user is connected
socket.on('user connected', (newUser)=>{

        for(let user of Users){
            if(user.userId === newUser.userId){
                user.connected = true
                user.socketId = newUser.socketId
                newUser = null
                break
            }
        }
        if(newUser){
            Users.push(newUser)
            sortUsers()
        }
        store.dispatch({type: actions.GET_USERS_SUCCEEDED, payload:{Users}})
})

// updating Users component data when some of the dialogs is loaded and "reading" new messages  
socket.on('dialog loaded', lastMessage =>{
    for(let user of Users){
        if(user.userId === lastMessage.from){
            user.haveNewMessages = false
            user.newMessageCount = 0
            const currentUser = JSON.parse(localStorage.getItem('user'))
            for(let session of currentUser.sessions){
                if(session.users.includes(lastMessage.from)){
                    session.lastMessage = {
                        ...session.lastMessage,
                        newMessageCount: 0,
                        readed: true
                    }
                }
            }
            localStorage.setItem('user', JSON.stringify(currentUser))
            break
        }
    }
    store.dispatch({type: actions.GET_USERS_SUCCEEDED, payload:{Users}})
})

//receiving new message
socket.on('private message', ({dialogId, message, from}) =>{
    Users.forEach(user =>{
        if(user.userId === from){
            const currentSession = store.getState().ChatPage.currentSession
            // if current user is in dialog with sender pushing message to the chat
            if(dialogId === currentSession){
                store.dispatch({type: actions.MESSAGE_RECIVED, payload:{message}})
            }
            else{
                // updating Users component data with adding new message
                user.haveNewMessages = true
                user.newMessageCount++
                const currentUser = JSON.parse(localStorage.getItem('user'))
                for(let session of currentUser.sessions){
                    if(session._id === dialogId){
                        session.lastMessage = {
                            ...session.lastMessage,
                            from: from,
                            body: message.body,
                            newMessageCount: user.newMessageCount,
                            readed: false
                        }
                        break
                    }
                }
                localStorage.setItem('user', JSON.stringify(currentUser))
            }
            user.lastMessage = message.body
            store.dispatch({type: actions.GET_USERS_SUCCEEDED, payload:{Users}})
        }
    })
})

socket.on('session', ({sessionId, user, users}) =>{
    socket.auth={sessionId, user, users}
    localStorage.setItem('session', JSON.stringify({sessionId, user, users}))
    socket.user = user
    socket.users = users
})

// loading other users for current user
socket.on('users', users =>{
    userSessions = store.getState().Auth.user.sessions
    const currentUser = JSON.parse(localStorage.getItem('user'))
    Users = users.map(user =>{
        if(user.userId === currentUser.userId){
            user.userName = user.userName + '(you)'
        }
        for(let session of userSessions){
            if(session.users.includes(user.userId)){
                user.sessionId = session._id
                if(session.lastMessage){
                    let lastMessage = session.lastMessage
                    user.lastMessage = lastMessage.body
                    user.newMessageCount = lastMessage.newMessageCount
                    user.haveNewMessages = !lastMessage.readed&&lastMessage.from === user.userId
                }
                break
            }
        }
        return {...user}
    })
    sortUsers()
    store.dispatch({type: actions.GET_USERS_SUCCEEDED, payload:{Users}})
})
socket.on('connect_error', error =>{
    console.error(error)
})

const sortUsers = () =>{
    Users = Users.sort((a, b) => {return (a.userName > b.userName ?  1:  -1)})
    const currentUser = Users.find(user => user.userName.includes('(you)'))
    const currentUserIndex = Users.indexOf(currentUser)
    Users.splice(currentUserIndex, 1)
    Users.unshift(currentUser)
}

export default socket