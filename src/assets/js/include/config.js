/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/include/conf.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/

var Config = function () {
    
    var authorization = {
        "token": "Bearer 0bea591255R05M04A08Xc9c68c53f2020a"
    };

    var pathname = {
        "categoria": {
            "get": "http://127.0.0.1:8000/api/v1/categorias",
            "put": "http://127.0.0.1:8000/api/v1/categorias/",
            "post": "http://127.0.0.1:8000/api/v1/categorias",
            "delete": "http://127.0.0.1:8000/api/v1/categorias/"
        },
        "subcategoria": {
            "get": "http://127.0.0.1:8000/api/v1/categorias/{categoria}/subcategorias",
            "get1": "http://127.0.0.1:8000/api/v1/subcategorias",
            "post": "http://127.0.0.1:8000/api/v1/categorias/{categoria}/subcategorias",
            "put": "http://127.0.0.1:8000/api/v1/subcategorias/",
            "delete": "http://127.0.0.1:8000/api/v1/subcategorias/"
        },
        "moneda": {
            "get": "http://127.0.0.1:8000/api/v1/monedas",
            "post": "http://127.0.0.1:8000/api/v1/monedas",
            "put": "http://127.0.0.1:8000/api/v1/monedas/",
            "delete": "http://127.0.0.1:8000/api/v1/monedas/"
        },
        "pago": {
            "get": "http://127.0.0.1:8000/api/v1/pagos",
            "post": "http://127.0.0.1:8000/api/v1/pagos",
            "put": "http://127.0.0.1:8000/api/v1/pagos/",
            "delete": "http://127.0.0.1:8000/api/v1/pagos/",
        },
        "perfil":{
            "get": "http://127.0.0.1:8000/api/v1/perfiles",
            "put": "http://127.0.0.1:8000/api/v1/perfiles/",
            "deletet": "http://127.0.0.1:8000/api/v1/perfiles/"
        },
        "notificacion": {
            "get": "http://127.0.0.1:8000/api/v1/notificaciones",
            "put": "http://127.0.0.1:8000/api/v1/notificaciones/",
            "delete": "http://127.0.0.1:8000/api/v1/notificaciones/"
        },
        "tarifa": {
            "get": "http://127.0.0.1:8000/api/v1/tarifas",
            "post": "http://127.0.0.1:8000/api/v1/tarifas",
            "put": "http://127.0.0.1:8000/api/v1/tarifas/",
            "delete": "http://127.0.0.1:8000/api/v1/tarifas/"
        },
        "usuario": {
            "get": "http://127.0.0.1:8000/api/v1/usuarios",
            "post": "http://127.0.0.1:8000/api/v1/usuarios/login",
            "put": "http://127.0.0.1:8000/api/v1/usuarios/",
            "delete": "http://127.0.0.1:8000/api/v1/usuarios/"
        },
        "servicio":{
            "get": "http://127.0.0.1:8000/api/v1/servicios/{subcategoria}",
            "get1": "http://127.0.0.1:8000/api/v1/usuarios/{usuario}/servicios",
            "get2": "http://127.0.0.1:8000/api/v1/servicios",
            "post": "http://127.0.0.1:8000/api/v1/usuarios/{usuario}/servicios",
            "put": "http://127.0.0.1:8000/api/v1/servicios/",
            "delete": "http://127.0.0.1:8000/api/v1/servicios/"
        },
        "factura":{
            "get": "http://127.0.0.1:8000/api/v1/facturas",
            "get1": "http://127.0.0.1:8000/api/v1/usuarios/{usuario}/facturas",
            "delete": "http://127.0.0.1:8000/api/v1/facturas/"
        },
        "comentario":{
            "get": "http://127.0.0.1:8000/api/v1/comentarios",
            "delete": "http://127.0.0.1:8000/api/v1/comentarios/"
        }
    };

    function initialize() {

    }

    return {
        init: initialize,
        pathname: pathname,
        authorization: authorization
    };

};

var config;

$(document).ready(function () {

    if (typeof config === 'undefined') {

        config = new Config();

        config.init();
    }
});

