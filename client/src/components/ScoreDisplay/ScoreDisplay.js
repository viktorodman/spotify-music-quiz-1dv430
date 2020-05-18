import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ScoreDisplay extends Component {
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col">
                    <h5 className="text-center">SCORE: {this.props.score}</h5>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    score: state.quiz.score
})

export default connect( mapStateToProps )(ScoreDisplay)
