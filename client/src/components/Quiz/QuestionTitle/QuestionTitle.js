import React from 'react'
import classes from './QuestionTitle.module.css'

export const QuestionTitle = (props) => {
    return (
        <div>
            <div className="col-12">
                <h5 className={`text-center ${classes.questionNumber}`}>{props.questionNumber} / {props.numberOfQuestions}</h5>
            </div>
             <div className="col-12">
                <h5 className={`text-center ${classes.QuestionTitle}`}>{props.title}</h5>
            </div>
        </div>
    )
}

export default QuestionTitle