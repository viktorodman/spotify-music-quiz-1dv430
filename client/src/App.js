import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      endpoint: 'http://localhost:4000',

      color: 'white'
    }
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('change color', this.state.color)
  }

  setColor = (color) => {
    this.setState({ color })
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint)
    setInterval(this.send(), 1000)
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })
  }

  render () {

    const socket = socketIOClient(this.state.endpoint)

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>



        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>

      </div>
    )
  }
}

export default App;
