const { Router } = require('express') 
const jwt = require('jsonwebtoken')
const config = require('config')
const Session = require('../models/Session')
const User = require('../models/User')

const router = Router()

const toStr = (objectId) =>{
    return JSON.stringify(objectId)
}

router.get('/dialog/:userId', async (req, res) =>{
    try {

        const userId = req.params.userId
        if(!userId){
            res.status(400).json({
                message: 'incorrect user id'})
        }
        const token = req.signedCookies.token
        if(!token){
            res.status(400).json({
                message: 'no authorization'})
        }
        const currentUserId = jwt.verify(token, config.get('jwtSecret')).userId
        const withSelf = currentUserId === userId
        const currentUser = await User.findOne({_id: currentUserId})
        const userSessions = currentUser.sessions
        let currentSessionId

        //searching existing session
        if(userSessions){
            let sessionIndex

            sessionIndex = userSessions.findIndex(session => session.users.includes(userId))

            if(withSelf){
                sessionIndex = userSessions.findIndex(session => session.users.includes(userId)
                    &&toStr(session.users[0]) === toStr(session.users[1]))
            }

            if(sessionIndex > -1){
                const session = userSessions[sessionIndex]
                currentSessionId = session._id

                currentSession = await Session.findOne({_id: currentSessionId})
                const messages = currentSession.messages
                const count = session.lastMessage.newMessageCount
                // set new messages as readed
                if(count > 0){
                    const length = messages.length - 1
                    for(let i = 0; i < count; i++){
                        messages[length - i].readed = true
                    }
                    await Session.updateOne({_id: currentSessionId}, {messages: [...messages]})
                }
                session.lastMessage.newMessageCount = 0

                userSessions[sessionIndex] = {...session}

                await User.updateOne({_id: currentUserId},
                    {sessions:[...userSessions]})
            }
        }
        //createing new session 
        if(!currentSessionId){
            const newSession = new Session({
                users:[currentUserId, userId],
                messages:[]
            })
            await newSession.save()

            //updating users 
            await User.updateOne({_id: currentUserId},
                    {sessions:[...currentUser.sessions, {
                        _id: newSession._id,
                        users: newSession.users,
                        lastMessage:{
                            newMessageCount: 0
                        }}]})

            if(!withSelf){
                const reciverUser = await User.findOne({_id: userId})
                await User.updateOne({_id: userId},
                        {sessions:[...reciverUser.sessions, {
                            _id: newSession._id,
                            users: newSession.users,
                            lastMessage:{
                                newMessageCount: 0
                            }}]})
                        }

            currentSessionId = newSession._id

        }
        currentSession = await Session.findOne({_id: currentSessionId})
        
        const updatedUser = await User.findOne({_id: currentUserId})
        const session = updatedUser.sessions.find(session => toStr(session._id)===toStr(currentSessionId))

        usersDialogs.delete(toStr(currentUserId))
        usersDialogs.set(toStr(currentUserId), currentSessionId)

        const {messages ,users, _id} = currentSession

        res.status(200).json({
            session:{messages, users, id: _id},
            lastMessage:{...session.lastMessage}
        })
        
    } catch (e) {
        res.status(500).json({
            message: 'something wrong, please try again'})
    }
})


router.post('/send', async (req, res) =>{
    try{
        const currentSession = await Session.findOne({_id: req.body.dialogId})
        const token = req.signedCookies.token
        
        if(!token){
            res.status(400).json({
                message: 'no authorization'})
        }

        const currentUserId = jwt.verify(token, config.get('jwtSecret')).userId
        const currentUser = await User.findOne({_id: currentUserId})

        const userId = currentSession.users.find(user => toStr(user) !== toStr(currentUserId))
        userDialogId = usersDialogs.get(toStr(userId))
        const isInSameDialog = toStr(userDialogId) === toStr(req.body.dialogId)

        //updating current session 
        currentSession.messages.push({
            sendersName: currentUser.userName,
            from: currentUserId,
            body: req.body.content,
            readed: isInSameDialog
        })
        for(let Id of currentSession.users){
            let user = await User.findById(userId)

            //updating users in current session
            for(let session of user.sessions){
                if(toStr(session._id) === toStr(currentSession._id)){
                    let readed = isInSameDialog||toStr(Id)===toStr(currentUserId)
                    session.lastMessage = {
                        sendersName: currentUser.userName,
                        from: currentUserId,
                        body: req.body.content,
                        readed: isInSameDialog,
                        newMessageCount: readed ? 0 : session.lastMessage.newMessageCount+1
                    }
                    break
                }
            }
            await User.updateOne({_id: Id},{sessions: [...user.sessions]})
        }
    
        await Session.updateOne({_id: req.body.dialogId},{messages:[...currentSession.messages]})
    
        res.status(200).json({
            messages: [...currentSession.messages]})
    }catch(error){
        res.status(500).json({message: 'something wrong, please try again'})
    }
})


module.exports = router