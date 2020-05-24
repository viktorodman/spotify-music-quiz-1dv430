'use strict'

const highScoreController = {}


const highScores = [
    {playlistName: 'name1', scores: [
        {numberOfQuestions: 8, correctAnswer: 1},
        {numberOfQuestions: 8, correctAnswer: 2},
        {numberOfQuestions: 8, correctAnswer: 3},
        {numberOfQuestions: 8, correctAnswer: 4},
        {numberOfQuestions: 8, correctAnswer: 5}
    ]
    },
    {playlistName: 'name2', scores: [
        {numberOfQuestions: 8, correctAnswer: 5},
        {numberOfQuestions: 8, correctAnswer: 4},
        {numberOfQuestions: 8, correctAnswer: 3},
        {numberOfQuestions: 8, correctAnswer: 2},
        {numberOfQuestions: 8, correctAnswer: 1}
    ]
    },
    {playlistName: 'name3', scores: [
        {numberOfQuestions: 8, correctAnswer: 1},
        {numberOfQuestions: 8, correctAnswer: 2},
        {numberOfQuestions: 8, correctAnswer: 3},
        {numberOfQuestions: 8, correctAnswer: 4},
        {numberOfQuestions: 8, correctAnswer: 5}
    ]
    },
    {playlistName: 'name4', scores: [
        {numberOfQuestions: 8, correctAnswer: 5},
        {numberOfQuestions: 8, correctAnswer: 4},
        {numberOfQuestions: 8, correctAnswer: 3},
        {numberOfQuestions: 8, correctAnswer: 2},
        {numberOfQuestions: 8, correctAnswer: 1}
    ]
    }
]

const User = require('../models/User')
const HighScore = require('../models/HighScore')

const { quizess } = require('../Utilities/quizUtilities')

highScoreController.getHighScores = async (req, res) => {
    try {
    const { id } = await User.findOne({ id: req.session.user })
    const userHighScore = await HighScore.findOne({ user_id: id })

    let highScores

    if(userHighScore) {
        highScores = userHighScore.themes.map(highScore => {
            return {
                playlistName: highScore.quizName,
                scores: highScore.topFiveScores
            }
        })
    } else {
        highScores = await createNewHighScoreList(id)
    }


    res.json(highScores)
    } catch (error) {
        res.json(error.message)
    }
}

highScoreController.addHighScore = async (req, res) => {
    try {
    const { theme_id, numberOfCorrectAnswers, numberOfQuestions } = req.body

    const { id } = await User.findOne({ id: req.session.user })
    const test = await HighScore.findOne({ user_id: id })


    const theme = test.themes.map(t => t)



    console.log(test)



    const highScore = await HighScore.updateOne({ user_id: id, "themes.quizName": theme_id }, {
        $push: { "themes.$.topFiveScores": {numberOfQuestions, numberOfCorrectAnswers} }
    })

    if (highScore.nModified === 1) {
        console.log('Snippet was successfully Updated!')
      } else {
        console.log('Something went wrong when updating the snippet.')
      }
    
    res.json(data)
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const createNewHighScoreList = async (user_id) => {
    try {
        const highScoreList = await new HighScore({
            user_id,
            themes: quizess.map(quiz => {
                return {
                    quizName: quiz.description,
                    scores: []
                }
            })
        })

        highScoreList.themes.unshift({
            quizName: 'Based on your playlists',
            scores: []
        })

        


        await highScoreList.save()
        return highScoreList.themes
    } catch (error) {
        console.log(error)
    }
    
}


module.exports = highScoreController