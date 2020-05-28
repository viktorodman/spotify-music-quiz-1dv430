import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ThemeSelector } from './ThemeSelector'
import SelectorItem from './SelectorItem/SelectorItem'
import NextButton from '../Quiz/NextButton/NextButton'

import { fakeQuizzes } from '../../fakeData'


const props = {
    quizzes: fakeQuizzes,
    selectedQuiz: false
}


configure({adapter: new Adapter()})


describe('<ThemeSelector />', () => {
    
    const wrapper = shallow(
        <ThemeSelector 
            {...props}
        />
    )
    
    it(`should render 3 SelectorItem elements`, () => {
             
        expect(wrapper.find(SelectorItem)).toHaveLength(3)
    })
    
    it(`should render a NextButton element with the prop shouldDisplay set to false`, () => {
             
        expect(wrapper.find(NextButton).prop('shouldDisplay')).toEqual(false)
    })
})