import { Usuario } from './usuario';
import { Moneda } from './moneda';
import { FormaPago } from './forma-pago';

export interface Paymentez {
    id: number;
    usuario: Usuario;
    formaPago: FormaPago;
    moneda: Moneda;
    transactionId: string;
    monto: number;
    descripcion: string;
    estatus: string;
    created_at: string;
    updated_at: string;
}
