const pool = require('../pool');

const getMessages = async () => {
    try {
        const result = await pool.query('SELECT messages.*, users.firstname FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC');
        return result.rows;
    }catch(err){
        throw err;
    }
}

const createMessage = async (user_id, title, content) => {
    try {
        const result = await pool.query(
            'INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
            [user_id, title, content]
        );
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}
const createAnonMessage = async (title, content) => {
    try {
        const result = await pool.query(
            'INSERT INTO messages (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

const deleteMessage = async (message_id) => {
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [message_id]);
    } catch (err) {
        throw err;
    }
}
module.exports = {
    getMessages,
    createMessage,
    createAnonMessage,
    deleteMessage
};