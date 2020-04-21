import React, { Component } from 'react'
import { setDevice } from '../../actions/playerActions'
import { getToken } from '../../actions/authActions' 
import { connect } from 'react-redux'

export class SpotifyPlayer extends Component {
  player = null
    
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
    
    this.player = new Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: async cb => {
        const token = await this.props.getToken()
         cb(token) 
        }
    })

    // Error handling
    this.player.addListener('initialization_error', ({ message }) => { console.error(message) })
    this.player.addListener('authentication_error', ({ message }) => { console.error(message) })
    this.player.addListener('account_error', ({ message }) => { console.error(message) })
    this.player.addListener('playback_error', ({ message }) => { console.error(message) })

    // Playback status updates
    this.player.addListener('player_state_changed', state => { console.log(state); })

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      this.props.setDevice(device_id)
      /* play({
        playerInstance: player,
        spotify_uri: spotifyURI
      }) */
  })

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    // Connect to the player!
    this.player.connect();

    /* const play = ({
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
    } */
  
   
  }


  componentDidMount() {
      this.createSpotifyPlayer()
  }

  render() {
      return (
          <div>
              {
              this.props.playerReady ?
              <div>
                <button onClick={() => console.log('START SONG')}>Start</button>
                <button onClick={() => console.log('STOP SONG')}>Stop</button>
              </div>
              : <p>Loading</p>
            }
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  playerReady: state.player.playerReady
})



export default connect(mapStateToProps, { setDevice, getToken })(SpotifyPlayer)
