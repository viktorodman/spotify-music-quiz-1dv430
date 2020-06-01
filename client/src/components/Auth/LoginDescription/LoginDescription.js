import React from 'react'
import classes from './LoginDescription.module.css'

export const LoginDescription = () => {
    return (
        <div className={`col-12 text-center ${classes.LoginDescription}`}>
            <p>The App requires a spotify premium account!</p>
        </div>
    )
}

export default LoginDescription
