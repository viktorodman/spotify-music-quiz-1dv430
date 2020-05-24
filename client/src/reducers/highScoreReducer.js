import { FETCH_HIGH_SCORES, SELECT_HIGH_SCORE } from '../actions/types'

const initialState = {
    highScores: null,
    selectedHighScore: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_HIGH_SCORES:
            return {
                ...state,
                highScores: payload,
                selectedHighScore: payload[0]
            }
        case SELECT_HIGH_SCORE:
            const sHighScore = state.highScores.find(score => score.playlistName === payload)
            return {
                ...state,
                selectedHighScore: sHighScore
            }
    default:
        return state
    }
}
