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


    it('should render a <input> element with the id of "1"', () => {
        wrapper.setProps({altNumber: fakeData.alt_number})
        
        const radioButton = wrapper.find('input').at(0)

        expect(radioButton.prop('id')).toEqual(fakeData.alt_number)
    })
    
    it('should render a <input> element with the disabled property set to false if correctAlternative is set to null', () => {
        wrapper.setProps({correctAlternative: null})
        
        const radioButton = wrapper.find('input').at(0)

        expect(radioButton.prop('disabled')).toEqual(false)
    })

    it('should render a <input> element with the disabled property set to true if correctAlternative is set to false', () => {
        wrapper.setProps({correctAlternative: false})
        
        const radioButton = wrapper.find('input').at(0)

        expect(radioButton.prop('disabled')).toEqual(true)
    })

    it('should render a <input> element with the disabled property set to true if correctAlternative is set to true', () => {
        wrapper.setProps({correctAlternative: true})
        
        const radioButton = wrapper.find('input').at(0)

        expect(radioButton.prop('disabled')).toEqual(true)
    })

    it('should render a <label> element with the htmlFor property set to "1"', () => {
        wrapper.setProps({altNumber: fakeData.alt_number})
        

        expect(wrapper.find('label').prop('htmlFor')).toEqual(fakeData.alt_number)
    })

    it('should render a <div> element without the class "border-success"', () => {
        wrapper.setProps({ correctAlternative: null })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-success')).toEqual(false)
    })

    it('should render a <div> element without the class "border-danger"', () => {
        wrapper.setProps({ correctAlternative: null })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-danger')).toEqual(false)
    })

    it('should render a <div> element with the class "border-danger"', () => {
        wrapper.setProps({ correctAlternative: false })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-danger')).toEqual(true)
    })

    it('should render a <div> element without the class "border-success"', () => {
        wrapper.setProps({ correctAlternative: false })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-success')).toEqual(false)
    })

    it('should render a <div> element with the class "border-success"', () => {
        wrapper.setProps({ correctAlternative: true })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-success')).toEqual(true)
    })

    it('should render a <div> element without the class "border-danger"', () => {
        wrapper.setProps({ correctAlternative: true })
        
        const div = wrapper.find('div').at(1)

        expect(div.hasClass('border-danger')).toEqual(false)
    })
    
    it('should render a <img> element with the src attribute set to "fake_alt_img.com"', () => {
        wrapper.setProps({ altImg: fakeData.alt_img })
        
        const img = wrapper.find('img')

        expect(img.prop('src')).toEqual(fakeData.alt_img)
    })
    
    it('should render a <h5> element with the text "fake_alt_title"', () => {
        wrapper.setProps({ altTitle: fakeData.alt_title })
        
        const h5 = wrapper.find('h5')

        expect(h5.text()).toEqual(fakeData.alt_title)
    })

    it('should render a <input> element with the name of "1"', () => {
        wrapper.setProps({altNumber: fakeData.alt_number})
        
        const hiddenInput = wrapper.find('input').at(1)

        expect(hiddenInput.prop('name')).toEqual(fakeData.alt_number)
    })
})