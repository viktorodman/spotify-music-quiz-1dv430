import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getHighScores, selectHighScoreTheme } from '../../actions/highScoreActions'
import { showQuizSelection } from '../../actions/quizActions'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import HighScoreSelector from './HighScoreSelector/HighScoreSelector'
import Results from './Results/Results'
import NextButton from '../Quiz/NextButton/NextButton'

export class HighScore extends Component {

    async componentDidMount() {
        await this.props.getHighScores()
    }

    render() {
        if(this.props.highScores !== null) {
            return (
                <div className="row justify-content-md-center">
                        <h5 className="text-center">Top Five Results</h5>
                        <HighScoreSelector 
                            click={(id) => this.props.selectHighScoreTheme(id)}
                            themes={this.props.highScores}
                            selectedHighScore={this.props.selectedHighScore}
                        />
                        <Results 
                            results={this.props.selectedHighScore.scores}
                        />
                        <NextButton
                            shouldDisplay={true} 
                            buttonText={`Go to quiz selection`}
                            click={() => this.props.showQuizSelection()}
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
    selectedHighScore: state.highScore.selectedHighScore
})


export default connect(mapStateToProps, {
    getHighScores,
    selectHighScoreTheme,
    showQuizSelection
})(HighScore)


