import { Subcategoria } from './subcategoria';
import { Usuario } from './usuario';

export interface Servicio {
    id: number;
    titulo: string;
    tipo_proyecto?: string;
    fecha_solicitada?: string;
    hora_solicitada?: string;
    descripcion?: string;
    monto?: number;
    foto?: string;
    extraFotos?: Array<string>;
    subCategorias?: Array<Subcategoria>;
    cliente?: Usuario;
    proveedor?: Usuario;
    estatus?: string;
    created_at?: string;
    updated_at?: string;
    postulaciones?: number;
    numVoto?: number;
    votoTotal?: number;
    puntaje?: number;
}
