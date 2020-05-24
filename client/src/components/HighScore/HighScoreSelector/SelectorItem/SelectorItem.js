import React from 'react'

export const SelectorItem = (props) => {
    const itemIsActive = props.isSelected ? 'active' : ''

    return (
        <label className={`btn btn-secondary ${itemIsActive}`}>
            <input type="radio" name="options" id={props.name} onClick={() => props.click(props.name)}/>{props.name}
        </label>
    )
}



export default SelectorItem