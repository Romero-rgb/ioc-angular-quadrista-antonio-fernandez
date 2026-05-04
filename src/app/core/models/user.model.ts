export interface User {
    id: number;
    nom: string;
    email: string;
    rol: 'usuari' | 'admin';
}