import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getHighScores, selectHighScoreTheme } from '../../actions/highScoreActions'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import HighScoreSelector from './HighScoreSelector/HighScoreSelector'
import Results from './Results/Results'

export class HighScore extends Component {

    async componentDidMount() {
        await this.props.getHighScores()
    }

    render() {
        if(this.props.highScores !== null) {
            return (
                <div className="row justify-content-md-center">
                        <HighScoreSelector 
                            click={(id) => this.props.selectHighScoreTheme(id)}
                            themes={this.props.highScores}
                            selectedHighScore={this.props.selectedHighScore}
                        />
                        <Results 
                            results={this.props.selectedHighScore.scores}
                        />
                </div>
            )
        }


        return (
            <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => ({
    highScores: state.highScore.highScores,
    selectedHighScore: state.highScore.selectedHighScore,
    quizzes: state.quiz.possibleQuizzes
})


export default connect(mapStateToProps, {
    getHighScores,
    selectHighScoreTheme
})(HighScore)

/* <div>
                    <p>{this.props.highScores[0].playlistName}</p>
                    <p>{this.props.highScores[0].numberOfQuestions}</p>
                    <p>{this.props.highScores[0].correctAnswer}</p>
                </div> */
