import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectQuiz, getPossibleQuizzes, startQuiz } from '../../actions/quizActions'
import classes from './ThemeSelector.module.css'

import SelectorItem from './SelectorItem/SelectorItem'
class ThemeSelector extends Component {
    componentDidMount() {
        this.props.getPossibleQuizzes()
    }

    showQuizzes () {
        return (
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
        )
    }

    render() {
        if (!this.props.quizzes) {
            return <div>Loading...</div>
        }
        return (
            <div className={`row justify-content-md-center ${classes.ThemeSelector}`}>
                {this.showQuizzes()}
            { this.props.selectedQuiz ?
                <div className="row justify-content-md-center">
                    <div className="column">
                        <button onClick={() => this.props.startQuiz() }>Start</button>
                    </div>
                </div>: null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizzes: state.quiz.possibleQuizzes,
})



export default connect(mapStateToProps, { selectQuiz, getPossibleQuizzes, startQuiz})(ThemeSelector)
