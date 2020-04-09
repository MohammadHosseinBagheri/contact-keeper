import React , {Fragment , useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext'
import ContactContext from '../../Context/Contact/contactContext'

const Navbar = ({title , icon}) => {

    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)

    const { isAuthenticated , logout , user} = authContext
    const {clearContacts} = contactContext

    const onLogout = () =>{
        logout()
        clearContacts()
    }
    const authLink = (
        <Fragment>
            <li>Hello {user && user.name }</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'/> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    )
    const guestLink = (
        <Fragment>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>login</Link></li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLink : guestLink}
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title : 'Contact Keeper' ,
    icon : 'fas fa-id-card-alt'
}

export default Navbar
