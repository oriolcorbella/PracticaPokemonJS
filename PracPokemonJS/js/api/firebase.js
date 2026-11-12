import { FIREBASE_URL } from './config.js';

async function request(path, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${FIREBASE_URL}/${path}.json`, options);

    if (!response.ok) {
        throw new Error(`Error ${response.status} al llamar a Firebase`);
    }

    return response.json();
}

// Firebase devuelve un objeto { id: datos }, lo pasamos a un array con el id dentro
function toArray(data) {
    if (!data) {
        return [];
    }

    return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

export async function getUsers() {
    const data = await request('users');
    return toArray(data);
}

export async function createUser(username, email) {
    const result = await request('users', 'POST', { username, email });
    return result.name;
}

export async function updateUsername(userId, username) {
    await request(`users/${userId}`, 'PATCH', { username });
}
