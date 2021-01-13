import { Usuario } from './usuario';
import { Pago } from './pago';
import { Moneda } from './moneda';
import { Tarifa } from './tarifa';
import { Contrato } from './contrato';

export interface Factura {
    id: number;
    monto?: number;
    montoTotal?: number;
    cantidad?: number;
    concepto?: string;
    usuario?: Usuario;
    formaPago?: Pago;
    moneda?: Moneda;
    tarifa?: Tarifa;
    contrato?: Contrato;
    created_at?: string;
    updated_at?: string;
}
