const express = require('express');
const router  = express.Router();
const {verifyRefreshJWT, createAccessJWT} = require('../helpers/jwt.helper');
const { getUserByEmail } = require('../model/user/User.model');


//return refresh jwt

router.get('/', async(req, res, next) => {
    const {authorization} = req.headers;

    //TODO
    // 1. verify if the refresh token is valid
    // 2. check it the token is in the database.
    // 3. check if the token is not expired.

    const decoded = await verifyRefreshJWT(authorization);
    if(decoded.email) {
        const userProfile = await getUserByEmail(decoded.email);
        if(userProfile._id) {
            let tokenExpireDate = userProfile.refreshJWT.addedAt;
            const dbRefreshToken = userProfile.refreshJWT.token;
            tokenExpireDate = tokenExpireDate.setDate(
                tokenExpireDate.getDate() + +process.env.JWT_REFRESH_EXP_DAY
            );
            const today = new Date();
            if (dbRefreshToken !== authorization && tokenExpireDate < today) {
                return res.status(403).json({ message: "forbidden" });
            }
            const accessJWT = await createAccessJWT(
                decoded.email, userProfile._id.toString()
            );
            return res.json({status: "success", accessJWT});
        }
    }
    res.status(403).json({ message: "Forbidden"});


})

module.exports = router;