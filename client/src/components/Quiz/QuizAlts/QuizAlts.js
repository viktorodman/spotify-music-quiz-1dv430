import React from 'react'
import QuizAlt from './QuizAlt/QuizAlt'

import classes from './QuizAlts.module.css'

export const QuizAlts = (props) => {
    return (
        <div className='row justify-content-md-center'>
                <QuizAlt altTitle={props.quizAlternatives[0].alt_title} altImg={props.quizAlternatives[0].alt_img}/>
                <QuizAlt altTitle={props.quizAlternatives[1].alt_title} altImg={props.quizAlternatives[1].alt_img}/>
                <div className="w-100"></div>
                <QuizAlt altTitle={props.quizAlternatives[2].alt_title} altImg={props.quizAlternatives[2].alt_img}/>
                <QuizAlt altTitle={props.quizAlternatives[3].alt_title} altImg={props.quizAlternatives[3].alt_img}/>
        </div>
    )
}

export default QuizAlts
