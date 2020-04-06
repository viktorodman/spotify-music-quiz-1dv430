import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <div>
                <p>Login Here</p>
                <button onClick={this.props.clicked}>
                Login with Spotify</button>
            </div>
        )
    }
}

export default Login

