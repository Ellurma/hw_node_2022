const CustomError = require('../errors/CustomError')

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {name, age, password, email} = req.body;

            if (!name || !password || !email) {
                throw new CustomError('Some field is missing', 404)
            }
            if (age < 18 || !Number.isInteger(age)) {
                throw new CustomError('Set valid age', 404)
            }
            if (!name || name.length < 3) {
                throw new CustomError('Set valid name', 404)
            }
            next()
        } catch (e) {
            next(e)
        }

    },

}