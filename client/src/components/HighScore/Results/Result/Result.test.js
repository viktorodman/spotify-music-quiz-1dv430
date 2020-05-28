import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Result } from './Result'

import { fakeHighScoreList } from '../../../../fakeData'




configure({adapter: new Adapter()})


describe('<Result />', () => {
    
    const wrapper = shallow(
            <Result 
            correctAnswers={fakeHighScoreList[0].scores[0].numberOfCorrectAnswers}
            numberOfQuestions={fakeHighScoreList[0].scores[0].numberOfQuestions}/>)
    

    it('should render a p element with the text "1 out of 8"', () => {
             
        expect(wrapper.find('p').text()).toEqual("1 out of 8")
    })
})