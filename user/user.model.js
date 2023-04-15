const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: { type: mongoose.Schema.Types.String },
        email: { type: mongoose.Schema.Types.String },
        password: { type: mongoose.Schema.Types.String },
        picture: {type: mongoose.Schema.Types.Buffer }
    }
);

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

