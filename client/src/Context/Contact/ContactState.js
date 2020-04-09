import React , {useReducer} from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
    ADD_CONTACT ,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT ,
    UPDATE_CONTACT ,
    FILTER_CONTACTS ,
    CLEAR_FILTER ,
    CONTACT_ERROR ,
    GET_CONTACTS ,
    CLEAR_CONTACTS
} from '../types'

const ContactState = props =>{
    const initialState = {
        contacts:null ,
        current : null ,
        filtered: null ,
        error : null
    }
    const [state , dispatch] = useReducer(contactReducer , initialState)


    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')
            dispatch({
                type: GET_CONTACTS ,
                payload:res.data
            })
        
        } catch (err) {
            dispatch({ 
                type:CONTACT_ERROR ,
                payload: err.response.msg
            })
        }
    }

    //  ADD CONTACT 
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts' , contact , config)
            dispatch({
                type: ADD_CONTACT ,
                payload:res.data
            })
        
        } catch (err) {
            dispatch({ 
                type:CONTACT_ERROR ,
                payload: err.response.msg
            })
        }
    }

    //  DELETE CONTACT 
    const deleteContact = async id => {
        try {
            await axios.delete(`/${id}`)
            dispatch({
                type: DELETE_CONTACT ,
                payload:id
            })
        
        } catch (err) {
            dispatch({ 
                type:CONTACT_ERROR ,
                payload: err.response.msg
            })
        }
    }

    //  UPDATE CONTACT
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}` , contact , config)
            dispatch({
                type:UPDATE_CONTACT ,
                payload : res.data
            })
        
        } catch (err) {
            dispatch({ 
                type:CONTACT_ERROR ,
                payload: err.response.msg
            })
        }
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({
            type:CLEAR_CONTACTS
        })
    }

    //  SET CURRENT CONTACT 
    const setCurrent = contact => {
        dispatch({
            type:SET_CURRENT ,
            payload : contact
        })
    }

    //  CLEARC CURRENT CONTACT
    const clearCurrent = () => {
        dispatch({
            type:CLEAR_CURRENT 
        })
    }

    //  FILTER CONTACT
    const filterContacts = text => {
        dispatch({
            type:FILTER_CONTACTS ,
            payload : text
        })
    }

    //  CLEAR FILTER
    const clearFilter = text => {
        dispatch({
            type:CLEAR_FILTER ,
            payload : null
        })
    }

    return(
    <ContactContext.Provider 
    value={{
        contacts:state.contacts ,
        current:state.current ,
        addContact ,
        deleteContact ,
        setCurrent ,
        clearCurrent,
        updateContact ,
        filtered: state.filtered ,
        clearFilter ,
        filterContacts ,
        error : state.error ,
        getContacts ,
        clearContacts
    }}>
        {props.children}
    </ContactContext.Provider>
    )
}

export default ContactState