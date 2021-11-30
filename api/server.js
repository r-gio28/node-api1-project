//imports
const express = require('express')
const User = require('./users/model')

// BUILD YOUR SERVER HERE

//instance of express app
const server = express()

//global middleware
server.use(express.json())

//endpoints


//GET: /api/users
//returns and array of users
server.get('/api/users', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({
            message: "error getting all users",
            error: err.message,
        })
    }
})

//GET by id: /api/users/:id
//returns the user object with the specified id
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).json({ 
            message: 'error getting user by id',
            error: err.message,
        })
    }
})

//POST: /api/users 
//creates a user using the information sent inside the request body
server.post('/api/dogs', async (req, res) => {
    try {
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "name and bio required"
            })
        } else {
            const newUser = await User.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ 
            message: 'error creating new user',
            error: err.message,
        })
    }
})

//DELETE by id: /api/users/:id
//removes the user with the specified id and returns the deleted user

//PUT (update) by id: /api/users/:id
//updates the user with the specified id using data from the request body. returns the modified user

// SCHEMA
// {
//    id: "a_unique_id", // String, required
//     name: "Jane Doe",  // String, required
//     bio: "Having fun", // String, required
// }
  

module.exports = server // EXPORT YOUR SERVER instead of {}
