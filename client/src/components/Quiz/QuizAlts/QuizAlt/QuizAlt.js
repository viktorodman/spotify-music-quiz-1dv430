import React from 'react'

import classes from './QuizAlt.module.css'

export const QuizAlt = (props) => {
    return (
        <div className={`col col-6 ${classes.QuizAlt}`}>
            <div className="card text-white bg-dark">
                <img src={props.altImg} className="card-img" alt="Quiz img"/>
                <div className="card-img-overlay">
                    <h5 className="card-title text-monospace text-center bg-dark">{props.altTitle}</h5>
                </div>
            </div>
        </div>
    )
}

export default QuizAlt



 