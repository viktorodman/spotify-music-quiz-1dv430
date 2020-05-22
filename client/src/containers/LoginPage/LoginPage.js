import React, { Component } from 'react'

class LoginPage extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <p className="text-center"><a href='/api/auth/login'>Login with Spotify</a></p>
                        {/* <p className="text-center"><a href='http://localhost:5000/api/auth/login'>Login with Spotify</a></p> */}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <p className="text-center">TODO Insert app Description... :)</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
