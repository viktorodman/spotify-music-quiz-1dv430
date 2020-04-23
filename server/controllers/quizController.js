'use strict'

const quizController = {}

const User = require('../models/User')
const fetch = require('node-fetch')

quizController.createQuiz = async (req, res) => {

    const { access_token, id } = await User.findOne({ id: req.session.user })
    const questions = await getQuestions(access_token, id)
    
    /* const test = await createQuestions(tracks) */

    res.json(questions)
}

const getQuestions = async (access_token, id) => {
    const playlists = await getPlaylists(access_token, id)
    const tracks = await getTracks(access_token, playlists)
    const filteredTracks = await filterTracks(tracks)
    const questions = await createQuestions(filteredTracks)

    return questions
}

const getPlaylists = async (access_token, user_id) => {
    const response  = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=10`, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const { items } = await response.json()

    const playlists = await items.filter(item => item.tracks.total > 3)
                       .map(list =>  ({
                           id: list.id,
                           length: list.tracks.total
                        }))         
                 

    return playlists
}

const filterTracks = async (tracks) => {
    return tracks.filter(track => track.track.album.release_date)
}

const getTracks = async (access_token, playlists) => {
    const tracks = []
    for (let index = 0; index < playlists.length; index++) {
        let response = await fetch(`https://api.spotify.com/v1/playlists/${playlists[index].id}/tracks`, {
            headers: {
                'Authorization' : `Bearer ${access_token}`
            }
        })

        const { items } = await response.json()

        tracks.push(...items)
    }



    return tracks
}

/* const { items } = await response.json()

        for (const item of await items) {
            if (item.track.album.release_date)
            tracks.push({
                album: getAlbumItems(item.track.album),
                track: getTrackItems(item.track),
                artist_name: item.track.artists[0].name
            })
        }
 */


const createQuestions = async (tracks) => {
    const randomTracks = shuffleTracks(tracks).slice(0,32)
    const questions = []
    let tempTrack = []
    let test = {
        question: {}
    }
    let random = getRandomNumber(1, 4)
    let x = 1
   
    for (let i = 0; i < randomTracks.length; i++) {
        const y = 'alt' + x
        test.question[y] = {
            album: getAlbumItems(randomTracks[i].track.album),
            track: getTrackItems(randomTracks[i].track),
            artist_name: randomTracks[i].track.artists[0].name,
            correct_answer: (random === x)
        }

        

        

        if (x % 4 === 0) {
            questions.push(test)
            test = {question: {}}
            random = getRandomNumber(1, 4)
            x = 0
        }
        x++
    }

    
  

    return questions
}

/* const createQuestion = (y) => {
    const question = q ={
        'test': 'test'
    }
} */


const shuffleTracks = (tracks) => {
    const tracksCopy = [...tracks]
    let currentIndex = tracksCopy.length
    let temporaryValue = 0
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = tracksCopy[currentIndex]
      tracksCopy[currentIndex] = tracksCopy[randomIndex]
      tracksCopy[randomIndex] = temporaryValue
    }
    return tracksCopy
}

const getTrackItems = (track) => {
    return {
        track_name: track.name,
        uri: track.uri
    }
}

const getAlbumItems = (album) => {
    return {
        album_name: album.name,
        album_release_year: (album.release_date_precision === 'day' ? album.release_date.slice(0, 4): album.release_date),
        images: album.images.filter(image => image.height > 200)
    }
}

const getRandomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

module.exports = quizController