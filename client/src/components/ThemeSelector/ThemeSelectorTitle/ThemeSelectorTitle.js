import React from 'react'
import classes from './ThemeSelectorTitle.module.css'

export const ThemeSelectorTitle = () => {
    return (
        <div className={`col-12 ${classes.ThemeSelectorTitle}`}>
            <h1 className="text-center">Select A Quiz</h1>
        </div>
    )
}

export default ThemeSelectorTitle
