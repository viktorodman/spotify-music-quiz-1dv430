import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { SelectorItem } from './SelectorItem'

import { fakeHighScoreList } from '../../../../fakeData'


/* const fakeFunc = jest.fn()

const props = {
    highScores: fakeHighScoreList,
    selectedHighScore: fakeHighScoreList[0]
} */


configure({adapter: new Adapter()})


describe('<SelectorItem />', () => {
    
    const wrapper = shallow(<SelectorItem isSelected={true}/>)
    

    it('should render a label element with the css class active if the props isSelected is set to true', () => {
             
        expect(wrapper.find('label').hasClass('active')).toEqual(true)
    })

    const wrapper2 = shallow(<SelectorItem isSelected={false} name={fakeHighScoreList[0].playListName}/>)

    it('should render a label element without the css class active if the props isSelected is set to false', () => {
             
        expect(wrapper2.find('label').hasClass('active')).toEqual(false)
    })

    it('should render a input element with the id attribute set to "fake_name_1" if the prop name is set to "fake_name_1"', () => {
             
        expect(wrapper2.find('input').prop('id')).toEqual(fakeHighScoreList[0].playListName)
    })

})