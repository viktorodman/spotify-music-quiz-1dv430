import React from 'react'

import classes from './QuizQuestion.module.css'

export const QuizQuestion = (props) => {
    return (
            <div className={`ui centered card ${classes.QuizQuestion}`}>  
                <div className="image">
                    <img src={props.questionImg} />
                </div>
                <div className="content">
                    <span>{props.questionText}</span>
                </div>
            </div>
    )
}

export default QuizQuestion
