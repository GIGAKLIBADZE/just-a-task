const signInForm = document.getElementById('sign-in-form') as HTMLFormElement;
const signInEmail = document.getElementById('email') as HTMLInputElement;
const signInPassword = document.getElementById('password') as HTMLInputElement;
const signInConfirmPassword = document.getElementById('confirm-password') as HTMLInputElement;

async function loadUsers() {
    const response = await fetch('http://localhost:3000/users');

    if (!response.ok) throw new Error('Something went wrong');

    const data = await response.json();
    return data;
}

async function handleRedirectionToMainPage() {
    const email = signInEmail.value;
    const password = signInPassword.value;
    const confirmPassword = signInConfirmPassword.value;

    const response = await fetch('http://localhost:3000/sign-in', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, password})
    });

    if (!response.ok) throw new Error('Something went wrong');

    if (password !== confirmPassword) throw new Error('Passwords should match!');

    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = '../index.html';
};

window.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();
});

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    await handleRedirectionToMainPage();
});
