import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions, nextQuestion, sendAnswer, showScore } from '../../actions/quizActions'

import classes from './Quiz.module.css'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizAlts from './QuizAlts/QuizAlts'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'

export class Quiz extends Component {
    async componentDidMount() {
        await this.props.getQuestions(this.props.selectedQuiz)
        
    }

   

    changeQuestion () {
        if (this.props.currentQuestionNumber === 7) {
            this.props.showScore()
        } else {
            this.props.nextQuestion()
        }
    }

    render() {
        const { currentQuestion} = this.props
        if(currentQuestion) {
            return (
                <div className={`jumbotron ${classes.Quiz}`}>
                    {this.props.shouldShowScore 
                    ? <p>SCORE</p>
                    :<div>
                    <QuizQuestion 
                    questionImg={currentQuestion.question_img}
                    questionText={currentQuestion.question_title}
                    />
                    <p>{this.props.currentQuestionNumber}</p>
                    <QuizAlts/>
                    {/* <SpotifyPlayer song={currentQuestion.question_track_url}/> */}
                    {this.props.selectedAnswer ? <button onClick={() => this.changeQuestion() }>Next Question</button>:null}
                    </div>
                    }
                    
                     
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
    currentQuestionNumber: state.quiz.currentQuestionNumber,
    currentQuestion: state.quiz.currentQuestion,
    selectedQuiz: state.quiz.selectedQuiz,
    playerReady: state.player.playerReady,
    selectedAnswer: state.quiz.selectedAnswer,
    shouldShowScore: state.quiz.shouldShowScore
})

export default connect(mapStateToProps, {
    getQuestions,
    nextQuestion,
    sendAnswer,
    showScore
})(Quiz)
