import { Usuario } from './usuario';
import { CtaBancaria } from './cta-bancaria';

export interface Retiro {
    id: number;
    usuario: Usuario;
    ctaBancaria: CtaBancaria;
    monto: number;
    descripcion: string;
    estatus: string;
    created_at: string;
    updated_at: string;
}
