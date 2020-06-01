import React from 'react'

import classes from './LoginButton.module.css'

export const LoginButton = () => {
    return (
        <div className={`col-12 text-center`}>
            <a href="/api/auth/login" class={`btn ${classes.LoginButton}`}>
            {/* <a href="http://localhost:5000/api/auth/login" class={`btn ${classes.LoginButton}`}> */}
            <i className={`fab fa-spotify ${classes.spotifyIcon}`}>
            </i>Login</a>
        </div>
    )
}

/*/api/auth/login*/
/*http://localhost:5000/api/auth/login*/



export default LoginButton
