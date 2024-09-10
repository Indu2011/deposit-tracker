// src/index.js
const { trackDeposits } = require('./tracker');

// Function to handle periodic tracking
function startTracking() {
  console.log("Starting the interval...");
  setInterval(async () => {
    console.log("Running deposit tracking...");
    try {
      await trackDeposits();
    } catch (error) {
      console.error('Error in tracking deposits:', error);
    }
  }, 15000); // Check every 15 seconds
}

async function main() {
  console.log('Starting deposit tracking...');
  startTracking(); // Start periodic tracking

  // Keep the script running
  console.log('Deposit tracking started. Press Ctrl+C to exit.');
}

main();
