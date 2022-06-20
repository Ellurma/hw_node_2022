const fs = require("fs/promises");
const path=require('path');

const User=require('../dataBase/User')

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(path.join(process.cwd(), 'dataBase', 'User'))
            return data.toString()
                ? JSON.parse(data.toString()).sort((a,b)=>a.id-b.id)
                : []
        } catch (e) {
            console.log(e)
        }
    },
    writer: async (users) => {
        try {
            await fs.writeFile(path.join(process.cwd(), 'dataBase', 'User'), JSON.stringify(users))
        } catch (e) {
            console.log(e)
        }
    },
}