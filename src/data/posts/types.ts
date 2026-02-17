import { Author } from "@/components/Author";

export interface Post {
    authors: Author[];
    content: string;
    createdAt: string;
    description: string;
    id: string;
    tag: string;
    imageUrl?: string;
    title: string;
}
