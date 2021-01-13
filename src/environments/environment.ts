// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  "accepted": {
    "202": "El recurso ha sido actualizado",
    "message": "La petición ha sido aceptada para procesamiento. La petición eventualmente pudiere no ser satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar"
  },
  "created": {
    "201": "El recurso ha sido creado",
    "message": "La solicitud ha sido procesada y ha resultado en la creación del nuevo recurso"
  },
  authorization: {
    "token": "Bearer 0bea591255R05M04A08Xc9c68c53f2020a"
  },
  pathName: {
    "login": {
      "post": "http://127.0.0.1:8000/api/v1/usuarios/login"
    },
    "categoria": {
      "get": "http://127.0.0.1:8000/api/v1/categorias",
      "put": "http://127.0.0.1:8000/api/v1/categorias/",
      "post": "http://127.0.0.1:8000/api/v1/categorias",
      "delete": "http://127.0.0.1:8000/api/v1/categorias/"
    },
    "subcategoria": {
      "get": "http://127.0.0.1:8000/api/v1/subcategorias",
      "put": "http://127.0.0.1:8000/api/v1/subcategorias/",
      "post": "http://127.0.0.1:8000/api/v1/categorias/{categoria}/subcategorias",
      "delete": "http://127.0.0.1:8000/api/v1/subcategorias/"
    },
    "moneda": {
      "get": "http://127.0.0.1:8000/api/v1/monedas",
      "put": "http://127.0.0.1:8000/api/v1/monedas/",
      "post": "http://127.0.0.1:8000/api/v1/monedas",
      "delete": "http://127.0.0.1:8000/api/v1/monedas/"
    },
    "pago": {
      "get": "http://127.0.0.1:8000/api/v1/pagos",
      "put": "http://127.0.0.1:8000/api/v1/pagos/",
      "post": "http://127.0.0.1:8000/api/v1/pagos",
      "delete": "http://127.0.0.1:8000/api/v1/pagos/"
    },
    "perfil": {
      "get": "http://127.0.0.1:8000/api/v1/perfiles",
      "put": "http://127.0.0.1:8000/api/v1/perfiles/",
      "post": "http://127.0.0.1:8000/api/v1/perfiles",
      "delete": "http://127.0.0.1:8000/api/v1/perfiles/"
    },
    "notificacion": {
      "get": "http://127.0.0.1:8000/api/v1/notificaciones",
      "put": "http://127.0.0.1:8000/api/v1/notificaciones/",
      "post": "http://127.0.0.1:8000/api/v1/notificaciones",
      "delete": "http://127.0.0.1:8000/api/v1/notificaciones/"
    },
    "tarifa": {
      "get": "http://127.0.0.1:8000/api/v1/tarifas",
      "put": "http://127.0.0.1:8000/api/v1/tarifas/",
      "post": "http://127.0.0.1:8000/api/v1/tarifas",
      "delete": "http://127.0.0.1:8000/api/v1/tarifas/"
    },
    "servicio": {
      "get": "http://127.0.0.1:8000/api/v1/servicios",
      "put": "http://127.0.0.1:8000/api/v1/servicios/",
      "post": "http://127.0.0.1:8000/api/v1/servicios",
      "delete": "http://127.0.0.1:8000/api/v1/servicios/"
    },
    "factura": {
      "get": "http://127.0.0.1:8000/api/v1/facturas",
      "put": "http://127.0.0.1:8000/api/v1/facturas/",
      "post": "http://127.0.0.1:8000/api/v1/facturas",
      "delete": "http://127.0.0.1:8000/api/v1/facturas/"
    },
    "usuario": {
      "get": "http://127.0.0.1:8000/api/v1/usuarios",
      "put": "http://127.0.0.1:8000/api/v1/usuarios/",
      "post": "http://127.0.0.1:8000/api/v1/usuarios",
      "delete": "http://127.0.0.1:8000/api/v1/usuarios/"
    },
    "comentario": {
      "get": "http://127.0.0.1:8000/api/v1/comentarios",
      "put": "http://127.0.0.1:8000/api/v1/comentarios/",
      "post": "http://127.0.0.1:8000/api/v1/comentarios",
      "delete": "http://127.0.0.1:8000/api/v1/comentarios/"
    },
    "retiro": {
      "get": "http://127.0.0.1:8000/api/v1/retiros",
      "put": "http://127.0.0.1:8000/api/v1/retiros/",
      "post": "http://127.0.0.1:8000/api/v1/usuarios/{id}/retiros",
      "delete": "http://127.0.0.1:8000/api/v1/retiros/"
    },
    "paymentez": {
      "get": "http://127.0.0.1:8000/api/v1/paymentez",
      "put": "http://127.0.0.1:8000/api/v1/paymentez/",
      "post": "http://127.0.0.1:8000/api/v1/usuarios/{id}/paymentez",
      "delete": "http://127.0.0.1:8000/api/v1/paymentez/"
    },
    "denuncia": {
      "get": "http://127.0.0.1:8000/api/v1/denuncias",
      "put": "http://127.0.0.1:8000/api/v1/denuncias/",
      "post": "http://127.0.0.1:8000/api/v1/usuarios/{id}/denuncias",
      "delete": "http://127.0.0.1:8000/api/v1/denuncias/"
    },
    "contrato": {
      "get": "http://127.0.0.1:8000/api/v1/contratos",
      "put": "http://127.0.0.1:8000/api/v1/contratos/",
      "post": "http://127.0.0.1:8000/api/v1/contratos",
      "delete": "http://127.0.0.1:8000/api/v1/contratos/"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
