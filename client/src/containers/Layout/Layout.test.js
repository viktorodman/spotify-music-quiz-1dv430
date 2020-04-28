import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Layout } from './Layout'
import LoginPage from '../LoginPage/LoginPage'
import MusicQuiz from '../MusicQuiz/MusicQuiz'

configure({adapter: new Adapter()})

describe('<Layout />', () => {
    let wrapper


    beforeEach(() => {
        wrapper = shallow(<Layout />, {disableLifecycleMethods: true})
    })

    it('should render a <LoginPage /> element if not authenticated', () => {
        wrapper.setProps({isAuthenticated: false})
        

        expect(wrapper.find(LoginPage)).toHaveLength(1)
    })

    it('should render a <MusicQuiz /> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        

        expect(wrapper.find(MusicQuiz)).toHaveLength(1)
    })
})
