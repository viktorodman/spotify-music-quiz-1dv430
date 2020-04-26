import React, { Component } from 'react'

import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'
import Song from '../../components/Song/Song'
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import classes from './MusicQuiz.module.css'

class MusicQuiz extends Component {
    render() {
        return (
            <div className={classes.MusicQuiz}>
                <div>MUSIC QUIZ START PAGE</div>
                <ThemeSelector />
                <div>Start Quiz</div>
                {/* <Song /> */}
                {/* <SpotifyPlayer /> */}
            </div>
        )
    }
}

export default MusicQuiz
