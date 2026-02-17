import { Author } from "@/components/Author";

export interface Post {
    authors: Author[];
    content: string;
    createdAt: string;
    description: string;
    id: number;
    tag: string;
    imageUrl?: string;
    title: string;
}
