import React, { Component } from 'react'


class Layout extends Component {
    render() {
        return (
            <div>
                <div>THIS IS A LOGO</div>
                <div>MAYBE A HEADER</div>
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
