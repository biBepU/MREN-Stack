const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    sex: {
        type: String
    },
    birthDate: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
   
});

UserSchema.statics.register = async function(name, email, password) {
    try {
        let userExists = await this.findOne({ email });
        if (userExists) {
            console.error("User already exists");
            throw new Error("User already exists");
        }
        
        // Hash the password
        let salt = await bcrypt.genSalt();
        let hashValue = await bcrypt.hash(password, salt);
        let user = await this.create({
            name,
            email,
            password: hashValue
        });
        return user;
    } catch (e) {
        console.error('Error during registration:', e);
        throw e;
    }
};

UserSchema.statics.logIn = async function(email, password) {
    try {
        console.log(`Attempting to log in with email: ${email}`);

        let user = await this.findOne({ email }); // Find user by email

        if (!user) {
            console.error('User not found');
            throw new Error('User not found');
        }

        console.log('User found:', user);

        let isCorrect = await bcrypt.compare(String(password), String(user.password)); // Compare passwords

        if (isCorrect) {
            return user;
        } else {
            console.error('Incorrect password');
            throw new Error('Incorrect password');
        }
    } catch (e) {
        console.error('Error during login:', e);
        throw e;
    }
};

module.exports = mongoose.model("User", UserSchema);
