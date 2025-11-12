import { Response } from 'express';

export function setAccessTokenCookie(res: Response, token: string, needRemember: boolean = false) {
    const maxAge = needRemember
        ? (1000 * 60 * 60) // 1 hour
        : (1000 * 60 * 60 * 12); // 12 hours

    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',       // CSRF protection
        maxAge,
        path: '/',
    });
}
