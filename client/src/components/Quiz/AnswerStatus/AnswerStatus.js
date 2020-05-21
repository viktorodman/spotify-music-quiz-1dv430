import React from 'react'

import classes from './AnswerStatus.module.css'

export const AnswerStatus = (props) => {
    let answerColor


        
        answerColor = props.message === 'Correct' ? classes.correctAnswer : classes.wrongAnswer

        let shouldShow = props.message === null ? 'invisible' : 'visible'

        return (
            <div className={`col-12 ${classes.AnswerStatus}`}>
       
            <h5 className={`text-center ${answerColor} ${shouldShow}`}>{props.message === null ? 'PLACEHOLDER' : props.message}</h5>            
            </div>
        )
}

export default AnswerStatus
