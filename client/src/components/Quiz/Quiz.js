import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions } from '../../actions/quizActions'

import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizAlts from './QuizAlts/QuizAlts'

export class Quiz extends Component {
    componentDidMount() {
        this.props.getQuestions(this.props.selectedQuiz)
    }

    render() {
        if(this.props.questions) {
            return (
                <div className="column">
                    <div className="row">
                    <QuizQuestion 
                    questionImg={this.props.questions[0].question_img}
                    questionText={this.props.questions[0].question_title}
                    />
                    </div>
                    <div className="row">
                    <QuizAlts 
                    quizAlternatives={this.props.questions[0].question_alternatives}
                    />
                    </div>
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
    questions: state.quiz.questions,
    selectedQuiz: state.quiz.selectedQuiz
})

export default connect(mapStateToProps, { getQuestions })(Quiz)
