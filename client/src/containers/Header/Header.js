import React from 'react'
import Logo from '../../components/HeaderItems/Logo/Logo'
import LogoutButton from '../../components/Auth/AuthButtons/LogoutButton/LogoutButton'
import classes from './Header.module.css'


export const Header = (props) => {
    return (
        <div className={`row ${classes.Header}`}>
            <Logo />
            {props.isAuthenticated ? <LogoutButton click={() => props.logoutClick()}/> : null}
            
        </div>
    )
}


export default Header
