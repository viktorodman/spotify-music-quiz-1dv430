import React, { Component } from 'react'
import { setDevice, playSong } from '../../actions/playerActions'
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
      name: 'Quiz Player',
      getOAuthToken: cb => {
         cb(this.props.userToken) 
        }
    })
  }
    // Error handling
   /*  this.player.addListener('initialization_error', ({ message }) => { console.error(message) })
    this.player.addListener('authentication_error', ({ message }) => { console.error(message) })
    this.player.addListener('account_error', ({ message }) => { console.error(message) })
    this.player.addListener('playback_error', ({ message }) => { console.error(message) }) */

    // Playback status updates
   /*  this.player.addListener('player_state_changed', state => { console.log(state) }) */

    // Ready
   /*  this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      
      this.props.setDevice(device_id)
  }) */

    // Not Ready
   /*  this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    }) */

    // Connect to the player!
    
   /*  await this.player.connect();
  } */

  async connectToPlayer() {
    if (this.player) {
      clearTimeout(this.connectToPlayerTimeout)
    // add event listeners to player getting into "ready" state
     this.player.addListener('ready', 
      ({device_id}) => {
        this.props.setDevice(device_id)
      })
      await this.player.connect()
    } else {
        this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000)
    }
  }


  componentDidMount() {
    this.createSpotifyPlayer().then(() => this.connectToPlayer())
    /* window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.props.userToken
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      }); */
    
      // Error handling
     /*  player.addListener('initialization_error', ({ message }) => { console.error(message) })
      player.addListener('authentication_error', ({ message }) => { console.error(message) })
      player.addListener('account_error', ({ message }) => { console.error(message) })
      player.addListener('playback_error', ({ message }) => { console.error(message) })
     */
      // Playback status updates
      /* player.addListener('player_state_changed', state => { console.log(state); })
     */
      // Ready
      /* player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        this.props.setDevice(device_id)
      }) */
    
      // Not Ready
     /*  player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      }) */
    
      // Connect to the player!
      /* player.connect() */
   /*  } */

  }

  
  render() {
    if(this.props.song && this.props.deviceId) {
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
  deviceId: state.player.deviceId,
  userToken: state.auth.userToken
})



export default connect(mapStateToProps, { setDevice, playSong })(SpotifyPlayer)
