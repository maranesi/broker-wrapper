import dotenv from 'dotenv';
dotenv.config()

export const clientId = process.env.APPLICATION_OWNER || 'saudeid';
export const groupId = process.env.APPLICATION_OWNER && process.env.APPLICATION_NAME 
    ? process.env.APPLICATION_OWNER + "-consumer-" + process.env.APPLICATION_NAME
    : "saudeid-consumer"

export const brokers = [ process.env.BROKER_HOST || "localhost:9092" ];
