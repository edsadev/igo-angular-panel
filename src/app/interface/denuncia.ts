import { Usuario } from './usuario';
import { Servicio } from './servicio';
import { Contrato } from './contrato';

export interface Denuncia {
    id: number;
    usuario?: Usuario;
    servicio?: Servicio;
    contrato?: Contrato;
    tipo_denuncia: string;
    descripcion: string;
    estatus: string;
    created_at: string;
    updated_at: string;
}
