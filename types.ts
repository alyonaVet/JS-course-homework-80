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

export type PlaceType = Omit<Place, 'id'>;

export interface Item {
    id: string;
    category_id: string;
    place_id: string;
    title: string;
    description: string | null;
    image: string | null;
}
export type ItemType = Omit<Item, 'id'>;
