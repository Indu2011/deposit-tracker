// src/tracker.js

const fetch = require('node-fetch'); // Static import since we are not using ES modules

const { getLatestBlock } = require('./rpc');
const winston = require('./logger');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const BEACON_DEPOSIT_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

async function sendTelegramNotification(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    };

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        winston.error("Error sending Telegram notification:", error);
    }
}

async function trackDeposits() {
    try {
        const block = await getLatestBlock();
        console.log("Latest block fetched: ", block);

        const transactions = block.transactions;
        console.log("Block transactions: ", transactions);

        if (!transactions || transactions.length === 0) {
            console.log('No transactions in the latest block.');
            await sendTelegramNotification('No transactions in the latest block.');
            return;
        }

        let depositFound = false;
        transactions.forEach(tx => {
            if (tx.to && tx.to.toLowerCase() === BEACON_DEPOSIT_CONTRACT.toLowerCase()) {
                winston.info(`New deposit detected: ${tx.hash}`);
                console.log("Deposit Details: ", tx);
                depositFound = true;
                sendTelegramNotification(`New deposit detected: ${tx.hash}\nDetails: ${JSON.stringify(tx)}`);
            }
        });

        if (!depositFound) {
            console.log('No deposits to the specified contract in the latest block.');
        }
    } catch (error) {
        winston.error("Error tracking deposits:", error);
        console.error('Error in tracking deposits:', error);
        await sendTelegramNotification('Error tracking deposits: ' + error.message);
    }
}

// Temporarily trigger a notification
(async () => {
    await sendTelegramNotification('This is a test notification.');
})();


module.exports = { trackDeposits };
