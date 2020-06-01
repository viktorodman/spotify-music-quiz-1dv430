import React from 'react'

import classes from './LogoutButton.module.css'

export const LogoutButton = (props) => {
    return (
        <div className={`col ${classes.LogoutButton}`}>
            <button className={classes.button} onClick={() => props.click()}>LOGOUT</button>
        </div>
    )
}

export default LogoutButton
