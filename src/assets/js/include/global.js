/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigns 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/include/global.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesigns.com/ para mas documentación
 *
 **/

/* global login */

$(document).ready(function () {

    // if (window.localStorage.getItem('token') === null) {
    //     $("#wrapper").removeClass("d-none");
    //     $("#main-wrapper").addClass("d-none");
    // } else {

    //     $("#wrapper").addClass("d-none");
    //     $("#main-wrapper").removeClass("d-none");
    // }
//    if ( (typeof login === 'undefined' || login.usuario === null ) && window.location.pathname !== '/panel/login.html' ) {
//        
//    }
    $(document).ajaxError(messageError);
    
});

function ajax(URL, datos) {

    var type = 'POST';
    var headers = {};
    var dataType = 'json';
    var processData = true;
    var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    var async = true;
    var beforeSend = function (xhr) {
    };
    var statusCode = {
        200: function () {
            console.log("El statusCode200 esta vacio");
        },
        400: function () {
            console.log("El statusCode400 esta vacio");
        },
        401: function () {
            console.log("El statusCode401 esta vacio");
        },
        403: function () {
            console.log("El statusCode403 esta vacio");
        },
        404: function () {
            console.log("El statusCode404 esta vacio");
        },
        409: function () {
            console.log("El statusCode409 esta vacio");
        },
        415: function () {
            console.log("El statusCode415 esta vacio");
        }
    };

    if (arguments[2]) {

        beforeSend = arguments[2];
    }

    if (arguments[3]) {

        type = arguments[3];
    }

    if (typeof arguments[4] !== 'undefined') {

        processData = arguments[4];
    }

    if (arguments[5]) {
        //contentType = false;
        contentType = arguments[5];
    }

    if (arguments[6]) {

        dataType = arguments[6];
    }

    if (arguments[7]) {

        statusCode = arguments[7];
    }

    if (typeof arguments[8] !== 'undefined') {

        async = arguments[8];
    }

    if (typeof arguments[9] !== 'undefined') {

        headers = arguments[9];
    }

    return $.ajax({
        url: URL,
        headers: headers,
        type: type,
        dataType: dataType,
        cache: false,
        async: async,
        contentType: contentType,
        processData: processData,
        data: datos,
        beforeSend: beforeSend,
        statusCode: statusCode

    });
}

function messageError(event, jqXHR, settings, thrownError) {

    console.log(event);
    console.log(jqXHR);
    console.log(settings);
    console.log(thrownError);
    console.log("messageError");

}
