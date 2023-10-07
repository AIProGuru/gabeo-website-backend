const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

//redis://localhost:6379

const setJWT = (key, value) => {
    return new Promise( async (resolve, reject) => {
        try{
            resolve(await client.set(key, value));
        } catch (error) {
            reject(error);
        }

    });
};

const getJWT = (key) => {
    return new Promise( async (resolve, reject) => {
        try{
            resolve (await client.get(key));
        } catch (error) {
            reject(error);
        }

    });
};

const deleteJWT = (key) => {
    try{
        console.log("asdf");
        client.del(key);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    setJWT,
    getJWT,
    deleteJWT
};