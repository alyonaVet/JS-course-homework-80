export interface Category {
    id: string;
    title: string;
    description: string | null;
}

export type CategoryType = Omit<Category, 'id'>;

export interface Place {
    id: string;
    title: string;
    description: string | null;
}

export interface Item {
    id: string;
    category_id: string;
    place_id: string;
    title: string;
    description: string | null;
    image: string | null;
}