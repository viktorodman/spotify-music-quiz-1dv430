import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { QuestionTitle } from './QuestionTitle'

import { fakeQuestions } from '../../../fakeData'


configure({adapter: new Adapter()})


describe('<QuestionTitle />', () => {
    
    const wrapper = shallow(
        <QuestionTitle 
            questionNumber={fakeQuestions[0].question_number} 
            numberOfQuestions={fakeQuestions.length}
            title={fakeQuestions[0].question_title}
        />
    )
    
    it(`should render a h5 element with the text "${fakeQuestions[0].question_number} / ${fakeQuestions.length}"`, () => {
             
        expect(wrapper.find('h5').at(0).text()).toEqual(`${fakeQuestions[0].question_number} / ${fakeQuestions.length}`)
    })

    it(`should render a h5 element with the text "${fakeQuestions[0].question_title}"`, () => {
             
        expect(wrapper.find('h5').at(1).text()).toEqual(`${fakeQuestions[0].question_title}`)
    })
})