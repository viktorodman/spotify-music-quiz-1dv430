import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions, nextQuestion, sendAnswer, resetQuestions, resetScore } from '../../actions/questionActions'
import { startTimer, resetTimer, stopTimer } from '../../actions/timerActions'
import { stopSong, playSong } from '../../actions/playerActions'
import { showScore } from '../../actions/quizActions'
import { addScore } from '../../actions/highScoreActions'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizTimer from './QuizTimer/QuizTimer'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import NextButton from './NextButton/NextButton'

import classes from './Quiz.module.css'


export class Quiz extends Component {
    async componentDidMount() {
        await this.props.getQuestions(this.props.selectedQuiz)
        this.props.resetScore()
    }

    async handleQuestionChange () {
        const { questions, questionIndex, score, quizTitle } = this.props

        if (questions[questionIndex].question_number >= questions.length) {
            await this.props.addScore(quizTitle, score, questions.length)
            this.props.resetQuestions()
            this.props.showScore()
        } else {
            this.props.nextQuestion()
            this.props.resetTimer()
        }
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
                this.props.playSong(this.props.questions[this.props.questionIndex].question_track_url, this.props.deviceId)
                this.props.startTimer()
            }
            return (
                <div className={`jumbotron ${classes.Quiz}`}>
                    <QuizTimer 
                        onTimesUp={() => this.handleTimesUp()}
                    />
                    <QuizQuestion
                        numOfQuestions={this.props.questions.length}
                        question={this.props.questions[this.props.questionIndex]} 
                        onAnswer={(question_number, alt_number) => this.handleAnswerSelected(question_number, alt_number)}
                        answerMessage={this.props.answerMessage}
                        selectedAnswer={this.props.selectedAnswer}
                        correctAnswer={this.props.correctAnswer}
                    />
                    <NextButton 
                        shouldDisplay={this.props.correctAnswer !== null}
                        click={() => this.handleQuestionChange()}
                        buttonText={this.props.questions[this.props.questionIndex].question_number >= this.props.questions.length ? 'Show results': 'Next question'}
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
    questionIndex: state.questions.currentQuestionIndex,
    score: state.questions.score,
    quizTitle: state.quiz.selectedQuizTitle,
    answerMessage: state.questions.answerMessage,
    selectedAnswer: state.questions.selectedAnswer
})

export default connect(mapStateToProps, {
    getQuestions,
    nextQuestion,
    startTimer,
    resetTimer,
    stopTimer,
    stopSong,
    playSong,
    sendAnswer,
    showScore,
    addScore,
    resetQuestions, 
    resetScore
})(Quiz)
