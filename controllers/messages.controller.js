const messageService = require('../services/messages.service');

const getMessages = async (req, res) => {
    try {
        const messages = await messageService.getMessages();
        res.status(200).render('index', { user: req.user, messages , error:""});   
    } catch (err) {
        res.status(500).render('index', { user: req.user, messages: [], error: 'Failed to fetch messages' + error});
    }
}

const createMessage = async (req, res) => { 
    const { title, content } = req.body;
    const user = req.user;
    try {
        await messageService.createMessage(user.id, title, content);
        res.redirect('/');
    } catch (err) {
        res.status(500).render('index', { user: user, messages: [], error: 'Failed to create message' + err.message });
    }
}

const createAnonMessage = async (req, res) => {
    const { title, content } = req.body;
    try {
        await messageService.createAnonMessage(title, content);
        res.redirect('/');
    } catch (err) {
        res.status(500).render('index', { user: req.user, messages: [], error: 'Failed to create message' + err.message });
    }
}

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await messageService.deleteMessage(id);
        res.redirect('/');
    } catch (err) {
        res.status(500).render('index', { user: req.user, messages: [], error: 'Failed to delete message' + err.message });
    }
}

module.exports = {
    getMessages,
    createMessage,
    createAnonMessage,
    deleteMessage
}