import React from 'react'

import classes from './QuizQuestion.module.css'

export const QuizQuestion = (props) => {
    return (
        <div className="row justify-content-center">
            <div className={`col ${classes.QuizQuestion}`}>
                <div className="card text-white bg-dark">
                    <img src={props.questionImg} className="card-img" alt="Quiz img"/>
                    <div className="card-img-overlay">
                        <h5 className="card-title text-monospace text-center bg-dark">{props.questionText}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion
