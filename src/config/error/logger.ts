/* eslint-disable */

import chalk from 'chalk';

const isServer = typeof window === 'undefined';

const formatMessage = (level: string, message: string) => {
    const timestamp = new Date().toISOString();
    return `${isServer ? chalk.gray(`[${timestamp}]`) : `[${timestamp}]`} ${level} ${message}`;
};

// Helper to log nested objects for better readability
const logNestedObject = (obj: Record<string, any>, indent = 2, level = 0) => {
    const padding = ' '.repeat(level * indent);
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            console.log(`${padding}${isServer ? chalk.cyan(key) : key}:`);
            logNestedObject(obj[key], indent, level + 1);
        } else {
            console.log(
                `${padding}${isServer ? chalk.cyan(key) : key}: ${isServer ? chalk.green(JSON.stringify(obj[key])) : JSON.stringify(obj[key])}`
            );
        }
    }
};

// Define the logger with chalk-based methods if on server, or plain console methods if on client
export const logger = {
    info: (message: string, obj?: Record<string, any>) => {
        console.log(formatMessage(isServer ? chalk.blue('[INFO]') : '[INFO]', message));
        if (obj) logNestedObject(obj);
    },

    warn: (message: string, obj?: Record<string, any>) => {
        console.warn(formatMessage(isServer ? chalk.yellow('[WARN]') : '[WARN]', message));
        if (obj) logNestedObject(obj);
    },

    error: (message: string, obj?: Record<string, any>) => {
        console.error(formatMessage(isServer ? chalk.red('[ERROR]') : '[ERROR]', message));
        if (obj) logNestedObject(obj);
    },
};

export default logger;
