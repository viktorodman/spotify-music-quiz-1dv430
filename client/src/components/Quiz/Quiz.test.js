import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Quiz } from './Quiz'
import QuizQuestion from './QuizQuestion/QuizQuestion'
import NextButton from './NextButton/NextButton'
import QuizTimer from './QuizTimer/QuizTimer'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

 
import { fakeQuestions } from '../../fakeData'

const fakeQuestionIndex1 = 0
const fakeQuestionIndex2 = 1
const fakeQuestionIndex3 = 2
const fakeQuestionIndex4 = 3


const fakeStartTimer = jest.fn()
const fakePlaySong = jest.fn()

configure({adapter: new Adapter()})


describe('<Quiz />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<Quiz />, {disableLifecycleMethods: true})
    })

    it('should render a LoadingSpinner element if the prop questionsReady is null', () => {
        wrapper.setProps({
            questionsReady: null 
        })
             
        expect(wrapper.find(LoadingSpinner)).toHaveLength(1)
    })

    it('should render a <QuizQuestion /> element if the prop questionsReady is set to true', () => {
        wrapper.setProps({
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer,
            playSong: fakePlaySong
        })
        
        expect(wrapper.find(QuizQuestion)).toHaveLength(1)
    })

    it('should render a <QuizTimer /> element if the prop questionsReady is set to true', () => {
        wrapper.setProps({
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong
        })
        
        expect(wrapper.find(QuizTimer)).toHaveLength(1)
    })

    it('should render a <NextButton /> element if the prop questionsReady is set to true', () => {
        wrapper.setProps({
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong
        })
        
        expect(wrapper.find(NextButton)).toHaveLength(1)
    })

    it('should render a <NextButton /> element with the attribute shouldDisplay set to false', () => {
        wrapper.setProps({ 
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong, 
            correctAnswer: null 
        })
             
        expect(wrapper.find(NextButton).prop('shouldDisplay')).toEqual(false)
    })

    it('should render a <NextButton /> element with the attribute shouldDisplay set to true', () => {
        wrapper.setProps({ 
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong, 
            correctAnswer: fakeQuestions[0] 

        })
             
        expect(wrapper.find(NextButton).prop('shouldDisplay')).toEqual(true)
    })
    it('should render a <NextButton /> element with the text "Show results"', () => {
        wrapper.setProps({ 
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex4, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong, 
            correctAnswer: fakeQuestions[0] 
        })
             
        expect(wrapper.find(NextButton).prop('buttonText')).toEqual('Show results')
    })
    it('should render a <NextButton /> element with the text "Next question"', () => {
        wrapper.setProps({ 
            questionsReady: true, 
            questions: fakeQuestions, 
            questionIndex: fakeQuestionIndex1, 
            startTimer: fakeStartTimer, 
            playSong: fakePlaySong, 
            correctAnswer: fakeQuestions[0] 
        })
             
        expect(wrapper.find(NextButton).prop('buttonText')).toEqual('Next question')
    })
})