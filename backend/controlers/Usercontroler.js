// log in controller
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: '1h' })
}

const Logincontroller = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        const token = createToken()        
        const verifypass = await bcrypt.compare(password, user.password);
        if(verifypass){
            res.status(200).json({msg:'log in success', user, token})
        }else{
            res.status(404).json({msg:'invalid password'})
        }
    }else{
        res.status(404).json({msg:'not found'})
    }
}
const Registercontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({msg:'Please Provide email and password'})
        } else {
            const duplicate = await User.findOne({ email })
            if (duplicate) {
                res.status(400).json({msg:"duplicate email"})
            } else {
                const sault = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, sault)
                const Data = await User.create({ email, password: hash })
                if (Data) {
                    res.status(200).json({ msg:"User created", Data })
                } else {
                    res.status(400).json({msg:"Failed to create user"})
                }
            }
        }
    } catch (err) {
        res.status(400).send("an error")
    }

}

module.exports = { Logincontroller, Registercontroller };