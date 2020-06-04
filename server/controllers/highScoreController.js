'use strict'

const highScoreController = {}

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

    highScores.forEach(highScore => {
        highScore.scores.sort((a, b) => b.numberOfCorrectAnswers - a.numberOfCorrectAnswers)
    })


    res.json(highScores)
    } catch (error) {
        res.json(error.message)
    }
}

highScoreController.addHighScore = async (req, res) => {
    try {
    const { theme_id, numberOfCorrectAnswers, numberOfQuestions } = req.body

    const { id } = await User.findOne({ id: req.session.user })
    const highScores = await HighScore.findOne({ user_id: id })


    const theme = highScores.themes.find(t => t.quizName === theme_id)

    

    const topScores = theme.topFiveScores.map(scores => scores.numberOfCorrectAnswers)
    if (topScores.length < 5) {
        await addScoreToHighScoreList(id, theme_id, numberOfQuestions, numberOfCorrectAnswers)
    } else {
        const minHighScore = theme.topFiveScores.find(t => t.numberOfCorrectAnswers === Math.min(...topScores))
        if(minHighScore.numberOfCorrectAnswers < numberOfCorrectAnswers) {
            await removeItemFromHighScore(id, theme_id, minHighScore._id)
            await addScoreToHighScoreList(id, theme_id, numberOfQuestions, numberOfCorrectAnswers)
        }
    }



   /*  const highScore = await HighScore.updateOne({ user_id: id, "themes.quizName": theme_id }, {
        $push: { "themes.$.topFiveScores": {numberOfQuestions, numberOfCorrectAnswers} }
    })

    if (highScore.nModified === 1) {
        console.log('Snippet was successfully Updated!')
      } else {
        console.log('Something went wrong when updating the snippet.')
      }
     */
    res.json(data)
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const addScoreToHighScoreList = async (user_id, theme_id, numberOfQuestions, numberOfCorrectAnswers)  => {
    const highScore = await HighScore.updateOne({ user_id, "themes.quizName": theme_id }, {
        $push: { "themes.$.topFiveScores": {numberOfQuestions, numberOfCorrectAnswers} }
    })

    if (highScore.nModified === 1) {
        console.log('HighScore was successfully Updated!')
      } else {
        console.log('Something went wrong when updating the HighScore.')
      }
}

const removeItemFromHighScore = async (user_id, theme_id, score_id) => {
    const highScore = await HighScore.updateOne({ user_id, "themes.quizName": theme_id }, {
        $pull: { "themes.$.topFiveScores": { _id: score_id} }
    })

    if (highScore.nModified === 1) {
        console.log('HighScore was successfully Updated!')
      } else {
        console.log('Something went wrong when updating the HighScore.')
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