import { combineReducers } from 'redux'

import authReducer from './authReducer'
import songReducer from './songReducer'
import playerReducer from './playerReducer'
import quizReducer from './quizReducer'
import timerReducer from './timerReducer'

export default combineReducers({
    auth: authReducer,
    song: songReducer,
    player: playerReducer,
    quiz: quizReducer,
    timer: timerReducer
})