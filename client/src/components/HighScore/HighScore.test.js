import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { HighScore } from './HighScore'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import HighScoreSelector from './HighScoreSelector/HighScoreSelector'
import Results from './Results/Results'

import { fakeHighScoreList } from '../../fakeData'


const fakeFunc = jest.fn()

const props = {
    highScores: fakeHighScoreList,
    selectedHighScore: fakeHighScoreList[0]
}


configure({adapter: new Adapter()})


describe('<HighScore />', () => {
    
    const wrapper = shallow(<HighScore highScores={null}/>)
    

    it('should render a LoadingSpinner element if the prop highScores is null', () => {
             
        expect(wrapper.find(LoadingSpinner)).toHaveLength(1)
    })

    const wrapper2 = shallow(<HighScore {...props}/>)

    it('should render a HighScoreSelector and a Results element if the prop highScore is not set to null', () => {
             
        expect(wrapper2.find(HighScoreSelector)).toHaveLength(1)
        expect(wrapper2.find(Results)).toHaveLength(1)
    })

    it('should render a HighScoreSelector with the prop themes set to an array of themes', () => {

        expect(wrapper2.find(HighScoreSelector).prop('themes')).toEqual(props.highScores)
    })

    it('should render a HighScoreSelector with the prop selectedHighScore set to a theme', () => {

        expect(wrapper2.find(HighScoreSelector).prop('selectedHighScore')).toEqual(props.selectedHighScore)
    })

    it('should render a Results with the prop results set to an array of scores', () => {

        expect(wrapper2.find(Results).prop('results')).toEqual(props.selectedHighScore.scores)
    })
})