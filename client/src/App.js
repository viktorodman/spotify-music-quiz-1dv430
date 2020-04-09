import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'

import Login from './components/Login/Login'
import Layout from './hoc/Layout/Layout'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
     songs: []
    }
  }

  componentDidMount = () => {
    fetch('/songs')
      .then(res => res.json())
      .then(songs => console.log(songs))
  }

  render () {

    /* const socket = socketIOClient(this.state.endpoint) */

    return (
      <div style={{ textAlign: "center" }}>
        <p>xD</p>
        <a href="http://localhost:5000/login">login</a>
      </div>
    )
  }
}

export default App;
