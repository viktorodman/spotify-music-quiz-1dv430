'use strict'

const quizController = {}

const User = require('../models/User')

const fetch = require('node-fetch')

// DEAFAULT Quizess
const quizess = [ 
    {
        id: '37i9dQZF1DWTJ7xPn4vNaz',
        image: 'https://i.scdn.co/image/ab67706f00000002f0c5c7ed627d220ee59581ca',
        description: '70s'
    },
    {
        id: '37i9dQZF1DX4UtSsGT1Sbe',
        image: 'https://i.scdn.co/image/ab67706f000000023e0b7acc87d7f155120dc026',
        description: '80s'
    },
    {
        id: '37i9dQZF1DXbTxeAdrVG2l',
        image: 'https://i.scdn.co/image/ab67706f00000002150ff1f5d84660a4d013c9fa',
        description: '90s'
    }
]

quizController.createQuiz = async (req, res) => {
    try {
        const { access_token, id } = await User.findOne({ id: req.session.user })

        const { playlist_id } = req.body

        let tracks = null

        if (playlist_id === id) {
            tracks = await getUserTracks(access_token, id)
        } else {
            tracks = await getTracksFromPlaylist(access_token, playlist_id)
        }
        
        const filteredTracks = await filterTracks(tracks.flat())
        const questions = await createQuestions(filteredTracks, access_token)
        const clientData = await saveQuestions(questions, id)

        res.json(clientData)
    } catch (error) {
        res.json(error)
    }
}

quizController.getQuizzes = async (req, res) => {
    try {
        const { images, id } = await User.findOne({ id: req.session.user })

        const image = images[0]

        const data = [{ id, image, description: 'Based on your playlists' } , ...quizess]
    
    res.json(data)
    } catch (error) {
        res.json(error.message)
    }
}

quizController.checkAnswer = async (req, res) => {
    try {
        const { user_questions } = await User.findOne({ id: req.session.user })
        const { question_number, alt_number } = req.body

        const question = await user_questions.find(q => q.question_number === question_number)
        
        let response = ''

        question.question_correct_alt === alt_number ? response = 'Correct' : response = 'Wrong Answer'

        res.json(question.question_correct_alt)
    } catch (error) {
        res.json(error)
    }
}


quizController.authorize = (req, res, next) => {
    if (!req.session.user) {
      return next(res.status(403).json({
          status: '403',
          message: 'User not Authorized'
      }))
    }
    next()
}



const getUserTracks = async (access_token, id) => {
    const playlists = await getUserPlaylists(access_token, id)
    const tracks = await Promise.all(playlists.map(async (playlist) => await getTracksFromPlaylist(access_token, playlist.id)))
    
    return tracks
}

const getUserPlaylists = async (access_token, user_id) => {
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

const getTracksFromPlaylist = async (access_token, playlist_id) => {
    let response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const data = await response.json()

   

    const tracks = await data.items.map(track => track.track)

    return tracks
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
    return tracks.filter(track => track.album.release_date)
}


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
            correctAltImg = (questionTypeIsWho) ? randomTracks[i].album.images[0].url : await getArtistImage(randomTracks[i].artists[0].href, access_token)
            correctAltTrack = randomTracks[i].uri
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
        question_title: "Who's the artist",
        question_track_url: correctAltTrack,
        question_correct_alt: correctAltNumber,
        question_alternatives: tempArray
    }
}

const createWhoAlternative  = async (alt_number, trackObject, access_token) => {
    const img = await getArtistImage(trackObject.artists[0].href, access_token)
    return {
        alt_number,
        alt_img: img,
        alt_title: trackObject.artists[0].name
    }
}

const createWhatQuestion = (tempArray, correctAltNumber, correctAltTrack, correctAltImg, questionNumber) => {
    return {
        question_img: correctAltImg,
        question_number: questionNumber,
        question_title: 'Whats the song title',
        question_track_url: correctAltTrack,
        question_correct_alt: correctAltNumber,
        question_alternatives: tempArray
    }
}

const createWhatAlternative = (alt_number, trackObject) => {
    return {
        alt_number,
        alt_img: trackObject.album.images[0].url,
        alt_title: trackObject.name
    }
}

const getArtistImage = async (url, access_token) => {
    const response  = await fetch(url, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })



    const { images } = await response.json()

    

    return (typeof images[0] === 'undefined') ? 'https://via.placeholder.com/350x150': images[0].url
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


const getRandomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

module.exports = quizController