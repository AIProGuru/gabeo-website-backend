const { ResetPinSchema } = require('./ResetPin.schema');
const { randomPinNumber } = require('../../utils/randomGenerator');


const resetPasswordPin = (email) => {
    //random 6 digit pin
    const randPin = randomPinNumber(6);
    const resetObj = {
        email,
        pin: randPin
    }
    return new Promise((resolve, reject) => {
        ResetPinSchema(resetObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}

module.exports = {
    resetPasswordPin
};