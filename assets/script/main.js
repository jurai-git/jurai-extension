import { AuthController } from './controllers/authController.js';

AuthController.init();

document.getElementById('loginLawyer')?.addEventListener('submit', AuthController.handleLogin);
document.getElementById('logout')?.addEventListener('click', AuthController.handleLogout);
