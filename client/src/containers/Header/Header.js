import React, { Component } from 'react'

import classes from './Header.module.css'

export class Header extends Component {
    render() {
        return (
            <div className={`row ${classes.Header}`}>
                <div className="col">Header</div>
                <div className="col">Logo</div>
            </div>
        )
    }
}

export default Header
