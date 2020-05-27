import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { QuizAlts } from './QuizAlts'
import QuizAlt from './QuizAlt/QuizAlt'

import { fakeQuestions } from '../../../fakeData'


const fakeFunc = jest.fn()

const props1 = {
    alternatives: fakeQuestions[0].question_alternatives,
    onAltClick: () => {
        console.log('test')
    },
    selectedAlt: fakeQuestions[1].question_alternatives[0].alt_number,
    correctAlt: 1
}
const props2 = {
    ...props1,
    alternatives: null
}

configure({adapter: new Adapter()})


describe('<QuizAlts />', () => {
    const wrapper = shallow(<QuizAlts {...props1} />)
    

    it('should render 4 <QuizAlt> elements ', () => {
        expect(wrapper.find(QuizAlt)).toHaveLength(4)
    })

    it('should render a <QuizAlt> element with the prop "altTitle" set to  "fake_alt_title1"', () => {
        expect(wrapper.find(QuizAlt).at(0).prop('altTitle')).toEqual('fake_alt_title1')
    })

    it('should render a <QuizAlt> element with the prop "altImg" set to  "fake_alt_img1.com"', () => {
        expect(wrapper.find(QuizAlt).at(0).prop('altImg')).toEqual('fake_alt_img1.com')
    })

    it('should render a <QuizAlt> element with the prop "altNumber" set to  "1"', () => {
        expect(wrapper.find(QuizAlt).at(0).prop('altNumber')).toEqual(1)
    })

    it('should render a <QuizAlt> element with the prop "correctAlternative" set to  "true"', () => {
        expect(wrapper.find(QuizAlt).at(0).prop('correctAlternative')).toEqual(true)
    })

    it('should render a <QuizAlt> element with the prop "correctAlternative" set to  "false"', () => {
        expect(wrapper.find(QuizAlt).at(1).prop('correctAlternative')).toEqual(false)
    })

    const wrapper2 = shallow(<QuizAlts {...props2} />)
    
    it('should render0 <QuizAlt> elements ', () => {
        expect(wrapper2.find(QuizAlt)).toHaveLength(0)
    })
})