import React, { Component } from 'react'

import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'
import Song from '../../components/Song/Song'
import classes from './MusicQuiz.module.css'

class MusicQuiz extends Component {

    /* componentDidMount() {
        fetch()
    } */

    render() {
        return (
            <div className={classes.MusicQuiz}>
                <div>MUSIC QUIZ START PAGE</div>
                <div>Select Quiz Area</div>
                <div>Start Quiz</div>
                {/* <Song />
                <SpotifyPlayer /> */}
            </div>
        )
    }
}

export default MusicQuiz
