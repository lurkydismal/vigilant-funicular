import { user } from './shared/TestData';
import axios from 'axios';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const isDev = (import.meta.env.MODE != 'production');
export const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export async function sendRequest(
    endpoint: string,
    data?: (Record<string, any> | FormData),
    method: Method = 'POST',
    toJSON: boolean = true,
    devResponse?: string
) {
    if (isDev && devResponse)

        let body: BodyInit | undefined;
    let headers: Record<string, string> | undefined;

    if (!data) {
        body = undefined;
        headers = undefined;

    } else if (data instanceof FormData) {
        if (toJSON) {
            const obj: Record<string, any> = {};
            data.forEach((value: any, key) => {
                if ((value instanceof File) || (value instanceof Blob)) {
                    throw new Error(`Field "${key}" cannot be converted to JSON (File/Blob found)`);
                }
                if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
                    throw new Error(`Field "${key}" cannot be converted to JSON (unsupported type)`);
                }
                obj[key] = value;
            });
            body = JSON.stringify(obj);
            headers = { 'Content-Type': 'application/json' };
        } else {
            body = data;
            headers = undefined; // browser will set multipart/form-data
        }
    } else {
        body = JSON.stringify(data);
        headers = { 'Content-Type': 'application/json' };
    }

    const res = await fetch(apiEndpoint + endpoint, { method, headers, body });

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}: ${res.statusText}`);
    }

    return res;
}

// FIX: Do not log error 401
export async function checkAuth(): Promise<boolean> {
    if (isDev) {
        return true;

    } else {
        // try {
        //     sendRequest('/auth/verify');
        //
        //     return true;
        // } catch {
        //     return false;
        // }
        if (!getCredentials()) {
            return false;
        }

        const res = await axios.post(`${apiEndpoint}/auth/verify`, null, {});

        return (res.status >= 200) && (res.status < 300);
    }
}

interface UserCredentials {
    id: number;
    username: string;
}

export function storeCredentials(credentials: UserCredentials) {
    if (isDev) {
        return;
    }

    localStorage.setItem('id', String(credentials.id));
    localStorage.setItem('username', credentials.username);
}

export function getCredentials(): UserCredentials {
    if (isDev) {
        return user;

    } else {
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');

        if (!id || !username) {
            throw new Error(`Getting credentials failed`);
        }

        return {
            id: Number(id),
            username,
        };
    }
}

export function paginate<T>(items: T[], currentPage: number, perPage: number): T[] {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
}
