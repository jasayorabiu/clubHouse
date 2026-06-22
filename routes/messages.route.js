const {Router} = require('express');
const router = Router();
const messageController = require('../controllers/messages.controller');

router.get('/', messageController.getMessages);
router.get('/messges', messageController.getMessages);
router.post('/messages', messageController.createMessage);
router.post('/messages/anon', messageController.createAnonMessage);
router.post('/messages/:id/delete', messageController.deleteMessage);

module.exports = router;