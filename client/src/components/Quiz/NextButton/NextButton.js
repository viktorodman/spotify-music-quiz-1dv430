import React from 'react'

export const NextButton = (props) => {
    return (
        <div>
        {props.shouldDisplay ?
            <button onClick={() => props.click() }>
            Next Question
            </button>
            :null
        }
        </div>
    )
}



export default NextButton
