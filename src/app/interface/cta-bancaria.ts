import { Usuario } from "./usuario";
import { Moneda } from './moneda';

export interface CtaBancaria {
    id: number;
    usuario: Usuario;
    moneda: Moneda;
    nu_cuenta: string;
    tipo_cuenta: string;
    titular_cta: string;
    nb_banco: string;
    banco_city_state: string;
    direccion1: string;
    direccion2: string;
    co_bic: string;
    co_abac: string;
    pais: string;
    estatus: string;
    created_at: string;
    updated_at: string;
}
