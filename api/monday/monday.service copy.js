const dbService = require('../../services/db.service');
const fetch = require('node-fetch');
const logger = require('../../services/logger.service');
const { monday } = require('../../config')
// const { getUserByEmail } = require('../user/user.controller');


async function storeToken(token, userEmail, userDomain) {
    console.log('storeToken -> token', token)
    const user = {
        userEmail,
        token,
        userDomain,
        registerDate: Date.now(),
        expirationDate: Date.now() + (1000 * 60 * 60 * 24 * 14), // 14days
        license: 'free-trial',
        userType: 'outlook'
    };
    const collection = await dbService.getCollection('user');
    try {
        // const dbUser = await getUserByEmail(userEmail);
        const dbUser = await userService.getByEmail(userEmail);
        if (dbUser && dbUser.token) {
            dbUser.token = token
            dbUser.isSignedOut = false
            await collection.updateOne({ userEmail }, { $set: dbUser });
            return dbUser
        }
    } catch (err) {
        console.log(err);

    }

    try {
        await collection.insertOne(user);
        logger.debug(`monday.service - new user created: ` + JSON.stringify(user))
        return user;
    } catch (err) {
        console.log('ERROR: cannot insert user')
        throw err;
    }
}

async function getOauthToken(code) {
    // const token = await monday.oauthToken(code, clientId, clientSecret);

    try {
        let res = await fetch('https://auth.monday.com/oauth2/token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: monday.clientId,
                client_secret: monday.clientSecret,
                code
            })
        });
        res = await res.json();
        console.log('monday oauth res', res)
        return res.access_token;

    } catch (err) {
        console.log('ERROR: cannot get monday api token');
        throw err;
    }
}


async function getUserDomain(token) {
    const query = `query {
		                me {
			            	url
		                }
                    }`
    try {
        let res = await fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                query
            })
        });
        res = await res.json();
        const { url } = res.data.me;
        const urls = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im.exec(url);
        return urls[1];


    } catch (err) {
        console.log(err)
    }
}




let query = '{boards(limit:1) { name id description items { name column_values{title id type text } } } }';

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : process.env.MONDAY_API
  },
  body: JSON.stringify({
    'query' : query
  })
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res, null, 2)));



module.exports = {
    storeToken,
    getOauthToken,
    getUserDomain
}