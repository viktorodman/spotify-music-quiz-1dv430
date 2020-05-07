import React from 'react'

import classes from './QuizAlt.module.css'

export const QuizAlt = (props) => {
    let altClasses
    
    if (props.correctAlternative !== null) {
        altClasses = props.correctAlternative ? 'border-success' : 'border-danger'
    }
   

    return (
        <div className={`col-3 ${classes.QuizAlt}`}>
            <input disabled={props.correctAlternative !== null} type="radio" name="alt" id={props.altNumber} onClick={() => props.click(props.altNumber)}/>
            <label htmlFor={props.altNumber}>
            <div className={`card ${altClasses} ${classes.borderThick}`}>
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



 