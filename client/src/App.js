import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'

import Login from './components/Login/Login'
import Layout from './hoc/Layout/Layout'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      /* endpoint: 'http://localhost:4000',

      color: 'white' */
      loggedIn: false
    }
  }

  /* send = () => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('change color', this.state.color)
  }

  setColor = (color) => {
    this.setState({ color })
  } */

  loginHandler = () => {
    this.setState({loggedIn: true})
  }

  componentDidMount = () => {
   /*  const socket = socketIOClient(this.state.endpoint)
    setInterval(this.send(), 1000)
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    }) */
  }

  render () {

    /* const socket = socketIOClient(this.state.endpoint) */

    return (
      <div style={{ textAlign: "center" }}>
        <Layout>
          {this.state.loggedIn 
          ? <MusicQuiz />
          :<Login clicked={this.loginHandler}/>
          }
        </Layout>
      </div>
    )
  }
}

export default App;
