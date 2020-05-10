import React from 'react'

import classes from './QuizQuestion.module.css'

export const QuizQuestion = (props) => {
    return (
        <div className="row justify-content-center">
            <div className={`col ${classes.QuizQuestion}`}>
                <div className="card text-white bg-dark">
                    <img src={props.questionImg} className="card-img" alt="Quiz img"/>
                </div>
            </div>
            <div className="w-100"></div>
            <div className="col"><h5 className={`text-center ${classes.QuestionText}`}>{props.questionText}</h5></div>
        </div>
    )
}

export default QuizQuestion
