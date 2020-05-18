import React, { Component } from 'react'
import { connect } from 'react-redux'


import { getToken } from '../../actions/authActions'

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import Quiz from '../../components/Quiz/Quiz'
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'
import classes from './MusicQuiz.module.css'


class MusicQuiz extends Component {

    async componentDidMount() {
        await this.props.getToken()
    }

    currentQuizStatus () {
        switch (this.props.status) {
            case 'Selecting Quiz':
                return <ThemeSelector />
            case 'Quiz Started':
                return <Quiz />
            case 'Showing Score':
                return <p>SCORE: {this.props.score}</p>
            default:
                return null
        }
    }

    render() {
        return (
            <div className={`col ${classes.MusicQuiz}`}>
                <SpotifyPlayer/>
                {this.currentQuizStatus()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizStarted: state.quiz.quizStarted,
    status: state.quiz.quizStatus,
    score: state.quiz.score
})

export default connect(mapStateToProps, { getToken })(MusicQuiz)
