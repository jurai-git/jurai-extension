import { ApiService } from '../services/apiService.js';
import { CookieService } from '../services/cookieService.js';

class LoginPage {
    constructor() {
        this.form = document.getElementById('loginLawyer');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form?.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Entrando...';

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            const rememberMe = document.getElementById('login-remember-field')?.checked || false;

            const response = await ApiService.callApi('loginLawyer', data);
            await CookieService.setCookie(response, rememberMe);
            
            window.location.href = 'index.html';
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Entrar';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new LoginPage());