'use strict'

const quizController = {}

const User = require('../models/User')
/* const Question = require('../models/Question')
const Alternative = require('../models/Alternative') */
const fetch = require('node-fetch')

quizController.createQuiz = async (req, res) => {

    const { access_token, id } = await User.findOne({ id: req.session.user })
    const questions = await getQuestions(access_token, id)
    
    /* const test = await getArtistImage(url, access_token) */

    res.json(questions)
}

const getQuestions = async (access_token, id) => {
    const playlists = await getPlaylists(access_token, id)
    const tracks = await getTracks(access_token, playlists)
    const filteredTracks = await filterTracks(tracks)
    const questions = await createQuestions(filteredTracks, access_token)
    const clientData = await saveQuestions(questions, id)



    return clientData
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

const saveQuestions = async (questions, id) => {
    const user = await User.updateOne({id}, {
        user_questions: questions
    })

    for (let i = 0; i < questions.length; i++) {
        delete questions[i].question_correct_alt
    }
    
    return questions
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


const createQuestions = async (tracks, access_token) => {
    const randomTracks = shuffleTracks(tracks).slice(0,32)
    const questions = []
    let tempArray = []
    
    let correctAltNumber = null
    let correctAltTrack = null
    let correctAltImg = null

    let random = getRandomNumber(1, 4)
    let altNumber = 1
    let questionNumber = 1

    let questionTypeIsWho = true
   
    for (let i = 0; i < randomTracks.length; i++) {

        if (questionTypeIsWho) {
            tempArray.push(await createWhoAlternative(altNumber, randomTracks[i], access_token))
        } else {
            tempArray.push(createWhatAlternative(altNumber, randomTracks[i]))
        }

        if (random === altNumber) {
            correctAltNumber = altNumber
            correctAltImg = (questionTypeIsWho) ? randomTracks[i].track.album.images[0].url : await getArtistImage(randomTracks[i].track.artists[0].href, access_token)
            correctAltTrack = randomTracks[i].track.uri
        }

        if (altNumber % 4 === 0) {
            
            questions.push((questionTypeIsWho) ? await createWhoQuestion(tempArray, correctAltNumber, correctAltTrack, correctAltImg, questionNumber)
                                               : await createWhatQuestion(tempArray, correctAltNumber, correctAltTrack, correctAltImg, questionNumber))   
            tempArray = []
            random = getRandomNumber(1, 4)
            altNumber = 0
            questionTypeIsWho = !questionTypeIsWho
            questionNumber++
        }
        altNumber++
    }

    return questions
}

const createWhoQuestion = (tempArray, correctAltNumber, correctAltTrack, correctAltImg, questionNumber) => {
    return {
        question_img: correctAltImg,
        question_number: questionNumber,
        question_title: 'Whats the song title',
        question_track_url: correctAltTrack,
        question_correct_alt: correctAltNumber,
        question_alternatives: tempArray
    }
}

const createWhoAlternative  = async (alt_number, trackObject, access_token) => {
    const img = await getArtistImage(trackObject.track.artists[0].href, access_token)
    return {
        alt_number,
        alt_img: img,
        alt_title: trackObject.track.artists[0].name
    }
}

const createWhatQuestion = (tempArray, correctAltNumber, correctAltTrack, correctAltImg, questionNumber) => {
    return {
        question_img: correctAltImg,
        question_number: questionNumber,
        question_title: 'Who is the artist',
        question_song_url: correctAltTrack,
        question_correct_alt: correctAltNumber,
        question_alternatives: tempArray
    }
}

const createWhatAlternative = (alt_number, trackObject) => {
    return {
        alt_number,
        alt_img: trackObject.track.album.images[0].url,
        alt_title: trackObject.track.name
    }
}

const getArtistImage = async (url, access_token) => {
    const response  = await fetch(url, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })



    const { images } = await response.json()

    if(await !images[0].url) {
        return 'https://via.placeholder.com/350x150'
    }

    return images[0].url
}


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