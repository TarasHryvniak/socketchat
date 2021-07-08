const { Router } = require("express");
const { check, validationResult } = require ("express-validator");
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Session = require('../models/Session')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()

// /api/auth/register

router.post('/register',
[
    check('email','incorrect email').isEmail(),
    check('password', 'min password length 6 characters').isLength({min: 6})
],
async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors,
                message: 'incorrect registration data'
            })
        }

        const {email, password, userName} = req.body
        const candidate = await User.findOne({ email })

        if(candidate){
            return res.status(400).json({
                message: 'This user already exist'
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 13)  

        //creating new user and adding a session with self
        const user = new User({
            email,
            password: hashedPassword,
            userName: userName,
            sessions:[]

        })
       
        const newSession = new Session({
            users:[user._id, user._id],
            messages:[]
        })

        user.sessions.push({
            _id:newSession._id,
            users:newSession.users,
            messages:newSession.messages,
            lastMessage:{newMessageCount: 0}
        })
        await newSession.save()
    
        await user.save()

        res.status(201).json({ message:'registration successful' })
        
    } catch (e) {
        res.status(500).json({ message:"something went wrong, please try again" })
    }
}
)

// api/auth/login

router.post('/login',
[
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password','input password').exists()
],
async(req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors,
                message: 'incorect login data'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({
                message:'user not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: 'incorrect password'
            })
        }

        const usersData = await User.find({})
        const users = usersData.map(user =>{
            return{
                userId: user._id,
                userName: user.userName,
                connected: false
            }
        })

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '12h'}
        )
    
        res.cookie('token',`${token}`,{signed: true})
        res.status(200).json({user:{
            userId: user._id,
            userName:user.userName,
            sessions: user.sessions
        },
        users:[...users]})
    }catch(e){
        res.status(500).json({
            message:"something went wrong, please try again"})
    }
})

// api/auth/logout

router.delete('/logout',
async (req, res) => {
    try {
        if(req.signedCookies.token){
            const token = req.signedCookies.token
            const currentUserId = jwt.decode(token, config.get('jwtSecret')).userId
            usersDialogs.delete(JSON.stringify(currentUserId))
        }

        res.clearCookie('token')
        res.status(200).json({})
    } catch (e) {
        res.status(500).json({
            message:"something went wrong, please try again"})
    }
})

module.exports = router