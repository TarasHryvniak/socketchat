import { useEffect } from "react"
import { Route, Switch, useHistory, useParams } from "react-router"
import { BrowserRouter } from "react-router-dom"
import socket from "../../socket/socket"
import ChatContainer from "../../components/Chat/ChatContainer"  
import ChatUsersContainer from "../../components/Users/UsersContainer"
import HeaderContainer from "../../components/Header/HeaderContainer"
import style from './MainChatPage.module.scss'

export const MainChatPage = (props) =>{

    const history = useHistory()
    const id = useParams()

    useEffect(() => {
        const session = localStorage.getItem('session')
        if(session){
            const user = JSON.parse(session)
            socket.auth = {...user}
            socket.connect()
        }
        const currentSession = JSON.parse(localStorage.getItem('currentSession'))
        if (currentSession&&!id){
            console.log(history.location)
            const path = `/dialog/${currentSession.id}`
            history.push(path)
        }
    })
    
    return(
        <BrowserRouter>
        <div className={style.mainPageWrapper}>
                <HeaderContainer />
                <Switch>
                    <Route path="/dialog/:id"> 
                        <ChatContainer/>
                    </Route>
                </Switch>
            <div>
                <ChatUsersContainer/>
            </div>
        </div>
        </BrowserRouter>
    )
}