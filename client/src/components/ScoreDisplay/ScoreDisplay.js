import React from 'react'

import classes from './ScoreDisplay.module.css'

export const ScoreDisplay = (props) => {
    return (
        <div className="row justify-content-md-center">
        <div className="col-12">
            <h5 className={`text-center ${classes.score}`}>SCORE: {props.score}</h5>
        </div>
        <div className="col-4 align-self-center">
            <button onClick={() => props.quizSelectClick()} type="button" className="btn btn-outline-danger btn-lg btn-block">Go to quiz selection</button>
            <button onClick={() => props.highScoreClick()} type="button" className="btn btn-outline-secondary btn-lg btn-block">Show high-score</button>
        </div>
        </div>
    )
}

export default ScoreDisplay

