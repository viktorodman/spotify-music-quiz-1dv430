import React from 'react'

import Result from './Result/Result'

export const Results = (props) => {
    const quizResults = props.results.map(result => {
        return (
            <Result 
                numberOfQuestions={result.numberOfQuestions}
                correctAnswers={result.correctAnswer}
            />
        )
    }) 

    return (
        <div className="col-12 text-center">
            {props.results.length < 1 ? <p>No results found...</p> : {quizResults}}
        </div>
    )
}

export default Results