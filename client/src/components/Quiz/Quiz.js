import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions, nextQuestion } from '../../actions/questionActions'
import { startTimer, resetTimer, stopTimer } from '../../actions/timerActions'
import { stopSong } from '../../actions/playerActions'
import { sendAnswer} from '../../actions/questionActions'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizTimer from './QuizTimer/QuizTimer'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import NextButton from './NextButton/NextButton'

import classes from './Quiz.module.css'


export class Quiz extends Component {
    async componentDidMount() {
        await this.props.getQuestions(this.props.selectedQuiz)
    }

    handleQuestionChange () {
        const {questions, questionIndex} = this.props
        const question_number = questions[questionIndex].question_number

        this.props.nextQuestion(question_number)
        this.props.resetTimer()
    }

    async handleTimesUp () {
        const {questions, questionIndex} = this.props

        const question_number = questions[questionIndex].question_number
        await this.props.sendAnswer(question_number, 5)
        await this.props.stopSong(this.props.deviceId)
    }

    async handleAnswerSelected(question_number, alt_number) {
        this.props.stopTimer()
        await this.props.sendAnswer(question_number, alt_number)
        await this.props.stopSong(this.props.deviceId)
    }


    render() {
        const { questionsReady, correctAnswer } = this.props

        if(questionsReady) {
            if (!correctAnswer){
                this.props.startTimer()
            }
            return (
                <div className={`jumbotron ${classes.Quiz}`}>
                    <QuizTimer 
                        onTimesUp={() => this.handleTimesUp()}
                    />
                    <QuizQuestion 
                        onAnswer={(question_number, alt_number) => this.handleAnswerSelected(question_number, alt_number)}
                    />
                    <NextButton 
                        shouldDisplay={this.props.correctAnswer !== null}
                        click={() => this.handleQuestionChange()}
                    />
                </div>
            )
        }

        return <LoadingSpinner />
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    playerReady: state.player.playerReady,
    questionsReady: state.questions.questionsReady,
    deviceId: state.player.deviceId,
    correctAnswer: state.questions.correctAnswer,
    questions: state.questions.questions,
    questionIndex: state.questions.currentQuestionIndex
})

export default connect(mapStateToProps, {
    getQuestions,
    nextQuestion,
    startTimer,
    resetTimer,
    stopTimer,
    stopSong,
    sendAnswer
})(Quiz)
