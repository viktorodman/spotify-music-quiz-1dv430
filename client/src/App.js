import React, {Component} from 'react';
import { connect } from 'react-redux'
import { isLoggedIn, logout } from './actions/authActions'
import Layout from './hoc/Layout/Layout'
import LoginPage from './containers/LoginPage/LoginPage'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'



class App extends Component {
  
  

  /* createSpotifyPlayer = async () => {
    
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
  
   
  } */

  /* songHandlerTest = async () => {
    let token = await fetch('/songs')
    token = await token.json()
    console.log(token)
  } */


  componentDidMount() {
    this.props.isLoggedIn()
  }

  render () {
    return (
      <Layout>
        {
        this.props.isAuthenticated ? <MusicQuiz /> : <LoginPage /> 
        }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, { isLoggedIn, logout})(App);
