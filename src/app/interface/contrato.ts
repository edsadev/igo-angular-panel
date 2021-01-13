import { Usuario } from "./usuario";
import { Servicio } from './servicio';
import { Notificacion } from './notificacion';
import { Puntaje } from './puntaje';

export interface Contrato {
    id: number;
    monto?: number;
    concepto?: string;
    fe_servicio?: string;
    cliente_id?: Usuario;
    proveedor_id?: Usuario;
    servicios_id?: Servicio;
    notificas_id?: Notificacion;
    puntajes_id?: Puntaje;
    created_at?: string;
    updated_at?: string;
}
