import React, { Component } from 'react'
import { connect } from 'react-redux'


import { getToken } from '../../actions/authActions'
import { showQuizSelection, showHighScore, getPossibleQuizzes } from '../../actions/quizActions'

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import Quiz from '../../components/Quiz/Quiz'
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay'
import HighScore from '../../components/HighScore/HighScore'
import classes from './MusicQuiz.module.css'


export class MusicQuiz extends Component {

    async componentDidMount() {
        await this.props.getToken()
        await this.props.getPossibleQuizzes()
    }

    currentQuizStatus () {
        switch (this.props.quizStatus) {
            case 'Selecting Quiz':
                return <ThemeSelector />
            case 'Quiz Started':
                return <Quiz />
            case 'Showing Score':
                return <ScoreDisplay
                    quizSelectClick={() => this.props.showQuizSelection()}
                    highScoreClick={() => this.props.showHighScore()}
                    score={this.props.score}
                    highScores={this.props.highScores}
                />
            case 'Showing HighScore':
                return <HighScore />
            default:
                return null
        }
    }

    render() {
        return (
            <div className={`col ${classes.MusicQuiz}`}>
                <SpotifyPlayer/>
                {this.props.quizStatus ? this.currentQuizStatus() : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizStarted: state.quiz.quizStarted,
    quizStatus: state.quiz.quizStatus,
    score: state.questions.score
})

export default connect(mapStateToProps, {
    getToken,
    showQuizSelection,
    showHighScore,
    getPossibleQuizzes 
})(MusicQuiz)
