import React, { Component } from 'react'

export class LogoutButton extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.clicked}>Logout</button>
            </div>
        )
    }
}

export default LogoutButton
