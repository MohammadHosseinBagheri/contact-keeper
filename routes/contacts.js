const express = require('express')
const router = express.Router()


// route    GET api/auth
// desc     Get all users Contacts
// access   Private ( only for registered users )
router.get('/' , (req,res)=>{
    res.send('Get All Contacts')
})

// route    POST api/contacts
// desc     Add a Contact for Specific User
// access   Private ( only for registered users )
router.post('/' , (req,res)=>{
    res.send('Add a Contact')
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