import React from 'react'

import classes from './QuizAlt.module.css'

export const QuizAlt = (props) => {
    return (
        <div className={`card ${classes.QuizAlt}`}>
                <div className="image">
                    <img src={props.altImg} />
                </div>
                <div className="content">
    <div class="header">{props.altTitle}</div>
                </div>
        </div>
    )
}

export default QuizAlt

 {/* <div className={`ui very basic segment ${classes.QuizAlt}`}>
            <img src={props.altImg}/>
            <p>{props.altTitle}</p>
        </div> */}