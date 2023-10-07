const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  phone: {
    type: String,
    required: true,
    maxlength: 11,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  organization: {
    type: String,
    maxlength: 100,
    required: true,
  },
  role: {
    type: String,
    maxlength: 100,
    required: true,
  },

  // refreshJWT: {
  //     token: {
  //         type: String,
  //         maxlength: 500,
  //         default: "",
  //     },
  //     addedAt: {
  //         type: Date,
  //         required: true,
  //         default: Date.now(),
  //     },
  // },
});

/* module.exports = {
        UserSchema: mongoose.model("mongodb table name", schema name)
   }
   if mongodb table name == "User"
   then mongodb creates table named "users"
*/

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
