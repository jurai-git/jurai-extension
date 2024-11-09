import { CookieService } from '../services/cookieService.js';
import { ApiService } from '../services/apiService.js';

export class AuthController {
    static async init() {
        try {
            const accessToken = await CookieService.getCookie();
            if (!accessToken) {
                console.warn('Cookie not found');
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error('Error checking authentication: ', error);
            window.location.href = 'login.html';
        }
    }

    static async handleLogin(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const rememberMe = document.getElementById('login-remember-field')?.checked || false;

        try {
            const response = await ApiService.callApi('loginLawyer', data);
            await CookieService.setCookie(response, rememberMe);

            window.location.href = 'index.html';
        } catch (error) {
            alert(`Erro ao fazer login. \n${error.message}`);
        }
    }

    static async handleLogout() {
        try {
            await CookieService.removeCookie();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error when logging out: ', error);
        }
    }
}