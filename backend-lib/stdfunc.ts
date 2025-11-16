export function getRMQUrl() {
    const rabbitUrl = process.env.RABBITMQ_URL;

    if (!rabbitUrl) {
        throw new Error('RABBITMQ_URL not set');
    }
}
