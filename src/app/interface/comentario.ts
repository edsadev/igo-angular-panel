import { Usuario } from './usuario';
import { Contrato } from './contrato';

export interface Comentario {
    id: number;
    descripcion: string;
    usuario: Usuario;
    contrato?: Contrato;
    estatus: string;
    created_at: string;
    updated_at: string;
}
