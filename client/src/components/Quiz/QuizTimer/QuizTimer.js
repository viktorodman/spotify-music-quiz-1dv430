import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startTimer } from '../../../actions/timerActions'


import classes from './QuizTimer.module.css'

export class QuizTimer extends Component {
    componentDidMount() {
        this.props.startTimer()
    }

    render() {
        const {time, maxTime} =this.props
        const barWidth = 100 * time / maxTime
        return (
            <div className={`progress ${classes.QuizTimer}`}>
                <div className={`progress-bar ${classes.bar}`} style={{width: `${barWidth}%`}} role="progressbar" aria-valuenow={93} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    time: state.timer.currentTime,
    maxTime: state.timer.startTime
})


export default connect(mapStateToProps, { startTimer })(QuizTimer)
