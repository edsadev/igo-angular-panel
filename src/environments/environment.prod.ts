export const environment = {
  production: true,
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
      "post": "https://igoapp.live/freelife/public/api/v1/usuarios/login"
    },
    "categoria": {
      "get": "https://igoapp.live/freelife/public/api/v1/categorias",
      "put": "https://igoapp.live/freelife/public/api/v1/categorias/",
      "post": "https://igoapp.live/freelife/public/api/v1/categorias",
      "delete": "https://igoapp.live/freelife/public/api/v1/categorias/"
    },
    "subcategoria": {
      "get": "https://igoapp.live/freelife/public/api/v1/subcategorias",
      "put": "https://igoapp.live/freelife/public/api/v1/subcategorias/",
      "post": "https://igoapp.live/freelife/public/api/v1/categorias/{categoria}/subcategorias",
      "delete": "https://igoapp.live/freelife/public/api/v1/subcategorias/"
    },
    "moneda": {
      "get": "https://igoapp.live/freelife/public/api/v1/monedas",
      "put": "https://igoapp.live/freelife/public/api/v1/monedas/",
      "post": "https://igoapp.live/freelife/public/api/v1/monedas",
      "delete": "https://igoapp.live/freelife/public/api/v1/monedas/"
    },
    "pago": {
      "get": "https://igoapp.live/freelife/public/api/v1/pagos",
      "put": "https://igoapp.live/freelife/public/api/v1/pagos/",
      "post": "https://igoapp.live/freelife/public/api/v1/pagos",
      "delete": "https://igoapp.live/freelife/public/api/v1/pagos/"
    },
    "perfil": {
      "get": "https://igoapp.live/freelife/public/api/v1/perfiles",
      "put": "https://igoapp.live/freelife/public/api/v1/perfiles/",
      "post": "https://igoapp.live/freelife/public/api/v1/perfiles",
      "delete": "https://igoapp.live/freelife/public/api/v1/perfiles/"
    },
    "notificacion": {
      "get": "https://igoapp.live/freelife/public/api/v1/notificaciones",
      "put": "https://igoapp.live/freelife/public/api/v1/notificaciones/",
      "post": "https://igoapp.live/freelife/public/api/v1/notificaciones",
      "delete": "https://igoapp.live/freelife/public/api/v1/notificaciones/"
    },
    "tarifa": {
      "get": "https://igoapp.live/freelife/public/api/v1/tarifas",
      "put": "https://igoapp.live/freelife/public/api/v1/tarifas/",
      "post": "https://igoapp.live/freelife/public/api/v1/tarifas",
      "delete": "https://igoapp.live/freelife/public/api/v1/tarifas/"
    },
    "servicio": {
      "get": "https://igoapp.live/freelife/public/api/v1/servicios",
      "put": "https://igoapp.live/freelife/public/api/v1/servicios/",
      "post": "https://igoapp.live/freelife/public/api/v1/servicios",
      "delete": "https://igoapp.live/freelife/public/api/v1/servicios/"
    },
    "factura": {
      "get": "https://igoapp.live/freelife/public/api/v1/facturas",
      "put": "https://igoapp.live/freelife/public/api/v1/facturas/",
      "post": "https://igoapp.live/freelife/public/api/v1/facturas",
      "delete": "https://igoapp.live/freelife/public/api/v1/facturas/"
    },
    "usuario": {
      "get": "https://igoapp.live/freelife/public/api/v1/usuarios",
      "put": "https://igoapp.live/freelife/public/api/v1/usuarios/",
      "post": "https://igoapp.live/freelife/public/api/v1/usuarios",
      "delete": "https://igoapp.live/freelife/public/api/v1/usuarios/"
    },
    "comentario": {
      "get": "https://igoapp.live/freelife/public/api/v1/comentarios",
      "put": "https://igoapp.live/freelife/public/api/v1/comentarios/",
      "post": "https://igoapp.live/freelife/public/api/v1/comentarios",
      "delete": "https://igoapp.live/freelife/public/api/v1/comentarios/"
    },
    "retiro": {
      "get": "https://igoapp.live/freelife/public/api/v1/retiros",
      "put": "https://igoapp.live/freelife/public/api/v1/retiros/",
      "post": "https://igoapp.live/freelife/public/api/v1/usuarios/{id}/retiros",
      "delete": "https://igoapp.live/freelife/public/api/v1/retiros/"
    },
    "paymentez": {
      "get": "https://igoapp.live/freelife/public/api/v1/paymentez",
      "put": "https://igoapp.live/freelife/public/api/v1/paymentez/",
      "post": "https://igoapp.live/freelife/public/api/v1/usuarios/{id}/paymentez",
      "delete": "https://igoapp.live/freelife/public/api/v1/paymentez/"
    },
    "reembolso": {
      "get": "https://igoapp.live/freelife/public/api/v1/usuarios/paymentez/token",
      "put": "https://igoapp.live/freelife/public/api/v1/usuarios/paymentez/reembolso/{usuario}",
      "post": "https://ccapi-stg.paymentez.com/v2/transaction/refund"
    },
    "denuncia": {
      "get": "https://igoapp.live/freelife/public/api/v1/denuncias",
      "put": "https://igoapp.live/freelife/public/api/v1/denuncias/",
      "post": "https://igoapp.live/freelife/public/api/v1/usuarios/{id}/denuncias",
      "delete": "https://igoapp.live/freelife/public/api/v1/denuncias/"
    },
    "contrato": {
      "get": "https://igoapp.live/freelife/public/api/v1/contratos",
      "put": "https://igoapp.live/freelife/public/api/v1/contratos/",
      "post": "https://igoapp.live/freelife/public/api/v1/contratos",
      "delete": "https://igoapp.live/freelife/public/api/v1/contratos/"
    }
  }
};
