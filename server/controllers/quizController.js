'use strict'

const quizController = {}

const User = require('../models/User')

const { getUserTracks, getTracksFromPlaylist, getArtistImage } = require('../Utilities/spotifyRequests')
const { quizess, shuffleTracks, getRandomNumber, getUniqueTracks } = require('../Utilities/quizUtilities')

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

        

        if (alt_number === 5) {
            res.status(200).json({
                status: '200',
                message: 'Out of time',
                question_correct_alt: question.question_correct_alt
            })
        } else {
            question.question_correct_alt === alt_number ? response = 'Correct' : response = 'Wrong Answer'

            res.status(200).json({
                status: '200',
                message: response,
                question_correct_alt: question.question_correct_alt
            })
        }

        /* res.json(question.question_correct_alt) */
       
    } catch (error) {
        res.json(error)
    }
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


const filterTracks = (tracks) => {
    const uniqueTracks = getUniqueTracks(tracks)

    return uniqueTracks.filter(track => {
        return track.uri
    })
}


const createQuestions = async (tracks, access_token) => {
    const randomTracks = shuffleTracks(tracks).slice(0,32)
    const questions = []
    let question_number = 1
    let questionTypeIsArtist = true
   
    for (let i = 0; i < randomTracks.length; i += 4) {

        let question = await createQuestion(randomTracks.slice(i, i + 4), questionTypeIsArtist, access_token, getRandomNumber(1, 4), question_number)
        questions.push(await question)
        question_number++
        questionTypeIsArtist = !questionTypeIsArtist
    }

    return questions
}

const createQuestion = async (tracks, questionTypeIsArtist, access_token, correctAltNumber, question_number) => {
    const alternatives = []
    let correctAlt = null

    for (let i = 0; i < tracks.length; i++) {
        let altNumber = i + 1
        alternatives.push(questionTypeIsArtist ? await createArtistAlternative(altNumber, tracks[i],access_token)
                                               : createSongTitleAlternative(altNumber,tracks[i]))
        if (altNumber === correctAltNumber) {
            correctAlt = tracks[i]
        }
    }

    const correctAlternative = alternatives.find(alt => alt.alt_number === correctAltNumber)

    return {
        question_img: correctAlternative.alt_img,
        question_number,
        question_title: questionTypeIsArtist ? "Who's the artist" : 'Whats the song title',
        question_track_url: correctAlt.uri,
        question_correct_alt: correctAltNumber,
        question_alternatives: alternatives
    }
}

const createArtistAlternative  = async (alt_number, trackObject, access_token) => {
    const img = await getArtistImage(trackObject.artists[0].href, access_token)
    return {
        alt_number,
        alt_img: img,
        alt_title: trackObject.artists[0].name,
        id: trackObject.id
    }
}

const createSongTitleAlternative = (alt_number, trackObject) => {
    return {
        alt_number,
        alt_img: trackObject.album.images[0].url,
        alt_title: trackObject.name,
        id: trackObject.id
    }
}


module.exports = quizController