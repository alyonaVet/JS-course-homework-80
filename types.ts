export interface Category {
    id: number;
    title: string;
    description: string | null;
}

export interface Place {
    id: number;
    title: string;
    description: string | null;
}

export interface Item {
    id: number;
    category_id: number;
    place_id: number;
    title: string;
    description: string | null;
    image: string | null;
}