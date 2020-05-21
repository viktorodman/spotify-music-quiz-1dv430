import { combineReducers } from 'redux'

import authReducer from './authReducer'
import playerReducer from './playerReducer'
import quizReducer from './quizReducer'
import timerReducer from './timerReducer'
import questionReducer from './questionReducer'

export default combineReducers({
    auth: authReducer,
    player: playerReducer,
    quiz: quizReducer,
    timer: timerReducer,
    questions: questionReducer
})