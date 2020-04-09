import React , {Fragment , useContext , useEffect} from 'react'
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import ContactContext from '../../Context/Contact/contactContext'
import Contactitem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contact = () => {

    const contactContext = useContext(ContactContext)
    const { contacts , filtered , getContacts , loading } = contactContext
    
    useEffect(()=>{
        getContacts()
        // eslint-disable-next-line
    } , [])
    
    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please Add a Contact.</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ?(
                <TransitionGroup>
                {
                    filtered !== null ? filtered.map(
                        contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <Contactitem contact={contact} />
                        </CSSTransition>)
                        ) : contacts.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames="items">
                                <Contactitem  contact={contact} />
                            </CSSTransition>)
                            )
                }
                </TransitionGroup>
            ) : <Spinner/>}
        </Fragment>
    )
}

export default Contact
