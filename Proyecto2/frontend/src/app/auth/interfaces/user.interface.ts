export enum AuthStatus {
    Checking,
    Authenticated,
    NotAuthenticated
}

export enum UserRole {
    Cliente = 'Cliente',
    Administrador = 'Administrador'
}

export interface Tokens {
    token:          string;
    refreshToken?:   string;
}

export interface User {
    _id?:               string;
    nombre:             string;
    apellido:           string;
    telefono:           string;
    direccion:          string;
    rol:                UserRole;
    fecha_nacimiento:   Date;
    fecha_registro?:    Date;
    metodo_pago:        string;
}

export interface Register extends User {
    email:          string;
    contrasenia:    string;
}