import { combineReducers } from 'redux'

import authReducer from './authReducer'
import songReducer from './songReducer'
import playerReducer from './playerReducer'
import quizReducer from './quizReducer'

export default combineReducers({
    auth: authReducer,
    song: songReducer,
    player: playerReducer,
    quiz: quizReducer
})