import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './middleware/saga/rootSaga'
import AuthReducer from './reducers/AuthReducer'
import ChatReducer from './reducers/ChatReducer'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    ChatPage: ChatReducer,
    Auth: AuthReducer
})

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store