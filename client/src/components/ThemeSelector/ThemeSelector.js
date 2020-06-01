import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectQuiz, startQuiz } from '../../actions/quizActions'
import classes from './ThemeSelector.module.css'

import NextButton from '../Quiz/NextButton/NextButton'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ThemeSelectorTitle from './ThemeSelectorTitle/ThemeSelectorTitle'
import SelectorItem from './SelectorItem/SelectorItem'
export class ThemeSelector extends Component {
    showQuizzes () {
        return (
            <div className="col-11">
            <div className="card-group">
                {this.props.quizzes.map(quiz => 
                (<SelectorItem 
                quizId={quiz.id} 
                quizImage={quiz.image}
                quizDescription={quiz.description}
                key={quiz.id}
                click={(id, title) => this.props.selectQuiz(id, title)}
                />
                ))}
            </div>
            </div>
        )
    }

    render() {
        if (this.props.quizzes) {
            return (
                <div className={`row justify-content-md-center ${classes.ThemeSelector}`}>
                    <ThemeSelectorTitle />
                    {this.showQuizzes()}
                    <NextButton
                        shouldDisplay={this.props.selectedQuiz}
                        buttonText={"Start Quiz"}
                        click={() => this.props.startQuiz()}    
                    />
                </div>
            ) 
        }else {
            return <LoadingSpinner />
        }
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizzes: state.quiz.possibleQuizzes
})



export default connect(mapStateToProps, { selectQuiz, startQuiz})(ThemeSelector)
