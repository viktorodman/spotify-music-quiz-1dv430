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
            <div className="ui four column centered grid">

                <SelectorItem itemNumber="choice-1" quizImages={this.props.quizzes[0]}/>
                <SelectorItem itemNumber="choice-2" quizImages={this.props.quizzes[1]}/>
                <SelectorItem itemNumber="choice-3" quizImages={this.props.quizzes[2]}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizzes: state.quiz.possibleQuizzes
})



export default connect(mapStateToProps, { selectQuiz, getPossibleQuizzes })(ThemeSelector)
