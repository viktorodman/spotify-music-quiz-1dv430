import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isLoggedIn, logout } from '../../actions/authActions'

import Header from '../Header/Header'
import MusicQuiz from '../MusicQuiz/MusicQuiz'
import LoginPage from '../LoginPage/LoginPage'
import classes from './Layout.module.css'


export class Layout extends Component {
    componentDidMount() {
        this.props.isLoggedIn()
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Header 
                isAuthenticated={this.props.isAuthenticated}
                logoutClick={() => this.props.logout()}
                />
            <div className='container'>
                <main>
                    {
                    this.props.isAuthenticated ? <MusicQuiz /> : <LoginPage />
                    }
                </main>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { isLoggedIn, logout})(Layout);
