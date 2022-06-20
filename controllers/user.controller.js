const {fileService} = require("../services");

module.exports = {
    findAll: async (req, res) => {
        const users = await fileService.reader()
        res.json(users)
    },

    create: async (req, res) => {
        const users = await fileService.reader()
        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}

        await fileService.writer([...users, newUser])
        res.status(201).json(newUser)
    },

    findById:async (req, res) => {
        const {userId} = req.params

        const users = await fileService.reader()
        const user = users.find((user) => user.id === +userId)

        if (!user) {
            return res.status(400).json(`User with id ${userId} is not found`)
        }
        res.json(user)
    },

    updateById: async (req, res) => {
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

        if (index === -1) {
            return res.status(400).json(`User with id ${userId} is not found`)
        }

        const updatedUser = Object.assign(users[index], req.body)
        users.splice(index, 1)

        await fileService.writer([...users, updatedUser])
        res.status(201).json(updatedUser)
    },

    deleteById: async (req, res) => {
        const {userId} = req.params
        const users = await fileService.reader()
        const index = users.findIndex((user) => user.id === +userId)

        if (index === -1) {
            return res.status(400).json(`User with id ${userId} was not found`)
        }
        users.splice(index, 1)
        await fileService.writer(users)
        res.status(204)
    },
}