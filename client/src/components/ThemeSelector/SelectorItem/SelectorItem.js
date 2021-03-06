import React from 'react'
import classes from './SelectorItem.module.css'

export const SelectorItem = (props) => {
    return (
        <div className={`${classes.SelectorItem}`}>
            <input type="radio" name="quiz" id={props.quizId} onClick={() => props.click(props.quizId, props.quizDescription)}/>
            
            <label htmlFor={props.quizId}>
            <div className="card">
                <img src={props.quizImage} className="card-img" alt="Quiz img"/>
            </div>
            <h5 className="text-center">{props.quizDescription}</h5>
            </label>
            <input type="hidden" name={props.quizId}/>
        </div>
    )
}


export default SelectorItem
