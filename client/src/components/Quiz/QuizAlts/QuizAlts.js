import React from 'react'

import QuizAlt from './QuizAlt/QuizAlt'
import classes from './QuizAlts.module.css'

export const QuizAlts = (props) => {
    const { alternatives, correctAlt } = props

    let questionAlternatives = null

    if (alternatives) {
        questionAlternatives = alternatives.map(alternative => {
        let isCorrectAnswer = null
        if (correctAlt !== null) {
            isCorrectAnswer = alternative.alt_number === correctAlt
        }
        return (
            <QuizAlt 
            altTitle={alternative.alt_title} 
            altImg={alternative.alt_img}
            click={(alt_number) => props.onAltClick(alt_number)}
            altNumber={alternative.alt_number}
            correctAlternative={isCorrectAnswer}
            key={alternative.id}
            />
        )     
    })
    }

    return (
        <div className={`row justify-content-center ${classes.QuizAlts}`}>
            {questionAlternatives}
        </div>
    )
}




export default QuizAlts


