import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Results } from './Results'

import Result from './Result/Result'

import { fakeHighScoreList } from '../../../fakeData'




configure({adapter: new Adapter()})


describe('<Results />', () => {
    
    const wrapper = shallow(<Results results={fakeHighScoreList[0].scores}/>)
    

    it('should render 3 Result elements', () => {
             
        expect(wrapper.find(Result)).toHaveLength(3)
    })

    it('should render a Result element with the prop numberOfQuestions set to "8"', () => {
             
        expect(wrapper.find(Result).at(0).prop('numberOfQuestions')).toEqual(fakeHighScoreList[0].scores[0].numberOfQuestions)
    })

    it('should render a Result element with the prop correctAnswers set to "1"', () => {
             
        expect(wrapper.find(Result).at(0).prop('correctAnswers')).toEqual(fakeHighScoreList[0].scores[0].numberOfCorrectAnswers)
    })

    const wrapper2 = shallow(<Results results={fakeHighScoreList[2].scores}/>)

    it('should render 0 Result elements', () => {
             
        expect(wrapper2.find(Result)).toHaveLength(0)
    })

    it('should render a p element with the text "No results found..."', () => {
             
        expect(wrapper2.find('p').text()).toEqual("No results found...")
    })
})