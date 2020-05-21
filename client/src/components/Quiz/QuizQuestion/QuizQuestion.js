import React, { Component } from 'react'
import { connect } from 'react-redux'

import { playSong } from '../../../actions/playerActions'
import QuizAlts from '../QuizAlts/QuizAlts'
import AnswerStatus from '../AnswerStatus/AnswerStatus'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import classes from './QuizQuestion.module.css'


export class QuizQuestion extends Component {
    render() {
        const { questions, correctAnswer, selectedAnswer, questionIndex, answerMessage} = this.props
        const question = questions[questionIndex]
        if (!correctAnswer && !selectedAnswer){
            this.props.playSong(question.question_track_url, this.props.deviceId)
        }
        
        return (
            <div className="row justify-content-center">
                <QuestionTitle 
                    title={question.question_title}
                    questionNumber={question.question_number}
                    numberOfQuestions={questions.length}
                />
                <AnswerStatus message={answerMessage}/>
                <QuizAlts 
                    alternatives={question.question_alternatives}
                    onAltClick={(alt_number) => this.props.onAnswer(question.question_number, alt_number)}
                    selectedAlt={selectedAnswer}
                    correctAlt={correctAnswer}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions.questions,
    questionIndex: state.questions.currentQuestionIndex,
    deviceId: state.player.deviceId,
    correctAnswer: state.questions.correctAnswer,
    selectedAnswer: state.questions.selectedAnswer,
    answerMessage: state.questions.answerMessage
})


export default connect(mapStateToProps, {
    playSong
})(QuizQuestion)

