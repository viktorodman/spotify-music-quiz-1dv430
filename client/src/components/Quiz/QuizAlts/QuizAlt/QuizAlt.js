import React from 'react'

import classes from './QuizAlt.module.css'

export const QuizAlt = (props) => {
    return (
        <div className={`col col-6 ${classes.QuizAlt}`}>
            <input type="radio" name="alt" id={props.altNumber} onClick={() => props.click(props.altNumber)}/>
            <label htmlFor={props.altNumber}>
            <div className={`card border-danger ${classes.borderThick}`}>
                <img src={props.altImg} className="card-img" alt="Quiz img"/>
                <div className="card-img-overlay">
                    <h5 className="card-title text-monospace text-center bg-dark">{props.altTitle}</h5>
                </div>
            </div>
            </label>
            <input type="hidden" name={props.altNumber}/>
        </div>
    )
}

export default QuizAlt



 