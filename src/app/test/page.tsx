async function wait() {
    await new Promise(r => setTimeout(r, 30000));
}

export default async function Page() {
    await wait();

    return (
        <></>
    );
}
