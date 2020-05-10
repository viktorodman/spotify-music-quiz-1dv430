import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { QuizAlts } from './QuizAlts'
import QuizAlt from './QuizAlt/QuizAlt'

const fakeData = {
    question_alternatives: [
        { 
            alt_img: "fake_alt_img.com",
            alt_number: 1,
            alt_title: "fake_alt_title"
        },
        { 
            alt_img: "fake_alt_img.com",
            alt_number: 2,
            alt_title: "fake_alt_title"
        },
        { 
            alt_img: "fake_alt_img.com",
            alt_number: 3,
            alt_title: "fake_alt_title"
        },
        { 
            alt_img: "fake_alt_img.com",
            alt_number: 4,
            alt_title: "fake_alt_title"
        }
    ]
}

configure({adapter: new Adapter()})


describe('<QuizAlts />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<QuizAlts />, {disableLifecycleMethods: true})
    })


    it('should render a <p> element with the text "Loading" if the prop currentQuestion is null', () => {
        wrapper.setProps({currentQuestion: null})
             
        expect(wrapper.find('p').text()).toEqual('Loading')
    })

    it('should render a 4 <QuizAlt> elements if the prop currentQuestion is not null', () => {
        wrapper.setProps({currentQuestion: fakeData})
             
        expect(wrapper.find(QuizAlt)).toHaveLength(4)
    })
})