import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Quiz } from './Quiz'
import QuizQuestion from './QuizQuestion/QuizQuestion'
import QuizAlts from './QuizAlts/QuizAlts'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'





const fakeData = {
    question_alternatives: {
        0: { 
            alt_img: "fake_alt_img.com",
            alt_number: 1,
            alt_title: "fake_alt_title"
        },
        1: { 
            alt_img: "fake_alt_img.com",
            alt_number: 2,
            alt_title: "fake_alt_title"
        },
        2: { 
            alt_img: "fake_alt_img.com",
            alt_number: 3,
            alt_title: "fake_alt_title"
        },
        3: { 
            alt_img: "fake_alt_img.com",
            alt_number: 4,
            alt_title: "fake_alt_title"
        }
    },
    question_img: "fake_question_img.com",
    question_number: 1,
    question_title: "fake_question_title",
    question_track_url: "fake_spotify_uri",
}


const fakeAlt = fakeData.question_alternatives['0'].alt_number

configure({adapter: new Adapter()})


describe('<Quiz />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<Quiz />, {disableLifecycleMethods: true})
    })

    it('should render a <p> element with the text "Loading" if the prop currentQuestion is null', () => {
        wrapper.setProps({currentQuestion: null})
             
        expect(wrapper.find('p').text()).toEqual('Loading')
    })

    it('should render a <QuizQuestion /> element if the prop currentQuestion is not null and shouldShowScore is false', () => {
        wrapper.setProps({shouldShowScore: false, currentQuestion: fakeData})
        
        expect(wrapper.find(QuizQuestion)).toHaveLength(1)
    })

    it('should render a <QuizAlts /> element if the prop currentQuestion is not null and shouldShowScore is false', () => {
        wrapper.setProps({shouldShowScore: false, currentQuestion: fakeData})
        
        expect(wrapper.find(QuizAlts)).toHaveLength(1)
    })

    it('should render a <SpotifyPlayer /> element if the prop currentQuestion is not null and shouldShowScore is false', () => {
        wrapper.setProps({shouldShowScore: false, currentQuestion: fakeData})
        
        expect(wrapper.find(SpotifyPlayer)).toHaveLength(1)
    })
    it('should render a <button /> element with the text "Next Question" if the prop currentQuestion is not null and shouldShowScore is false and props.selectedAnswer is not null', () => {
        wrapper.setProps({shouldShowScore: false, currentQuestion: fakeData, selectedAnswer: fakeAlt})
        
        expect(wrapper.find('button').text()).toEqual('Next Question')
    })

    it('should render a <p> element with the text "Loading." if the prop currentQuestion is null', () => {
        wrapper.setProps({shouldShowScore: true, currentQuestion: fakeData})
             
        expect(wrapper.find('p').text()).toEqual('SCORE')
    })
})