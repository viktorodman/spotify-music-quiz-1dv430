import React, { Component } from 'react'

import { connect } from 'react-redux'

import { sendAnswer } from '../../../actions/quizActions'

import QuizAlt from './QuizAlt/QuizAlt'

import classes from './QuizAlts.module.css'

export class QuizAlts extends Component {

    render() {
       const alternatives = this.props.currentQuestion.question_alternatives.map(alternative => {

                return (
                    <QuizAlt 
                    altTitle={alternative.alt_title} 
                    altImg={alternative.alt_img}
                    click={(alt_number) => this.props.sendAnswer(this.props.currentQuestion.question_number, alt_number)}
                    altNumber={alternative.alt_number}
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
    /* return (
        <div className='row justify-content-md-center'>
                <QuizAlt 
                    altTitle={props.quizAlternatives[0].alt_title} 
                    altImg={props.quizAlternatives[0].alt_img}
                    click={(alt_number) => props.click(alt_number)}
                    altNumber={props.quizAlternatives[0].alt_number}
                    />
                <QuizAlt 
                    altTitle={props.quizAlternatives[1].alt_title} 
                    altImg={props.quizAlternatives[1].alt_img}
                    click={(alt_number) => props.click(alt_number)}
                    altNumber={props.quizAlternatives[1].alt_number}
                    />
                <div className="w-100"></div>
                <QuizAlt 
                    altTitle={props.quizAlternatives[2].alt_title} 
                    altImg={props.quizAlternatives[2].alt_img}
                    click={(alt_number) => props.click(alt_number)}
                    altNumber={props.quizAlternatives[].alt_number}
                    />
                <QuizAlt 
                    altTitle={props.quizAlternatives[3].alt_title} 
                    altImg={props.quizAlternatives[3].alt_img}
                    click={(alt_number) => props.click(alt_number)}
                    altNumber={props.quizAlternatives[].alt_number}
                    />
        </div>
    ) */
}

const mapStateToProps = (state) => ({
    currentQuestion: state.quiz.currentQuestion
})

export default connect(mapStateToProps, {
    sendAnswer
})(QuizAlts)
