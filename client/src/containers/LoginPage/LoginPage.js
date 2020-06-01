import React, { Component } from 'react'
import LoginButton from '../../components/Auth/AuthButtons/LoginButton/LoginButton'
import LoginTitle from '../../components/Auth/LoginTitle/LoginTitle'
import LoginDescription from '../../components/Auth/LoginDescription/LoginDescription'
import classes from './LoginPage.module.css'


class LoginPage extends Component {
    render() {
        return (
            <div className={`row justify-content-center`}>
                <div className={`col-5 ${classes.LoginPage}`}>
                <LoginTitle />
                <LoginButton />
                <LoginDescription />
                </div>
            </div>
        )
    }
}

export default LoginPage
