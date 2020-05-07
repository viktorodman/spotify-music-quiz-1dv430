import React, { Component } from 'react'

import { connect } from 'react-redux'

import { sendAnswer } from '../../../actions/quizActions'

import QuizAlt from './QuizAlt/QuizAlt'

import classes from './QuizAlts.module.css'

export class QuizAlts extends Component {


    render() {
       const alternatives = this.props.currentQuestion.question_alternatives.map(alternative => {
                let correctAnswer = null
                if (this.props.correctAnswer !== null) {
                    correctAnswer = alternative.alt_number === this.props.correctAnswer
                }
                return (
                    <QuizAlt 
                    altTitle={alternative.alt_title} 
                    altImg={alternative.alt_img}
                    click={(alt_number) => this.props.sendAnswer(this.props.currentQuestion.question_number, alt_number)}
                    altNumber={alternative.alt_number}
                    correctAlternative={correctAnswer}
                    />
                )     
       })
       return (
           alternatives ? 
           <div className='row justify-content-md-center'>
               {alternatives}
           </div> :
           <div className='row justify-content-md-center'>
               Loading
           </div>
       )
    }
}

const mapStateToProps = (state) => ({
    currentQuestion: state.quiz.currentQuestion,
    correctAnswer: state.quiz.correctAnswer,
    selectedAnswer: state.quiz.selectedAnswer
})

export default connect(mapStateToProps, {
    sendAnswer
})(QuizAlts)
