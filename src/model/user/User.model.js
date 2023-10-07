const { UserSchema } = require('./User.schema');

const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
            .save()
            .then((data)=>resolve(data))
            .catch((error)=>reject(error));
    })
}

const getUserByEmail = ( email ) => {
    return new Promise((resolve, reject) => {
        if( !email ) return false;
        try {
            UserSchema.findOne({email}, (error, data) => {
                if(error){
                    reject(error)
                }
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
        
    })
}

const getUserById = ( _id ) => {
    return new Promise((resolve, reject) => {
        if( !_id ) return false;
        try {
            UserSchema.findOne({_id}, (error, data) => {
                if(error){
                    reject(error)
                }
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
        
    })
}

const storeUserRefreshJWT = (token, id) => {
    console.log(token, id);
    return new Promise((resolve, reject) => {
        try{
            UserSchema.findOneAndUpdate(
                {id}, 
                {
                    $set: {"refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
                },
                {new: true}//if you want to return latestly updated data
            ).then(data=> resolve(data))
            .catch((error) => {
                reject(error);
                console.log(error);
            });
        } catch (error) {
            reject(error);
        }
        
    })
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefreshJWT
};