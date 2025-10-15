// booking.spec.js
import { test, expect } from '@playwright/test';
import { APIHelper } from '../APIHelper';
import { apiData } from '../apiData';

// Run API tests serially to share state like bookingId
const serial = test.describe.serial;

serial('Restful-Booker API Tests', () => {
    let apiHelper;
    let token;
    let bookingId;

    test.beforeAll(async ({ request, baseURL }) => {
        apiHelper = new APIHelper(request, baseURL);
        // Authentication: Get a token for operations that require it
        token = await apiHelper.createToken(apiData.auth.username, apiData.auth.password);
        expect(token).toBeDefined();
    });

    test('should be able to create a new booking (CREATE)', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/booking`, {
            data: apiData.newBooking
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        
        // Response validation
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking.firstname).toBe(apiData.newBooking.firstname);
        expect(responseBody.booking.totalprice).toBe(apiData.newBooking.totalprice);
        
        bookingId = responseBody.bookingid;
    });

    test('should be able to retrieve the created booking (READ)', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking/${bookingId}`);
        
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        
        // Response validation
        expect(responseBody.firstname).toBe(apiData.newBooking.firstname);
        expect(responseBody.lastname).toBe(apiData.newBooking.lastname);
    });

    test('should be able to update the created booking (UPDATE)', async ({ request, baseURL }) => {
        const updatedBooking = {
            ...apiData.newBooking,
            firstname: 'UpdatedName',
            totalprice: 999
        };

        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            data: updatedBooking
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        
        // Response validation
        expect(responseBody.firstname).toBe(updatedBooking.firstname);
        expect(responseBody.totalprice).toBe(updatedBooking.totalprice);
    });

    test('should support partial update via PATCH', async ({ request, baseURL }) => {
        const partial = { firstname: 'PatchedName' };
        const response = await request.patch(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            data: partial
        });
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.firstname).toBe('PatchedName');
    });

    test('should be able to delete the created booking (DELETE)', async ({ request, baseURL }) => {
        const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        });

        // The API returns 201 Created for a successful DELETE
        expect(response.status()).toBe(201);

        // Verify deletion by trying to retrieve the booking
        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404);
    });

    // Additional coverage
    test('should list booking IDs (GET /booking)', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/booking`);
        expect(response.ok()).toBeTruthy();
        const ids = await response.json();
        expect(Array.isArray(ids)).toBeTruthy();
        if (ids.length > 0) {
            expect(ids[0]).toHaveProperty('bookingid');
        }
    });

    test('should filter booking IDs by firstname and lastname', async ({ request, baseURL }) => {
        const params = new URLSearchParams({ firstname: apiData.newBooking.firstname, lastname: apiData.newBooking.lastname });
        const response = await request.get(`${baseURL}/booking?${params.toString()}`);
        expect(response.ok()).toBeTruthy();
        const ids = await response.json();
        expect(Array.isArray(ids)).toBeTruthy();
    });

    test('should return 201 on ping (GET /ping)', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/ping`);
        expect(response.status()).toBe(201);
    });

    test('should reject update without token (403)', async ({ request, baseURL }) => {
        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: { ...apiData.newBooking, firstname: 'NoAuth' }
        });
        expect(response.status()).toBe(403);
    });

    test('should reject partial update without token (403)', async ({ request, baseURL }) => {
        const response = await request.patch(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: { firstname: 'NoAuth' }
        });
        expect(response.status()).toBe(403);
    });
});
