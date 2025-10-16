// apiData.js - Secure test data using environment variables
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const apiData = {
    auth: {
        username: process.env.API_USERNAME || 'admin',
        password: process.env.API_PASSWORD || 'password123'
    },
    newBooking: {
        firstname: process.env.BOOKING_FIRST_NAME || 'Jim',
        lastname: process.env.BOOKING_LAST_NAME || 'Brown',
        totalprice: parseInt(process.env.BOOKING_TOTAL_PRICE) || 111,
        depositpaid: process.env.BOOKING_DEPOSIT_PAID === 'true' || true,
        bookingdates: {
            checkin: process.env.BOOKING_CHECKIN || '2024-01-01',
            checkout: process.env.BOOKING_CHECKOUT || '2024-01-05'
        },
        additionalneeds: process.env.BOOKING_ADDITIONAL_NEEDS || 'Breakfast'
    } 
};
