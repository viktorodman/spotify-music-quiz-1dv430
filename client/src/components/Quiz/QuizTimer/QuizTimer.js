import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { startTimer } from '../../../actions/timerActions'



import classes from './QuizTimer.module.css'

export class QuizTimer extends Component {

    render() {
        return (
            <div className={`row justify-content-md-center ${classes.QuizAlts}`}>
                <div className={classes.timer}>
                 <CountdownCircleTimer
                isPlaying={this.props.status === 'Timer_Started'}
                key={this.props.timerKey}
                duration={15}
                colors={[['#e12c2b']]}
                onComplete={() => {
                   this.props.onTimesUp()
                    /* return [true] */
                  }}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
                </div>
            </div>
        )
    }
}
    
    const mapStateToProps = (state) => ({
        status: state.timer.status,
        timerKey: state.timer.timerKey
    })
    
    
export default connect(mapStateToProps, { startTimer })(QuizTimer)
    