var jwt = require('jsonwebtoken');
const {setJWT, getJWT,} = require("./redis.helper")
const { storeUserRefreshJWT } = require("../model/user/User.model"); 

const createAccessJWT = async (email, _id) => {
    const accessJWT = jwt.sign({email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
    
    await setJWT(accessJWT, _id);

    return Promise.resolve(accessJWT);
}

const createRefreshJWT = async(email, id) => {
    const refreshJWT = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    await storeUserRefreshJWT(refreshJWT, id);
    return Promise.resolve(refreshJWT);
}

const verifyAccessJWT = userJWT => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
    } catch (error) {
        return Promise.reject(error)
    }
}

const verifyRefreshJWT = userJWT => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    } catch (error) {
        return Promise.reject(error)
    }
}


module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT
}