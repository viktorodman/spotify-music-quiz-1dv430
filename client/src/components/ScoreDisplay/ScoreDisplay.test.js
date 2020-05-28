import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ScoreDisplay } from './ScoreDisplay'

const fakeScore = 4

configure({adapter: new Adapter()})


describe('<ScoreDisplay />', () => {
    
    const wrapper = shallow(
        <ScoreDisplay score={fakeScore}/>
    )
    
    it(`should render a h5 element with the text "SCORE: ${fakeScore}"`, () => {
             
        expect(wrapper.find('h5').at(0).text()).toEqual(`SCORE: ${fakeScore}`)
    })
})