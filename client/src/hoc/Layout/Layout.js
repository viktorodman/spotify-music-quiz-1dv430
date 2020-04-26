import React, { Component } from 'react'


class Layout extends Component {
    render() {
        return (
            <div className="ui four column centered grid">
                <div className="row">
                    <div>THIS IS A LOGO</div>
                    <div>MAYBE A HEADER</div>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

/* const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => {
    
} */

export default Layout
