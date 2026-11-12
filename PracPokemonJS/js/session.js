const USER_KEY = 'user';

export function getUserId() {
    return sessionStorage.getItem(USER_KEY);
}

export function saveUserId(userId) {
    sessionStorage.setItem(USER_KEY, userId);
}

export function removeUserId() {
    sessionStorage.removeItem(USER_KEY);
}
