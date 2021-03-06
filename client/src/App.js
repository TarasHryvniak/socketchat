import { BrowserRouter} from 'react-router-dom'
import  {Routes}  from './pages/routes';
import './App.scss';
import { connect } from 'react-redux';
import AlertContainer from './components/Alert/AlertContainer'

function App(props) {

  return(
    <BrowserRouter>
      <div className = 'app-wrapper'>
        {props.alert.hasMessage&&< AlertContainer/>}
        <Routes />
      </div>
    </BrowserRouter>
  )
} 

const mapStateToProps = (state) =>{
  return{
    auth: state.Auth.auth,
    alert: state.Auth.alert
  }
}

export default connect(mapStateToProps)(App)
