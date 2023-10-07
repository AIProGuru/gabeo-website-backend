const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
    pin: {
        type: String,
        required: true,
        maxlength: 6,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    }
});

/* module.exports = {
        UserSchema: mongoose.model("mongodb table name", schema name)
   }
   if mongodb table name == "User"
   then mongodb creates table named "users"
*/

module.exports = {
    ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
}