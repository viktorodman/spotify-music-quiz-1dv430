import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { QuizQuestion } from './QuizQuestion'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import AnswerStatus from '../AnswerStatus/AnswerStatus'
import QuizAlts from '../QuizAlts/QuizAlts'


import { fakeQuestions, fakeMessages } from '../../../fakeData'


const fakeFunc = jest.fn()


configure({adapter: new Adapter()})


describe('<QuizQuestion />', () => {

    const wrapper = shallow(<QuizQuestion
        numOfQuestions={fakeQuestions.length}
        question={fakeQuestions[1]} 
        onAnswer={(question_number, alt_number) => fakeFunc()}
        answerMessage={null}
        selectedAnswer={fakeQuestions[1].question_alternatives[0].alt_number}
        correctAnswer={1}
    />)

    it('should render a QuestionTitle element', () => {
        expect(wrapper.find(QuestionTitle)).toHaveLength(1)
    })

    it('should render a QuestionTitle element with the title attribute set to "fake_question_title2"', () => {
        expect(wrapper.find(QuestionTitle).prop('title')).toEqual('fake_question_title2')
    })

    it('should render a QuestionTitle element with the questionNumber attribute set to "2"', () => {
        expect(wrapper.find(QuestionTitle).prop('questionNumber')).toEqual(2)
    })

    it('should render a QuestionTitle element with the numberOfQuestions attribute set to "4"', () => {
        expect(wrapper.find(QuestionTitle).prop('numberOfQuestions')).toEqual(4)
    })

    it('should render a AnswerStatus element', () => {
        expect(wrapper.find(AnswerStatus)).toHaveLength(1)
    })

    it('should render a AnswerStatus element with the message attribute set to null', () => {
        expect(wrapper.find(AnswerStatus).prop('message')).toEqual(null)
    })

    it('should render a QuizAlts element', () => {
        expect(wrapper.find(QuizAlts)).toHaveLength(1)
    })

    it('should render a QuizAlts element with the alternatives attribute set to an array of alternatives', () => {
        expect(wrapper.find(QuizAlts).prop('alternatives')).toEqual(fakeQuestions[1].question_alternatives)
    })

    it('should render a QuizAlts element with the correctAlt attribute set to a "1"', () => {
        expect(wrapper.find(QuizAlts).prop('correctAlt')).toEqual(1)
    })
})