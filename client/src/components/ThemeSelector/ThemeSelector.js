import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectQuiz, getPossibleQuizzes } from '../../actions/quizActions'

import SelectorItem from './SelectorItem/SelectorItem'
class ThemeSelector extends Component {
    componentDidMount() {
        this.props.getPossibleQuizzes()
    }

    render() {
        if (!this.props.quizzes) {
            return <div>asd</div>
        }
        return (
            <div className="row justify-content-md-center">
            <div className="card-group">
                {this.props.quizzes.map(quiz => 
                (<SelectorItem 
                quizId={quiz.id} 
                quizImage={quiz.image}
                quizDescription={quiz.description}
                key={quiz.id}
                click={(id) => this.props.selectQuiz(id)}
                />
                ))}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizzes: state.quiz.possibleQuizzes
})



export default connect(mapStateToProps, { selectQuiz, getPossibleQuizzes})(ThemeSelector)
