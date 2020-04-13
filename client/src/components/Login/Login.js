import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <div>
                <p>Login Here</p>
                <a href={this.props.loginLink}>Login With Spotify</a>
            </div>
        )
    }
}

export default Login

