export type User = {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    role_name: string;
}

export type UserList = User[]

export type UserListResponse = {
    rows: UserList;
    count: number; 
}