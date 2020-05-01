import React from 'react'
import QuizAlt from './QuizAlt/QuizAlt'

import classes from './QuizAlts.module.css'

export const QuizAlts = (props) => {
    return (
        <div className={`row ${classes.QuizAlts}`}>
        <div className='ui two stackable cards'>
                <QuizAlt altTitle={props.quizAlternatives[0].alt_title} altImg={props.quizAlternatives[0].alt_img}/>
                <QuizAlt altTitle={props.quizAlternatives[1].alt_title} altImg={props.quizAlternatives[1].alt_img}/>
                <QuizAlt altTitle={props.quizAlternatives[2].alt_title} altImg={props.quizAlternatives[2].alt_img}/>
                <QuizAlt altTitle={props.quizAlternatives[3].alt_title} altImg={props.quizAlternatives[3].alt_img}/>
        </div>
        </div>
    )
}

export default QuizAlts
