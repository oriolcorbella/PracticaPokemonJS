import { removeUserId } from './session.js';

export function initLogout() {
    const logoutButton = document.getElementById('logout-btn');

    logoutButton.addEventListener('click', () => {
        removeUserId();
        window.location.reload();
    });
}
