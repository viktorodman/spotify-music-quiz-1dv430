import React from 'react'

import classes from './QuizAlt.module.css'

export const QuizAlt = (props) => {
    let altClasses
    
    if (props.correctAlternative !== null) {
        altClasses = props.correctAlternative ? 'border-success' : 'border-danger'
    }
   
    return (
        <div className={`col-4 ${classes.QuizAlt}`}>
            <input disabled={props.correctAlternative !== null} type="radio" name="alt" id={props.altNumber} onClick={() => props.click(props.altNumber)}/>
            <label htmlFor={props.altNumber}>
            <div className={`card bg-transparent shadow ${altClasses} ${classes.borderThick}`}>
                <div className={classes.cardImgWrap}><img src={props.altImg} className="card-img" alt="Quiz img"/></div>
            </div>
            <h5 className="text-center">{props.altTitle}</h5>
            </label>
            <input type="hidden" name={props.altNumber}/>
        </div>
    )
}

export default QuizAlt



 