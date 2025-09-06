export interface TodoItem {
    id: number;
    title: string;
    isDone: boolean;
    createdAt: string;
}

export interface TodoCreate {
    title: string;
}
