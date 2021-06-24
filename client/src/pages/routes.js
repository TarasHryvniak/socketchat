import { Redirect, Route, Switch } from "react-router"
import AuthPageContainer from "./AuthPage/AuthPageContainer"
import { MainChatPage } from "./MainChatPage/MainChatPage"
import Cookies from 'js-cookie'
import RegisterPageContainer from "./AuthPage/RegisterPageContainer"

export const useRoutes = () =>{

    const token = Cookies.get('token')
    if(token)
        return(
            <Switch>
                <Route path='/' exact>
                    <MainChatPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    return(
        <Switch>
            <Route path='/' exact>
                <AuthPageContainer/>
            </Route>
            <Route path='/register' exact>
                <RegisterPageContainer />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}