import React, { Component } from 'react'
import { setDevice } from '../../actions/playerActions'
import { getToken } from '../../actions/authActions'
import { connect } from 'react-redux'

export class SpotifyPlayer extends Component {
  player = null
    
  
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
        console.log(state);
        
      });

      this.player.connect();
    }

    // Load Spotify Web Playback SDK
    let s = document.createElement('script');
    s.src = 'https://sdk.scdn.co/spotify-player.js';
    s.async = true;
    document.body.append(s);
  }

  
  render() {
    return <div></div>
    }
  
}

const mapStateToProps = (state) => ({
  playerReady: state.player.playerReady,
  deviceId: state.player.deviceId,
  userToken: state.auth.userToken
})



export default connect(mapStateToProps, { setDevice, getToken })(SpotifyPlayer)
