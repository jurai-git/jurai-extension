import { CONFIG } from '../config.js';

export class ApiService {
    static async callApi(formId, data) {
        const url = `${CONFIG.apiBaseUrl}${CONFIG.endpoints[formId]}`;
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Request error: ${response.status}`);
        }

        return response.json();
    }
}