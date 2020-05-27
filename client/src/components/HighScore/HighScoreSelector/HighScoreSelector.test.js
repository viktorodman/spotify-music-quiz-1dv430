import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { HighScoreSelector } from './HighScoreSelector'

import SelectorItem from './SelectorItem/SelectorItem'

import { fakeHighScoreList } from '../../../fakeData'



configure({adapter: new Adapter()})


describe('<HighScoreSelector />', () => {
    
    const wrapper = shallow(<HighScoreSelector themes={fakeHighScoreList} selectedHighScore={fakeHighScoreList[0]}/>)
    

    it('should render 2 SelectorItem elements if the highScore list contains 2 highScore objects', () => {
             
        expect(wrapper.find(SelectorItem)).toHaveLength(2)
    })

    it('should render a SelectorItem element with the prop name set to "fake_name_1"', () => {
             
        expect(wrapper.find(SelectorItem).at(0).prop('name')).toEqual(fakeHighScoreList[0].playlistName)
    })

    it('should render a SelectorItem element with the prop isSelected set to true', () => {
             
        expect(wrapper.find(SelectorItem).at(0).prop('isSelected')).toEqual(true)
    })

    it('should render a SelectorItem element with the prop isSelected set to false', () => {
             
        expect(wrapper.find(SelectorItem).at(1).prop('isSelected')).toEqual(false)
    })

})