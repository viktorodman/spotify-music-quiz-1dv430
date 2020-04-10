import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'

import Login from './components/Login/Login'
import Layout from './hoc/Layout/Layout'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
     isLoggedIn: false
    }
  }

  checkLoggedIn = async () => {
    let isLoggedIn = await fetch('/login/isLoggedIn')
    isLoggedIn = await isLoggedIn.json()
    console.log(await isLoggedIn)
    this.setState({isLoggedIn: isLoggedIn.loggedIn})
  }

  componentDidMount = () => {
    /* fetch('/login/isLoggedIn')
      .then(res => res.json())
      .then(isLoggedIn => this.setState({isLoggedIn})) */
      this.checkLoggedIn()
  }

  render () {

    /* const socket = socketIOClient(this.state.endpoint) */

    return (
      <div style={{ textAlign: "center" }}>
        {this.state.isLoggedIn ? <p>Logged In</p> : <p>Not Logged in</p>}
        <a href="http://localhost:5000/login">login</a>
      </div>
    )
  }
}

export default App;
