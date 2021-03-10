const jwt = require('jwt-simple');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const {validateUsername, validateEmail, validateFullName, validatePassword} = require('../utils/validation');

/** 
 * @function LoginAuthentication
 * @description Authenticates user
 * @param usernameOrEmail
 * @returns {{user: _id, email, username}, token}
*/

module.exports.verifyJwt = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = jwt.decode(token, process.env.JWT_SECRET).id;

            const user = await User.findOne(
                {_id: id},
                "email username fullName"
            );
            if (user){
                return resolve(user);
            }else{
                reject('Not Authorized');
            }
        } catch (err) {
            return reject('Not Authorized');
        }
    });
};


module.exports.loginAuthentication = async(req, res, next) => {

    const {usernameOrEmail, password} = req.body;
    const {authorization} = req.headers;
    
    if(authorization){
        try {
            const user = await this.verifyJwt(authorization);
            return res.send({
                user,
                token: authorization,
            });
        } catch (err) {
            return res.status(401).send({ error: err});
        }
    }

    if (!usernameOrEmail || !password){
        res.status(400).send("Please provide both your username/email and password.");
    }

    try {
         const user = await User.findOne({
            $or: [{username: usernameOrEmail}, {email: usernameOrEmail}]
        });
    
        if(!user || !user.password){
            res.status(400).send({error: "The username or password is incorrect."});
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                return next(err);
            }
            if(!result){
                return res.status(400).send({error: "The username or password is incorrect."});
            }

            res.send({
                user:{
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                },
                token: jwt.encode({id: user._id}, process.env.JWT_SECRET)
            })
        });
    } catch (err) {
        next(err);
    }

}

/** 
 * @function register
 * @description Registers user
 * @param username
 * @param fullName
 * @param email
 * @param password
 * @returns {{email, username}, token}
*/

module.exports.register = async(req, res, next) => {
    const { username, fullName, email, password} = req.body;


    const usernameError = validateUsername(username);
    if(usernameError){
        return res.status(400).send({error: usernameError});
    }
    const fullNameError = validateFullName(fullName);
    if(fullNameError){
        return res.status(400).send({error: fullNameError});
    }
    const emailError = validateEmail(email);
        if(emailError){
            return res.status(400).send({error: emailError});
        }
    
    const passwordError= validatePassword(password);
        if(passwordError){
            return res.status(400).send({error: passwordError});
        }

    let user = null;
    try {
        user = new User ({
            username,
            fullName,
            email,
            password,
        });
        await user.save();

        res.send({user:{email: user.email, username: user.username,}, token: jwt.encode({id: user._id}, process.env.JWT_SECRET)});
    } catch (err) {
        next(err);
    }
}