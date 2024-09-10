// src/config.js
require('dotenv').config(); // Ensure .env is loaded

module.exports = {
    ethereumNodeUrl: process.env.ETHEREUM_NODE_URL,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID
};
