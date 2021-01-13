import { Role } from "./role";

export interface Usuario {
    id: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    direccion?: string;
    latitud?: string;
    longitud?: string;
    ciudad?: string;
    telefono?: string;
    dni?: string;
    estatus?: string;
    foto?: string;
    co_verificacion?: string;
    verificado?: boolean;
    roles?: Array<Role>;
    created_at?: string;
    updated_at?: string;
}
