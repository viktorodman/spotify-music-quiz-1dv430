import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import QuizQuestion from './QuizQuestion'


const fakeData = {
    question_img: "fake_question_img.com",
    question_title: "fake_question_title"
}

configure({adapter: new Adapter()})


describe('<QuizQuestion />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<QuizQuestion />)
    })

    it('should render a <h5> element with the text "fake_question_title" if the prop "questionText" is set to "fake_question_title"', () => {
        wrapper.setProps({ questionText: fakeData.question_title})
             
        expect(wrapper.find('h5').text()).toEqual('fake_question_title')
    })

    it('should render a <img> element with the text "fake_question_title" if the prop "questionText" is set to "fake_question_title"', () => {
        wrapper.setProps({ questionImg: fakeData.question_img })
             
        expect(wrapper.find('img').prop('src')).toEqual(fakeData.question_img)
    })
})