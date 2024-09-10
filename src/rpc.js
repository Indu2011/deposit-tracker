const { ethers } = require('ethers');
const config = require('./config');

// Initialize provider
const provider = new ethers.JsonRpcProvider(config.ethereumNodeUrl);

async function getLatestBlock() {
    try {
        // Fetch the block with transactions
        const latestBlock = await provider.getBlock('latest', true);
        console.log('Fetched latest block with transactions: ', latestBlock);
        return latestBlock;
    } catch (error) {
        console.error('Error fetching latest block:', error);
        throw new Error('Error fetching latest block: ' + error.message);
    }
}

module.exports = { getLatestBlock };
