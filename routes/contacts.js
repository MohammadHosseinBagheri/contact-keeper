const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')
const User = require('../models/User')

// route    GET api/auth
// desc     Get all users Contacts
// access   Private ( only for registered users )
router.get('/', auth , async (req,res)=>{
    try {
        const contacts = await Contact.find({user : req.user.id}).sort({date:-1})
        res.json(contacts)
    } catch (error) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

// route    POST api/contacts
// desc     Add a Contact for Specific User
// access   Private ( only for registered users )
router.post('/' , auth , [
    check('name' , 'Please enter name of contact')
        .not()
        .isEmpty() ,
    check('lastname' , 'Please enter lastname of your contact')
        .not()
        .isEmpty()
] ,async (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const {name , lastname , email , phone ,type} = req.body

    try {
        let newContact = new Contact({
            name ,
            lastname ,
            email ,
            phone ,
            type,
            user : req.user.id
        })

        const contact= await newContact.save()
        res.json(contact)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

// route    PUT api/contacts/:id
// desc     Update an Existing Contact
// access   Private ( only for registered users )
router.put('/' , (req,res)=>{
    res.send('Update an Existing Contact')
})

// route    DELETE api/contacts/:id
// desc     Delete an Existing Contact
// access   Private ( only for registered users )
router.delete('/' , (req,res)=>{
    res.send('Delete an Existing Contact')
})

module.exports = router