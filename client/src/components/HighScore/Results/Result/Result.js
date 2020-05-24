import React from 'react'

export const Result = (props) => {
    return (
        <div>
            <p>{props.correctAnswers} out of {props.numberOfQuestions}</p>
        </div>
    )
}

export default Result
