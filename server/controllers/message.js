const Message = require('../models/message');
const sendEmail = require('../utils/email');

exports.setfromUserId = (req, res, next) => {
    if(req.session.user) {        
        req.body.fromUser = req.session.user
        console.log('sess',req.body.fromUser)
    }
    next()
}

exports.createMessage = async (req, res) => {
    try { 
        let message = await Message.create(req.body);

        res.status(201).json({
            status: 'success',
            message
        })

        // message.fromUser = JSON.stringify(message.fromUser)
        message = await message.populate('fromUser')
        message = await message.populate('toUser')
        message = await message.populate('productId')
        await sendEmail(message)
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error
        })
    }
};

exports.getMessages = async (req, res) => {
    try { 
        const message = await Message.find({toUser: req.session.user})
        // const message = await Message.find({
        //     $and: [
        //         { $or: [{fromUser: req.session.user}, {toUser: req.session.user}]}
        //     ]
        // });

        res.status(200).json({
            message
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error
        })
    }
}
exports.getMyRequests = async (req, res) => {
    try { 
        const message = await Message.find({fromUser: req.session.user})

        res.status(200).json({
            message
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error
        })
    }
}

exports.updateMessages = async (req, res) => {
    const messageId = req.params.id;

    try { 
        const chckeMessage = await Message.findById(messageId)
        if(chckeMessage.status !== 'pending') {
            return
        };

        const message = await Message.findByIdAndUpdate(messageId, req.body)
        
        res.status(200).json({
            message
        })
        
        message = await message.populate('fromUser')
        await sendEmail(message, message.fromUser.email)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error
        })
    }
}
