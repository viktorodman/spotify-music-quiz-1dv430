import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestions } from '../../actions/quizActions'

export class Quiz extends Component {
    componentDidMount() {
        this.props.getQuestions(this.props.selectedQuiz)
    }

    render() {
        if(this.props.questions) {
            console.log(this.props.questions)
        }
        return (
            <div>
                {this.props.questions 
                ? 
                <div>
                    <img src={this.props.questions[0].question_img}/>
                    <p>{this.props.questions[0].question_title}</p>
                </div>
                :null
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.quiz.questions,
    selectedQuiz: state.quiz.selectedQuiz
})

export default connect(mapStateToProps, { getQuestions })(Quiz)
