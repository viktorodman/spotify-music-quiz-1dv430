import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { AnswerStatus } from './AnswerStatus'






configure({adapter: new Adapter()})


describe('<AnswerStatus />', () => {
    
    const wrapper = shallow(<AnswerStatus message={'Correct'} />)
    

    it('should render a h5 element with the text "Correct"', () => {
             
        expect(wrapper.find('h5').text()).toEqual("Correct")
    })

    it('should render a h5 element with the class "visible"', () => {
             
        expect(wrapper.find('h5').hasClass("visible")).toEqual(true)
    })

    it('should render a h5 element without the class "invisible"', () => {
             
        expect(wrapper.find('h5').hasClass("invisible")).toEqual(false)
    })

    const wrapper2 = shallow(<AnswerStatus message={null} />)

    it('should render a h5 element with the text "PLACEHOLDER"', () => {
             
        expect(wrapper2.find('h5').text()).toEqual("PLACEHOLDER")
    })
 
    it('should render a h5 element with the class "invisible"', () => {
             
        expect(wrapper2.find('h5').hasClass("invisible")).toEqual(true)
    })
 
    it('should render a h5 element without the class "visible"', () => {
             
        expect(wrapper2.find('h5').hasClass("visible")).toEqual(false)
    })
})