import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isLoggedIn, logout } from '../../actions/authActions'

import Header from '../Header/Header'
import MusicQuiz from '../MusicQuiz/MusicQuiz'
import LoginPage from '../LoginPage/LoginPage'


export class Layout extends Component {
    componentDidMount() {
        this.props.isLoggedIn()
    }

    render() {
        return (
            <div className="ui four column centered grid">
                <Header />
                <main>
                    {
                    this.props.isAuthenticated ? <MusicQuiz /> : <LoginPage />
                    }
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { isLoggedIn, logout})(Layout);
