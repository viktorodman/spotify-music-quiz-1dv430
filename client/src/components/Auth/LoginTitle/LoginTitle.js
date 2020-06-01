import React from 'react'
import classes from './LoginTitle.module.css'


export const LoginTitle = () => {
    return (
        <div className={`col-12 text-center ${classes.LoginTitle}`}>
            <h5 className={classes.titleText}>Login With Spotify</h5>
        </div>
    )
}

export default LoginTitle
