import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Response } from 'express';
import { Transport, RmqOptions } from '@nestjs/microservices';
import axios, { AxiosRequestConfig } from 'axios';

// NOTE: May be unset
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;
export const needTrace = process.env.NEED_TRACE === 'true';

export function getEnvVar(name: string) {
    const url = process.env[name];

    if (!url) {
        throw new Error(`${name} not set`);
    }

    return url;
}

export const apiGateway = getEnvVar('API_GATEWAY');

export function getEnvUrl(name: string) {
    return getEnvVar(`${name}_URL`);
}

export function getRMQUrl() {
    return getEnvUrl('RABBITMQ');
}

export function enableGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
}

// TODO: Implement
export function addGlobalGuards(app: INestApplication) {
    app;
}

export function connectMicroserviceRMQ(app: INestApplication, queueName: string, durable?: boolean) {
    app.connectMicroservice<RmqOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [getRMQUrl()],
            queue: `${queueName}_rpc_queue`,
            queueOptions: { durable },
        },
    });
}

export const second = 1000;
export const minute = (second * 60);
export const hour = (minute * 60);
export const day = (hour * 24);

export function setResponseCookie(
    response: Response,
    name: string,
    value: string,
    needRemember?: boolean,
    httpOnly?: boolean,
    secure?: boolean,
    path?: string
) {
    const maxAge = needRemember ? hour : (hour * 12);

    response.cookie(name, value, {
        httpOnly,
        secure: secure ?? isProd,
        sameSite: 'strict', // CSRF protection
        maxAge,
        path,
    });
}

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export async function sendRequest<T = any>(
    endpoint: string,
    logger?: PinoLogger,
    data?: Record<string, any> | FormData,
    method: Method = 'POST',
    devResponse?: T,
): Promise<T> {
    logger?.trace(`${method} request to ${endpoint}${data ? ` with data: '${JSON.stringify(data)}'` : ""}`);

    if (isDev && devResponse) {
        logger?.debug(`Mock response: ${devResponse}`);

        return new Promise((resolve) =>
            setTimeout(() => resolve(devResponse), 100),
        );
    }

    const isFormData = data instanceof FormData;

    try {
        const config: AxiosRequestConfig = {
            method,
            url: `${apiGateway}/${endpoint}`,
            headers: isFormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' },
            data: data,
        };

        logger?.trace(`${method} request to ${config.url}`);

        const response = await axios(config);

        logger?.trace(`Status: ${response.status}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        logger?.trace(`Data: ${response.data}`);

        return response.data;
    } catch (error: any) {
        logger?.trace(`Request failed: ${error?.response?.status || error.message}`);

        throw error;
    }
}
