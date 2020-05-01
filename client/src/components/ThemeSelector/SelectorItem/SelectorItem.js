import React from 'react'
import classes from './SelectorItem.module.css'

const SelectorItem = (props) => {
    return (
        <div className={`${classes.SelectorItem}`}>
            <input type="radio" name="quiz" id={props.quizId} onClick={() => props.click(props.quizId)}/>
            
            <label htmlFor={props.quizId}>
            <div className="ui fluid card">
                <div className="image">
                    <img src={props.quizImage} />
                </div>
                <div className="content">
                    <span>{props.quizDescription}</span>
                </div>
            </div>
            </label>
            <input type="hidden" name={props.quizId}/>
        </div>
    )
}


export default SelectorItem
