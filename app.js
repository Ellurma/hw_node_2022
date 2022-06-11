const express = require('express')
const {fileService} = require("./service");

const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users)
})
app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (age < 18 || !Number.isInteger(age)) {
        return res.status(400).json('Set valid age')
    }
    if (!name || name.length < 3) {
        return res.status(400).json('Set valid age')
    }
    const users = await fileService.reader()
    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}

    await fileService.writer([...users, newUser])
    res.status(201).json(newUser)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await fileService.reader()
    const user = users.find((user) => user.id === +userId)

    if (!user) {
        return res.status(400).json(`User with id ${userId} is not found`)
    }
    res.json(user)
})
app.put('/users/:userId', async (req, res) => {
    const {name, age} = req.body
    const {userId} = req.params

    if (name && name.length < 3) {
        return res.status(400).json('Set valid name')
    }
    if (age && age < 18) {
        return res.status(400).json('Set valid age')
    }

    const users = await fileService.reader()
    const index = users.findIndex((user) => user.id === +userId)

    if(index===-1){
        return res.status(400).json(`User with id ${userId} is not found`)
    }

    const updatedUser=Object.assign(users[index],req.body)
    users.splice(index,1)

    await fileService.writer([...users,updatedUser])
    res.status(201).json(updatedUser)
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()
    const index = users.findIndex((user) => user.id === +userId)

    if (index === -1) {
        return res.status(400).json(`User with id ${userId} was not found`)
    }
    users.splice(index, 1)
    await fileService.writer(users)
    res.status(204)
})


app.listen(3000, () =>
    console.log('Server running on 3000 port'))