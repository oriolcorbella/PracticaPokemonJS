import { getUsers, createUser, updateUsername } from './api/firebase.js';
import { saveUserId } from './session.js';
import { showModal } from './modal.js';

// Si el email ya existe se actualiza el username, si no se crea un usuario nuevo
async function registerUser(username, email) {
    const users = await getUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        await updateUsername(existingUser.id, username);
        return existingUser.id;
    }

    return createUser(username, email);
}

export function initRegistration(onRegistered) {
    const userForm = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();

        if (!username || !email) {
            showModal('Debes rellenar el username y el email.');
            return;
        }

        try {
            const userId = await registerUser(username, email);
            saveUserId(userId);
            onRegistered();
        } catch {
            showModal('No se ha podido registrar el usuario. Inténtalo de nuevo.');
        }
    });
}
