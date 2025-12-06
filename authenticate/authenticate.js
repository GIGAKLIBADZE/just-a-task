"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signInForm = document.getElementById('sign-in-form');
const signInEmail = document.getElementById('email');
const signInPassword = document.getElementById('password');
const signInConfirmPassword = document.getElementById('confirm-password');
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/users');
        if (!response.ok)
            throw new Error('Something went wrong');
        const data = yield response.json();
        return data;
    });
}
function handleRedirectionToMainPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = signInEmail.value;
        const password = signInPassword.value;
        const confirmPassword = signInConfirmPassword.value;
        const response = yield fetch('http://localhost:3000/sign-in', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok)
            throw new Error('Something went wrong');
        if (password !== confirmPassword)
            throw new Error('Passwords should match!');
        const data = yield response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = '../index.html';
    });
}
;
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadUsers();
}));
signInForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield handleRedirectionToMainPage();
}));
