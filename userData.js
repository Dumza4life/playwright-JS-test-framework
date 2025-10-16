// userData.js - Secure test data using environment variables
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const userData = {
    standardUser: {
        username: process.env.STANDARD_USERNAME || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce'
    },
    lockedOutUser: {
        username: process.env.LOCKED_OUT_USERNAME || 'locked_out_user',
        password: process.env.LOCKED_OUT_PASSWORD || 'secret_sauce'
    },
    problemUser: {
        username: process.env.PROBLEM_USERNAME || 'problem_user',
        password: process.env.PROBLEM_PASSWORD || 'secret_sauce'
    },
    performanceGlitchUser: {
        username: process.env.PERFORMANCE_GLITCH_USERNAME || 'performance_glitch_user',
        password: process.env.PERFORMANCE_GLITCH_PASSWORD || 'secret_sauce'
    },
    errorUser: {
        username: process.env.ERROR_USERNAME || 'error_user',
        password: process.env.ERROR_PASSWORD || 'secret_sauce'
    },
    visualUser: {
        username: process.env.VISUAL_USERNAME || 'visual_user',
        password: process.env.VISUAL_PASSWORD || 'secret_sauce'
    },
    checkoutInfo: {
        firstName: process.env.CHECKOUT_FIRST_NAME || 'Ndumiso',
        lastName: process.env.CHECKOUT_LAST_NAME || 'Mayisela',
        zipCode: process.env.CHECKOUT_ZIP_CODE || '12345'
    }
};
