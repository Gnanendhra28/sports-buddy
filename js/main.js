import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Simple logging for every action
const logAction = (action, details) => {
    console.log(`[LOG] Action: ${action}`, details);
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const showRegister = document.querySelector('#show-register');
    const showLogin = document.querySelector('#show-login');

    showRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Login logic
    const loginButton = document.querySelector('#login-button');
    loginButton.addEventListener('click', async () => {
        const email = document.querySelector('#login-email').value;
        const pass = document.querySelector('#login-password').value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            logAction('User Login', { email: userCredential.user.email });
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } catch (error) {
            logAction('Login Failed', { error: error.message });
            alert(`Login failed: ${error.message}`);
        }
    });

    // Registration logic 
    const registerButton = document.querySelector('#register-button');
    registerButton.addEventListener('click', async () => {
        const email = document.querySelector('#register-email').value;
        const pass = document.querySelector('#register-password').value;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            logAction('User Registration', { email: userCredential.user.email });
            alert('Registration successful! Please login.');
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        } catch (error) {
            logAction('Registration Failed', { error: error.message });
            alert(`Registration failed: ${error.message}`);
        }
    });
});