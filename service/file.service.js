const fs = require("fs/promises");
const path = require('path');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(path.join(process.cwd(), 'dataBase', 'users.json'))
            return data.toString()
                ? JSON.parse(data.toString())
                : []
        } catch (e) {
            console.log(e)
        }
    },
    writer: async (users) => {
        try {
            await fs.writeFile(path.join(process.cwd(), 'dataBase', 'users.json'), JSON.stringify(users))
        } catch (e) {
            console.log(e)
        }
    },
}