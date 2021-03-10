const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function(next){
    const saltRounds = 10;
    if(this.modifiedPaths().includes("password")){
        bcrypt.genSalt(saltRounds,(err, salt)=> {
            if(err) return next(err);
            bcrypt.hash(this.password, salt, (err,hash)=> {
                if(err) return next(err);
                this.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

const UserModal = mongoose.model("User", UserSchema);

module.exports = UserModal;