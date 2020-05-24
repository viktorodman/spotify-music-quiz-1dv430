import React from 'react'

import SelectorItem from './SelectorItem/SelectorItem'

export const HighScoreSelector = (props) => {
    const items = props.themes.map(theme => {
        return (
            <SelectorItem 
                key={theme.playlistName}
                name={theme.playlistName}
                click={(name) => props.click(name)}
                isSelected={props.selectedHighScore.playlistName === theme.playlistName}
            />
        )
    })

    return (
        <div className="col-12 text-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {items}
            </div>
        </div>
    )
}

export default HighScoreSelector
