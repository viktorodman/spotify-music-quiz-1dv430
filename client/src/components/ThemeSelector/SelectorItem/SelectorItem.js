import React from 'react'
import classes from './SelectorItem.module.css'

const SelectorItem = (props) => {
    return (
        <div className={`${classes.SelectorItem}`}>
            <input type="radio" name="quiz" id={props.quizId} onClick={() => props.click(props.quizId)}/>
            
            <label htmlFor={props.quizId}>
            <div className="card text-white bg-dark">
                <img src={props.quizImage} className="card-img" alt="Quiz img"/>
                {/* <div className="card-img-overlay">
                    <p className="card-text text-monospace">{props.quizDescription}</p>
                </div> */}
            </div>
            <h5 className="text-center text-white">{props.quizDescription}</h5>
            </label>
            <input type="hidden" name={props.quizId}/>
        </div>
    )
}


export default SelectorItem
