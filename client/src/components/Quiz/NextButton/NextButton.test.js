import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { NextButton } from './NextButton'

const fakeButtonText1 = 'fakeText1'
const fakeButtonText2 = 'fakeText2'




configure({adapter: new Adapter()})


describe('<NextButton />', () => {
    
    const wrapper = shallow(<NextButton shouldDisplay={true} buttonText={fakeButtonText1}/>)
    

    it('should render 1 button element', () => {   

        expect(wrapper.find('button')).toHaveLength(1)
    })

    it(`should render a button element with the text "${fakeButtonText1}"`, () => {   

        expect(wrapper.find('button').text()).toEqual(fakeButtonText1)
    })

    const wrapper2 = shallow(<NextButton shouldDisplay={false} buttonText={fakeButtonText1}/>)

    it('should not render a button element', () => {   

        expect(wrapper2.find('button')).toHaveLength(0)
    })
})