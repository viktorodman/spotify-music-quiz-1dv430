import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions, nextQuestion, sendAnswer, showScore } from '../../actions/quizActions'
import { playSong } from '../../actions/playerActions'

import classes from './Quiz.module.css'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizAlts from './QuizAlts/QuizAlts'
import QuizTimer from './QuizTimer/QuizTimer'


export class Quiz extends Component {
    async componentDidMount() {
        await this.props.getQuestions(this.props.selectedQuiz)
        
    }

    render() {
        const { currentQuestion } = this.props
        if(currentQuestion ) {
            /* this.props.playSong(currentQuestion.question_track_url, this.props.deviceId) */
            return (
                <div className={`jumbotron ${classes.Quiz}`}>
                    <p>{this.props.currentQuestionNumber}</p>
                    <QuizQuestion 
                    questionImg={currentQuestion.question_img}
                    questionText={currentQuestion.question_title}
                    />
                    <QuizTimer />
                    <QuizAlts/>
                    {this.props.selectedAnswer ? <button onClick={() => this.props.nextQuestion(this.props.currentQuestionNumber) }>Next Question</button>:null}
                    
                    
                </div>
            )
        }

        return (
            <div className="ui two column centered grid">
               <p>Loading</p> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentQuestion: state.quiz.currentQuestion,
    currentQuestionNumber: state.quiz.currentQuestionNumber,
    selectedQuiz: state.quiz.selectedQuiz,
    playerReady: state.player.playerReady,
    selectedAnswer: state.quiz.selectedAnswer,
    shouldShowScore: state.quiz.shouldShowScore,
    userToken: state.auth.userToken,
    deviceId: state.player.deviceId
})

export default connect(mapStateToProps, {
    getQuestions,
    nextQuestion,
    sendAnswer,
    showScore,
    playSong
})(Quiz)
