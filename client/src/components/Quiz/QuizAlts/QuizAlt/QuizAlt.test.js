import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { QuizAlt } from './QuizAlt'

const fakeData = { 
    alt_img: "fake_alt_img.com",
    alt_number: 1,
    alt_title: "fake_alt_title"
        
}

configure({adapter: new Adapter()})


describe('<QuizAlt />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<QuizAlt />, {disableLifecycleMethods: true})
    })


    it('should render a <p> element with the text "Loading" if the prop currentQuestion is null', () => {
        wrapper.setProps({altNumber: fakeData.alt_number})
             
        expect(wrapper.find('p').text()).toEqual('Loading')
    })
})