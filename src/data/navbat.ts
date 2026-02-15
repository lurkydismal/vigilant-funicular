type Position = "left" | "right";

interface Item {
    name: string;
    href: string;
    position: Position;
}

export const items: Item[] = [
    {
        name: "Follows",
        href: "/follows",
        position: "left",
    },
    {
        name: "New post",
        href: "/new-post",
        position: "right",
    },
    {
        name: "Posts",
        href: "/posts",
        position: "right",
    },
    {
        name: "My profile",
        href: "/profile",
        position: "right",
    },
];
