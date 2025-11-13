import axios from 'axios';
import { user } from './shared/TestData';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const isDev = import.meta.env.MODE != 'production';
export const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export async function sendRequest<T = any>(
    endpoint: string,
    data?: Record<string, any> | FormData,
    method: Method = 'POST',
    devResponse?: T,
): Promise<T> {
    if (isDev && devResponse) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(devResponse), 100),
        );
    }

    const isFormData = data instanceof FormData;

    try {
        const config = {
            method,
            endpoint,
            headers: isFormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' },
            data: isFormData ? data : data ? JSON.stringify(data) : undefined,
        };

        const response = await axios(config);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        console.error(
            'Request failed:',
            error?.response?.status || error.message,
        );
        throw error;
    }
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

        return res.status >= 200 && res.status < 300;
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

export function paginate<T>(
    items: T[],
    currentPage: number,
    perPage: number,
): T[] {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
}
