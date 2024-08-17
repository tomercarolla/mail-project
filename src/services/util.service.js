export function makeId(length = 5) {
    let text = "";

    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

export function loadFromStorage(key, defaultValue = null) {
    const value = localStorage[key] || defaultValue;

    return JSON.parse(value);
}