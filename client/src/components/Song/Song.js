import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSongInfo } from '../../actions/songActions'

class Song extends Component {



    componentDidMount(){
        this.props.fetchSongInfo()
    }

    render() {
        return (
            <div>
               {this.props.songInfo ?
               <div>
                   <p>Artist: {this.props.songInfo.artists[0]}</p>
                   <p>Song Title{this.props.songInfo.title}</p>
                   <img src={this.props.songInfo.albumCover[2].url} alt="Album Cover"/>
               </div>: null
           }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    songInfo: state.song.songInfo
})



export default connect(mapStateToProps, { fetchSongInfo })(Song)
