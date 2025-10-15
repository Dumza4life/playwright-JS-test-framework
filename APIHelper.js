// APIHelper.js
import { expect } from '@playwright/test';

export class APIHelper {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
    }

    /**
     * Authenticates and returns a token.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>} The authentication token.
     */
    async createToken(username, password) {
        const response = await this.request.post(`${this.baseURL}/auth`, {
            data: {
                username: username,
                password: password
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
        return responseBody.token;
    }
}
