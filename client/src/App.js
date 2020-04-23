import React, {Component} from 'react';
import { connect } from 'react-redux'
import { isLoggedIn, logout } from './actions/authActions'
import Layout from './hoc/Layout/Layout'
import LoginPage from './containers/LoginPage/LoginPage'
import MusicQuiz from './containers/MusicQuiz/MusicQuiz'



class App extends Component {
  
  componentDidMount() {
    this.props.isLoggedIn()
  }

  render () {
    return (
      <Layout>
        {
        this.props.isAuthenticated ? <MusicQuiz /> : <LoginPage /> 
        }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, { isLoggedIn, logout})(App);
