import React from 'react'

export const NextButton = (props) => {
    return (
        <div className="row justify-content-center">
        {props.shouldDisplay ?
            <button onClick={() => props.click() } type="button" className="btn btn-outline-danger">Next Question</button>
           /*  <button onClick={() => props.click() }>
            
            </button> */
            :null
        }
        </div>
    )
}



export default NextButton
