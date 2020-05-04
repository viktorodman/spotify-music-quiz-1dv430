import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions, nextQuestion, changingQuestion } from '../../actions/quizActions'

import { playSong, changingSong, setCurrentSong, stopSong } from '../../actions/playerActions'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizAlts from './QuizAlts/QuizAlts'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'

export class Quiz extends Component {
    async componentDidMount() {
        await this.props.getQuestions(this.props.selectedQuiz)
        
    }

   

    changeQuestion () {
        this.props.nextQuestion()
        

    }

    render() {
        const { currentQuestion } = this.props
        if(currentQuestion) {
            return (
                <div className="jumbotron">
                    <QuizQuestion 
                    questionImg={currentQuestion.question_img}
                    questionText={currentQuestion.question_title}
                    />
                    
                    <QuizAlts 
                    quizAlternatives={currentQuestion.question_alternatives}
                    />
                    <SpotifyPlayer />
                    <button onClick={() => this.changeQuestion() }>Next Question</button>  
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
    deviceId: state.player.deviceId,
    prevQuestion: state.quiz.prevQuestion
})

export default connect(mapStateToProps, {
    getQuestions,
    playSong,
    nextQuestion,
    changingSong,
    changingQuestion,
    setCurrentSong,
    stopSong 
})(Quiz)
