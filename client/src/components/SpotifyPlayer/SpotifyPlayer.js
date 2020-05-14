import React, { Component } from 'react'
import { setDevice, playSong } from '../../actions/playerActions'
import { getToken } from '../../actions/authActions'
import { connect } from 'react-redux'

export class SpotifyPlayer extends Component {
  player = null
    
  /* async waitForSpotify() {
    return new Promise(resolve => {
     if ('Spotify' in window) {
       resolve()
     } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      }
     }
    })
  }

  

  async createSpotifyPlayer() {
    
    const { Player } = window.Spotify
    
    this.player = new Player({
      name: 'Quiz Player',
      getOAuthToken: async cb => {
        const token = await this.props.getToken()
         cb(token) 
        }
    })


    this.player.on("initialization_error", e => {
      console.log(e.message)
    });

    this.player.on("authentication_error", e => {
      console.log(e.message)
    });

    this.player.on("account_error", e => {
      console.log(e.message)
    });

    this.player.on("playback_error", e => {
      console.log(e.message)
    });

    this.player.on("player_state_changed", async state => {
      console.log(state)
    });

    this.player.on("ready", data => {
      console.log(data)
      this.props.setDevice(data.device_id)
    });
    this.player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    })
  }
  

  async componentWillMount() {
    await this.waitForSpotify()

    await this.createSpotifyPlayer()

    
  } */


  componentDidMount() {
    // Register callback for Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {  
      this.player = new window.Spotify.Player({
        name: 'Test Player',
        getOAuthToken: callback => {
          callback(this.props.userToken);
        },
        volume: 1
      });

      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.props.setDevice(device_id)
      });
      this.player.addListener('not_ready', ({ device_id }) => { console.log('Device ID has gone offline', device_id); });
      this.player.addListener('player_state_changed', state => {
        // Check if playback has been paused
        console.log(state);
        
      });

      // Check playback progress periodically
      

      this.player.connect();
    }

    // Load Spotify Web Playback SDK
    let s = document.createElement('script');
    s.src = 'https://sdk.scdn.co/spotify-player.js';
    s.async = true;
    document.body.append(s);
  }

  
  render() {
    if(this.props.song && this.props.deviceId) {
      this.props.playSong(this.props.song, this.props.deviceId)
      return (

          <div>
                  
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



export default connect(mapStateToProps, { setDevice, playSong, getToken })(SpotifyPlayer)
