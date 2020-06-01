import React from 'react'
import classes from './NextButton.module.css'

export const NextButton = (props) => {
    return (
        <div className="col-12 text-center">
        {props.shouldDisplay ?
            <button onClick={() => props.click() } type="button" className={`btn ${classes.NextButton}`}>{props.buttonText}</button>
          
            :null
        }
        </div>
    )
}



export default NextButton
