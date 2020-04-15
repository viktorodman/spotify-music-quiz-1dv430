import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'

import Login from './components/Login/Login'
import LogoutButton from './components/LogoutButton/LogoutButton'
import Layout from './hoc/Layout/Layout'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'
import SpotifyPlayer from './components/SpotifyPlayer/SpotifyPlayer'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
     isLoggedIn: false,
     player: undefined
    }
  }


  logoutHandler = async () => {
    let test = await fetch('login/logout', {
      method: 'POST'
    })
    test = await test.json()
    console.log(await test)
    this.checkLoggedIn()
  }

  checkLoggedIn = async () => {
    let isLoggedIn = await fetch('/login/isLoggedIn')
    isLoggedIn = await isLoggedIn.json()
    console.log(await isLoggedIn)
    this.setState({isLoggedIn: isLoggedIn.loggedIn})
  }

  waitForSpotify = async () => {
    return new Promise(resolve => {
      window.Spotify ? resolve (window.Spotify)
                      : window.onSpotifyWebPlaybackSDKReady = () => {
                        resolve(window.Spotify)
                      }
    })
  }

  createSpotifyPlayer = async () => {
    
    const { Player } = await this.waitForSpotify()
    const token = // ADD ACCESS TOKEN HERE
    const spotifyURI = // LINK TO SONG
    
    const player = new Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      
      play({
        playerInstance: player,
        spotify_uri: spotifyURI
      })
  })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    const play = ({
      spotify_uri,
      playerInstance,
    }) => {
      playerInstance._options.getOAuthToken(access_totken => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${playerInstance._options.id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
      })
    }
  
   
  }

  componentDidMount = () => {
    /* fetch('/login/isLoggedIn')
      .then(res => res.json())
      .then(isLoggedIn => this.setState({isLoggedIn})) */
      this.checkLoggedIn()
      this.createSpotifyPlayer()
  }

  render () {

    /* const socket = socketIOClient(this.state.endpoint) */

    return (
      <Layout>
        {this.state.isLoggedIn ? <div><SpotifyPlayer /> <p>Logged in</p> <LogoutButton clicked={this.logoutHandler}/> </div>: <p>Not Logged in</p>}
        
        <Login loginLink={"http://localhost:5000/login"}/>
      </Layout>
    )
  }
}

export default App;

/* <div style={{ textAlign: "center" }}>
        {this.state.isLoggedIn ? <p>Logged In</p> : <p>Not Logged in</p>}
        <a href="http://localhost:5000/login">login</a>
      </div> */