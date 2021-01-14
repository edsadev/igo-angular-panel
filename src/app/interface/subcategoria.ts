import { Categoria } from './categoria';

export interface Subcategoria {
    id: number;
    nombre: string;
    descripcion: string;
    categorias: Categoria | any;
    font_type?: string;
    name?: string;
    estatus: string;
    created_at: string;
    updated_at: string;
}
