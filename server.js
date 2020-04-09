const express = require('express')
const connectDB = require('./config/db')
const path = require('path')


const app = express()

//Connect to database
connectDB()

// init midleware
app.use(express.json({extended:false}))

//Define Routes
app.use('/api/users' , require('./routes/users'))
app.use('/api/contacts' , require('./routes/contacts'))
app.use('/api/auth' , require('./routes/auth'))

// Server Static assets in productions
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    
    app.get('*' , (req , res)=>{
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>console.log(`Server running on Port ${PORT}`))