import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startQuiz } from '../../actions/quizActions'

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import Quiz from '../../components/Quiz/Quiz'
import classes from './MusicQuiz.module.css'

class MusicQuiz extends Component {
    render() {
        return (
            <div className={`row ${classes.MusicQuiz}`}>
                {this.props.quizStarted 
                    ? <Quiz/>
                    :
                    <div>
                        <ThemeSelector />
                        { this.props.selectedQuiz ?
                        <div className="two colum">
                            <button onClick={() => this.props.startQuiz() }>Start</button>
                        </div>: null}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedQuiz: state.quiz.selectedQuiz,
    quizStarted: state.quiz.quizStarted
})

export default connect(mapStateToProps, { startQuiz })(MusicQuiz)
