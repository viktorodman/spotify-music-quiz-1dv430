import React from 'react'

import QuizAlts from '../QuizAlts/QuizAlts'
import AnswerStatus from '../AnswerStatus/AnswerStatus'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import classes from './QuizQuestion.module.css'

export const QuizQuestion = (props) => {
    const {numOfQuestions, question, answerMessage, selectedAnswer, correctAnswer, onAnswer} = props

    return (
        <div className="row justify-content-center">
            <QuestionTitle 
                title={question.question_title}
                questionNumber={question.question_number}
                numberOfQuestions={numOfQuestions}
            />
            <AnswerStatus message={answerMessage}/>
            <QuizAlts 
                alternatives={question.question_alternatives}
                onAltClick={(alt_number) => onAnswer(question.question_number, alt_number)}
                selectedAlt={selectedAnswer}
                correctAlt={correctAnswer}
            />
        </div>
    )
}

export default QuizQuestion