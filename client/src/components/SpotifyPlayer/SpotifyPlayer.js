import React, { Component } from 'react'
import { setDevice, playSong } from '../../actions/playerActions'
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
    this.player.addListener('player_state_changed', state => { console.log(state) })

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      this.props.setDevice(device_id)
  })

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    // Connect to the player!
    this.player.connect();
  }


  componentDidMount() {
      this.createSpotifyPlayer()
  }

  
  render() {
    if(this.props.song) {
      console.log('HÄR' + this.props.song)
      return (

          <div songUrl={this.props.playSong(this.props.song, this.props.deviceId)}>        
          </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => ({
  playerReady: state.player.playerReady,
  deviceId: state.player.deviceId
})



export default connect(mapStateToProps, { setDevice, getToken, playSong })(SpotifyPlayer)
