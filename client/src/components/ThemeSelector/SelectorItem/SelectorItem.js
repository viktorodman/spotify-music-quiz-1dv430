import React from 'react'
import classes from './SelectorItem.module.css'

const SelectorItem = (props) => {
    return (
        <div className={classes.SelectorItem}>
            <div className="column">
            <input type="radio" name="quiz" id={props.itemNumber}/>
            <label htmlFor={props.itemNumber}>
            <div className="ui fluid card">
                <div className="image">
                    <img src={props.quizImages} />
                </div>
                <div className="content">
                    <a className="header">Daniel Louise</a>
                </div>
            </div>
            </label>
            </div>
        </div>
    )
}

export default SelectorItem
