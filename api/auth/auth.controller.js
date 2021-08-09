const logger = require('../../services/logger.service');
const mondayService = require('../monday/monday.service');
const config = require('../../config')



async function authorization(req, res) {
 
    // console.log('auth useremail', userEmail)
    // const user = await userService.getByEmail(userEmail);
    // console.log('getuser', user)
    // if (user) {
    //     return res.send(user) // sending token
    // } else {
    // redirect to monday.com OAuth URL
    const query = new URLSearchParams({
        client_id: 'a9c01b6914acf9826da43164df5de5e8',
    });
    return res.redirect('https://auth.monday.com/oauth2/authorize?' +
        query.toString()
    );

    // }


}

// https://monday-outlook.herokuapp.com/api/auth/oauth/callback

async function callback(req, res) {
    const { code, state: userEmail } = req.query;
    // TODO: Fix bug: dont store user with an empty token when cancelling authorization
    // Get access token

    if (code) {
        const token = await mondayService.getOauthToken(code);
        const userDomain = await mondayService.getUserDomain(token);
        if (token) {
            await mondayService.storeToken(token, userEmail, userDomain);
            logger.info('Storing new token', userDomain, token, userEmail)
        }
    }
    // TODO - Store the token in a secure way in a way you'll can later on find it using the user ID. 
    // For example: await tokenStoreService.storeToken(userId, token);

    // Redirect back to mondayapp
    const domain = config.env.isDevelopment ? 'http://localhost:3000' : config.env.domain

    return res.redirect(domain + '/taskpane.html?close-dialog=true')
}


module.exports = {

    authorization,
    callback
}



// async function login(req, res) {
//     const { email, password } = req.body
//     try {
//         const user = await authService.login(email, password)
//         req.session.user = user;
//         req.session.save();
//         res.json(user)
//     } catch (err) {
//         res.status(401).send({ error: 'could not login, please try later' })
//     }
// }

// async function signup(req, res) {
//     try {
//         const { firstName, lastName, email, password, username } = req.body
//         logger.debug(firstName + "," + lastName + "," + email + ", " + username + ', ' + password)
//         const account = await authService.signup(firstName, lastName, email, password, username)
//         logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
//         const user = await authService.login(email, password)
//         req.session.user = user
//         req.session.save();
//         res.json(user)
//     } catch (err) {
//         logger.error('[SIGNUP] ' + err)
//         res.status(500).send({ error: 'could not signup, please try later' })
//     }
// }

// async function logout(req, res) {
//     try {
//         req.session.destroy()
//         res.send({ message: 'logged out successfully' })
//     } catch (err) {
//         res.status(500).send({ error: 'could not signout, please try later' })
//     }
// }

// async function getLoggedInUser(req, res) {
//     try {
//         if (req.session.user) {
//             req.session.save();
//             res.json(req.session.user);
//         } else {
//             res.json({});
//         }
//     } catch (err) {
//         logger.error('no signedin users', err);
//         res.status(500).send({ error: 'no signedin users' });
//     }
// }


