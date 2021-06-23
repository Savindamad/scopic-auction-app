export class User {
    id: number;
    name: string;
    email: string;
    token: string;
    role: 'normal' | 'admin';
}