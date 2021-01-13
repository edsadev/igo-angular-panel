/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/login/login.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/

/* global dashboard, config */

var Login = function () {

    //cache DOM
    // var $login = $("#wrapper");
    // var $form = $login.find("form");
    // var $dashboard = $("#main-wrapper");
    // var $recover = $login.find(".to-recover");
    
    //bind Event
    // $recover.on("click", _hidden);

    // $form.eq(0).formValidation({
    //     // I am validating Bootstrap form
    //     framework: 'bootstrap',
    //     excluded: [':disabled', ':hidden', ':not(:visible)', 'input[alt="decimal"]'],
    //     err: {
    //         container: null//Este valor ya esta por defecto
    //     },
    //     // Feedback icons
    //     icon: {
    //         valid: 'fa fa-check',
    //         invalid: 'fa fa-times',
    //         validating: 'fa fa-refresh'
    //     },
    //     addOns: {
    //         mandatoryIcon: {
    //             icon: 'fa fa-asterisk'
    //         }
    //     },
    //     // List of fields and their validation rules
    //     fields: {
    //         usuario: {
    //             verbose: false,
    //             trigger: 'blur',
    //             validators: {
    //                 notEmpty: {
    //                     message: 'Introduzca un usuario o email'
    //                 },
    //                 stringLength: {
    //                     message: 'El usuario debe tener máximo 50 carateres'
    //                 },
    //                 blank: {}
    //             }
    //         },
    //         clave: {
    //             verbose: false,
    //             trigger: 'blur',
    //             validators: {
    //                 notEmpty: {
    //                     message: 'Introduzca una clave'
    //                 },
    //                 stringLength: {
    //                     message: 'La clave debe tener máximo 50 carateres'
    //                 },
    //                 blank: {}
    //             }
    //         }

    //     },
    //     onSuccess: _insert,
    //     onError: function (event) {
    //         console.log("valores sin validar bien");
    //     }
    //     // Add button click handler
    //     // Called after adding new field
    // }).on('added.field.fv', function (e, data) {
    //     // data.field   --> The field name
    //     // data.element --> The new field element
    //     // data.options --> The new field options

    //     console.log("Se añade este elemento: " + data.field);
    //     // Called after removing the field
    // }).on('removed.field.fv', function (e, data) {

    //     console.log("Se elimino este elemento: " + data.field);

    // });

    function initialize() {

    }
    
    function _hidden( event ) {

        event.preventDefault();
        console.log($form.eq(0).is(":hidden"));
        if($form.eq(0).is(":hidden")){
            $form.eq(1).fadeOut();
            $form.eq(0).slideDown();
        }else{
            $form.eq(0).slideUp();
            $form.eq(1).fadeIn();
        }
    }

    function _insert(event) {

        event.preventDefault();


        var HTTPMethod = "POST";
        var datos = new Object();
//        var $form = $(event.target).parents("form");
        var $form = $(event.target);
        var $button = $form.find('button[type="submit"]');
        var $input = $form.find('input');
        var datos = new Object();
        var $message = $form.nextAll(".alert");
        var statusCode = {
            400: function () {
                console.log("Error 400");
            }
        };


        var beforeSend = function () {
            $button.attr("disabled", true);
            $button.text("Enviando...");
        };

        $input.each(function (index, element) {

            var $elemt = $(this);

            datos[$elemt.attr("name")] = $elemt.val();
        });

        var resquest = ajax( config.pathname.usuario.post, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode);

        resquest.done(function (result, textStatus, jqXHR) {
            
            window.localStorage.setItem('user', JSON.stringify(result.user));
            window.localStorage.setItem('token', result.token);

            $login.addClass("d-none");
            $dashboard.removeClass("d-none");

            dashboard.init();

        }).fail(function (jqXHR, textStatus, errorThrown) {
            
            $message.text(jqXHR.responseJSON.message);
            $message.fadeIn().delay( 2000 ).fadeOut();

        }).always(function (jqXHR, textStatus, data) {

            $button.attr("disabled", false);
            $button.text("Entrar");
//            $form.get(0).reset();
            $form.data('formValidation').resetForm(true);

        });
    }

    return {
        init: initialize
    };

};

var login;

$(document).ready(function () {

    if (typeof login === 'undefined') {

        login = new Login();

        login.init();
    }
    
    $(".preloader").fadeOut();
    $('[data-toggle="tooltip"]').tooltip();


});
