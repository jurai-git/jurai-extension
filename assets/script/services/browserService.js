export class BrowserService {
    static getCookieAPI() {
        if (typeof browser !== 'undefined') return browser.cookies;
        if (typeof chrome !== 'undefined') return chrome.cookies;
        throw new Error('Navegador não suportado');
    }

    static getBrowserAPI() {
        return typeof browser !== 'undefined' ? browser : chrome;
    }
}