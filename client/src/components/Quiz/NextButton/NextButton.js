import React from 'react'

export const NextButton = (props) => {
    return (
        <div className="row justify-content-center">
        {props.shouldDisplay ?
            <button onClick={() => props.click() } type="button" className="btn btn-outline-danger">{props.buttonText}</button>
          
            :null
        }
        </div>
    )
}



export default NextButton
