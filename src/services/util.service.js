import {useMemo} from "react";

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

export function debounce(func, time) {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, time)
    }
}


export function getExistingProperties(obj) {
    const truthyObj = {};

    for (const key in obj) {
        const val = obj[key];

        if (val || typeof val === 'boolean') {
            truthyObj[key] = val;
        }
    }

    return truthyObj;
}

export const useDateFormatter = () => {
    return useMemo(() => {
        return (timestamp) => {
            const date = new Date(timestamp);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            return date.toLocaleDateString(undefined, options);
        };
    }, []);
};