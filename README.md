# deposit-tracker

# Features

Monitors real-time Ethereum deposits to the Beacon Deposit Contract.
Logs deposit transactions with details such as transaction hash, block number, and timestamp.
Sends Telegram notifications for each new deposit (optional).
Easily deployable with Docker.

# Prerequisites

Node.js (v14 or later)
Ethereum Node Provider (e.g., Alchemy, Infura)
Telegram Bot for notifications (optional)
Docker (for containerization)

# Setup Instructions

1. Clone the Repository
   git clone https://github.com/Indu2011/deposit-tracker.git
   cd deposit-tracker
2. Install Dependencies
   npm install
3. Create a .env File
   Create a .env file in the root directory with the following content:
4. Run the Application
   bash
   Copy code
   node src/index.js
5. Run with Docker (Optional)
   If you prefer to run the application inside a Docker container, follow these steps:

   Build the Docker image:
   docker build -t deposit-tracker .
   Run the Docker container:
   docker run -d --env-file .env deposit-tracker
6. Telegram Notification Setup (Optional)
   To enable Telegram notifications, create a Telegram bot and obtain your chat ID:

# Create a Telegram Bot:

Talk to BotFather on Telegram to create a new bot and get the bot token.
Get Your Chat ID:

Send /start to your bot.

Use the following API to get your chat ID:

curl https://api.telegram.org/bot<YourBotToken>/getUpdates
The chat ID will be listed in the response under "message" -> "chat" -> "id".

Update .env with your bot token and chat ID.

# Project Structure

├── Dockerfile
├── .env                # Environment variables
├── package.json
├── README.md           # This file
└── src
    ├── index.js        # Main entry point
    ├── tracker.js      # Ethereum deposit tracking logic
    ├── logger.js       # Logging setup with winston
    └── rpc.js          # Ethereum RPC methods
    
# Key Components

tracker.js: Contains the main logic for monitoring Ethereum deposits.
rpc.js: Handles Ethereum RPC calls to fetch block and transaction data.
logger.js: Manages logging using the winston library.
index.js: Sets up the tracking intervals and runs the application.
Dockerfile: Provides Docker containerization for the application.

# Usage

Once the application is running, it will check for new Ethereum blocks every 15 seconds and log any deposits made to the Beacon Deposit Contract. If Telegram notifications are enabled, it will send a message to your Telegram chat when a deposit is detected.

# Logging

Logs are recorded using the winston library. By default, they will appear in the console. You can extend the logger to write to a file or integrate it with logging platforms like Loggly or Papertrail.

# Error Handling

The application includes error handling for network issues, RPC call failures, and other potential problems. Errors are logged using winston.
