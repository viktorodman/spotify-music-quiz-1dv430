import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { SelectorItem } from './SelectorItem'

import { fakeQuizzes } from '../../../fakeData'

const fakeScore = 4

configure({adapter: new Adapter()})


describe('<SelectorItem />', () => {
    
    const wrapper = shallow(
        <SelectorItem 
            quizId={fakeQuizzes[0].id}
            quizDescription={fakeQuizzes[0].description}
            quizImage={fakeQuizzes[0].image}
        />
    )
    
    it(`should render a input element with the attribute id set to "${fakeQuizzes[0].id}"`, () => {
             
        expect(wrapper.find('input').at(0).prop('id')).toEqual(fakeQuizzes[0].id)
    })
    
    it(`should render a label element with the attribute htmlFor set to "${fakeQuizzes[0].id}"`, () => {
             
        expect(wrapper.find('label').at(0).prop('htmlFor')).toEqual(fakeQuizzes[0].id)
    })
    
    it(`should render a img element with the attribute src set to "${fakeQuizzes[0].image}"`, () => {
             
        expect(wrapper.find('img').prop('src')).toEqual(fakeQuizzes[0].image)
    })
    
    it(`should render a h5 element with the text "${fakeQuizzes[0].description}"`, () => {
             
        expect(wrapper.find('h5').text()).toEqual(`${fakeQuizzes[0].description}`)
    })
     
    it(`should render a input element with the attribute name set to "${fakeQuizzes[0].id}"`, () => {
             
        expect(wrapper.find('input').at(1).prop('name')).toEqual(fakeQuizzes[0].id)
    })
})