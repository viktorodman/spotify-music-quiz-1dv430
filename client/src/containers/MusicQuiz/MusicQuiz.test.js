import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { MusicQuiz } from './MusicQuiz'

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector'
import Quiz from '../../components/Quiz/Quiz'
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay'
import HighScore from '../../components/HighScore/HighScore'
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'

import { fakeHighScoreList } from '../../fakeData'


const fakeFunc = jest.fn()

const quizSelectClick  = () => {}

configure({adapter: new Adapter()})


describe('<MusicQuiz />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<MusicQuiz />, {disableLifecycleMethods: true})
    })

    it('should render a SpotifyPlayer element if the prop quizStatus is set to null', () => {
        expect(wrapper.find(SpotifyPlayer)).toHaveLength(1)
        expect(wrapper.find(ThemeSelector)).toHaveLength(0)
        expect(wrapper.find(Quiz)).toHaveLength(0)
        expect(wrapper.find(ScoreDisplay)).toHaveLength(0)
        expect(wrapper.find(HighScore)).toHaveLength(0)
    })

    it('should render a ThemeSelector element if the prop quizStatus is set to "Selecting Quiz"', () => {
        wrapper.setProps({
            quizStatus: 'Selecting Quiz'
        })

        expect(wrapper.find(ThemeSelector)).toHaveLength(1)
        expect(wrapper.find(SpotifyPlayer)).toHaveLength(1)
        expect(wrapper.find(ScoreDisplay)).toHaveLength(0)
        expect(wrapper.find(Quiz)).toHaveLength(0)
        expect(wrapper.find(HighScore)).toHaveLength(0)
    })   

    it('should render a Quiz element if the prop quizStatus is set to "Quiz Started"', () => {
        wrapper.setProps({
            quizStatus: 'Quiz Started'
        })

        expect(wrapper.find(Quiz)).toHaveLength(1)
        expect(wrapper.find(SpotifyPlayer)).toHaveLength(1)
        expect(wrapper.find(ThemeSelector)).toHaveLength(0)
        expect(wrapper.find(ScoreDisplay)).toHaveLength(0)
        expect(wrapper.find(HighScore)).toHaveLength(0)
    })   

    it('should render a ScoreDisplay element if the prop quizStatus is set to "Quiz Started"', () => {
        wrapper.setProps({
            quizStatus: 'Showing Score'
        })

        expect(wrapper.find(ScoreDisplay)).toHaveLength(1)
        expect(wrapper.find(SpotifyPlayer)).toHaveLength(1)
        expect(wrapper.find(Quiz)).toHaveLength(0)
        expect(wrapper.find(ThemeSelector)).toHaveLength(0)
        expect(wrapper.find(HighScore)).toHaveLength(0)
    })   

    it('should render a ScoreDisplay element if the attribute score set to "1"', () => {
        wrapper.setProps({
            quizStatus: 'Showing Score',
            score: 1
        })

        expect(wrapper.find(ScoreDisplay).prop('score')).toEqual(1)
    })

    it('should render a ScoreDisplay element if the attribute highScores set to an array of highscores', () => {
        wrapper.setProps({
            quizStatus: 'Showing Score',
            score: 1,
            highScores: fakeHighScoreList
        })

        expect(wrapper.find(ScoreDisplay).prop('highScores')).toEqual(fakeHighScoreList)
    })   
})