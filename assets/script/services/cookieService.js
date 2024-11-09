import { CONFIG } from '../config.js';
import { BrowserService } from './browserService.js';

export class CookieService {
    static async getCookie() {
        const cookiesAPI = BrowserService.getCookieAPI();
        
        return new Promise((resolve, reject) => {
            cookiesAPI.get({
                url: `https://${CONFIG.domain}/`,
                name: CONFIG.cookieName
            }, (cookie) => {
                if (chrome.runtime.lastError || browser.runtime.lastError) {
                    reject(new Error(`Failed to access cookie: ${chrome.runtime.lastError || browser.runtime.lastError}`));
                } else {
                    resolve(cookie);
                }
            });
        });
    }

    static setCookie(data, rememberMe = false) {
        const cookiesAPI = BrowserService.getCookieAPI();
        const expirationDate = new Date();
        
        if (rememberMe) {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        } else {
            expirationDate.setTime(expirationDate.getTime() + 1800 * 1000);
        }

        return new Promise((resolve, reject) => {
            cookiesAPI.set({
                name: CONFIG.cookieName,
                value: data.advogado.accessToken,
                url: `https://${CONFIG.domain}`,
                domain: CONFIG.domain,
                path: '/',
                expirationDate: Math.floor(expirationDate.getTime() / 1000),
                secure: true,
                sameSite: 'strict'
            }, (cookie) => {
                if (chrome.runtime.lastError || browser.runtime.lastError) {
                    reject(new Error('Error setting cookie'));
                } else {
                    resolve(cookie);
                }
            });
        });
    }

    static removeCookie() {
        const cookiesAPI = BrowserService.getCookieAPI();
        
        return new Promise((resolve, reject) => {
            cookiesAPI.remove({
                url: `https://${CONFIG.domain}/`,
                name: CONFIG.cookieName
            }, (details) => {
                if (details) {
                    resolve(details);
                } else {
                    reject(new Error('Unable to delete cookie'));
                }
            });
        });
    }
}