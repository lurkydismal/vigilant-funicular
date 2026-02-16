type Position = "left" | "right";

export interface NavItem {
    name: string;
    href: string;
    position: Position;
}

export const items: NavItem[] = [
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
        position: "left",
    },
];
