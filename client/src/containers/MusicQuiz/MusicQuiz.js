import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startQuiz } from '../../actions/quizActions'

import { getToken } from '../../actions/authActions'

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import Quiz from '../../components/Quiz/Quiz'
import classes from './MusicQuiz.module.css'

class MusicQuiz extends Component {

    async componentDidMount() {
        const token = await this.props.getToken()
        console.log(await token)
    }

    render() {
        return (
            <div className={`col ${classes.MusicQuiz}`}>
                {this.props.quizStarted 
                    ? <Quiz/>
                    :
                    <div>
                        <ThemeSelector />
                        { this.props.selectedQuiz ?
                        <div className="row justify-content-md-center">
                            <div className="column">
                                <button onClick={() => this.props.startQuiz() }>Start</button>
                            </div>
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

export default connect(mapStateToProps, { startQuiz, getToken })(MusicQuiz)
