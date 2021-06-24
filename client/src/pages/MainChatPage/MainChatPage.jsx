import { useEffect } from "react"
import { Route, Switch } from "react-router"
import { BrowserRouter } from "react-router-dom"
import socket from "../../socket/socket"
import ChatContainer from "../../components/Chat/ChatContainer"  
import ChatUsersContainer from "../../components/Users/UsersContainer"
import HeaderContainer from "../../components/Header/HeaderContainer"
import style from './MainChatPage.module.scss'

export const MainChatPage = (props) =>{

    useEffect(() => {
        const session = localStorage.getItem('session')
        if(session){
            const user = JSON.parse(session)
            socket.auth = {...user}
            socket.connect()
        }
    }, [])
    return(
        <BrowserRouter>
        <div className={style.mainPageWrapper}>
                <HeaderContainer />
                <Switch>
                    <Route path="/users/:id"> 
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