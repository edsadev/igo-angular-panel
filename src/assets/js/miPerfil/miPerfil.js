/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/miPerfil/miPerfil.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/
/* global moment, config */

var MiPerfil = function () {

    //cache DOM
    var $layout = $('div.mi-perfil');
    var $menu = $("a.mi-perfil");
    var $form = $layout.find('form');

    //bind Event
    $menu.on("click", _get);

    $form.formValidation({
        // I am validating Bootstrap form
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden', ':not(:visible)', 'input[alt="decimal"]'],
        err: {
            container: null//Este valor ya esta por defecto
        },
        // Feedback icons
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        addOns: {
            mandatoryIcon: {
                icon: 'fa fa-asterisk'
            }
        },
        // List of fields and their validation rules
        fields: {
            nombre: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Introduzca el nombre'
                    },
                    stringLength: {
                        message: 'El nombre debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            apellido: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Introduzca el apellido'
                    },
                    stringLength: {
                        message: 'El apellido debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            email: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Introduzca el correo'
                    },
                    stringLength: {
                        message: 'El correo debe tener máximo 50 carateres'
                    },
                    emailAddress: {
                        message: 'El correo no es válido'
                    },
                    blank: {}
                }
            },
            password: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    stringLength: {
                        message: 'La clave debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            direccion: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    stringLength: {
                        message: 'La dirección debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            latitud: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    stringLength: {
                        message: 'La latitud debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            longitud: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    stringLength: {
                        message: 'La longitud debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            roles: {
                verbose: false,
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: 'Seleccione el estatus'
                    },
                    blank: {}
                }
            }

        },
        onSuccess: _insert,
        onError: function (event) {
            console.log("valores sin validar bien");
        }
        // Add button click handler
        // Called after adding new field
    }).on('added.field.fv', function (e, data) {
        // data.field   --> The field name
        // data.element --> The new field element
        // data.options --> The new field options

        console.log("Se añade este elemento: " + data.field);
        // Called after removing the field
    }).on('removed.field.fv', function (e, data) {

        console.log("Se elimino este elemento: " + data.field);

    });

    function initialize() {

    }

    function _get(event) {

        event.preventDefault();

        var $content = $('.container-fluid').children(':visible');
        var user = JSON.parse(window.localStorage.getItem('user'));
        var $input = $form.find('input, textarea').not(':password');
        var $select = $form.find('select');

        $input.each(function (index, element) {

            var $elemt = $(this);

            $elemt.val(user[$elemt.attr("name")]);
        });

        for (var item in user.roles) {
            $select.append('<option value ="' + user.roles[item].id + '">' + user.roles[item].nombre + '</option>');
        }

        $content.addClass("d-none");
        $layout.removeClass("d-none");
    }

    function _insert(event) {

        event.preventDefault();

        var $form = $(event.target);
        var $agregar = $form.find('button[type="submit"]');
        var HTTPMethod = "PUT";
        var datos = new Object();
        var statusCode = {
            400: function () {
                console.log("Error 400");
            }
        };
        var headers = {
            'Authorization': window.localStorage.getItem('token')
        };
        var beforeSend = function () {

            $agregar.attr("disabled", true);
            $agregar.text("Enviando...");
        };
        var user = JSON.parse(window.localStorage.getItem('user'));
        var $input = $form.find('input');

        $input.each(function (index, element) {

            var $elemt = $(this);
            
            if( $elemt.val() !== '' && user[$elemt.attr("name")] !== $elemt.val()){
                datos[$elemt.attr("name")] = $elemt.val();
            }

        });

        var resquest = ajax(config.pathname.usuario.put + user.id, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            window.localStorage.setItem('user', JSON.stringify(result.user));

        }).fail(function (jqXHR, textStatus, errorThrown) {

        }).always(function (jqXHR, textStatus, data) {

            $agregar.attr("disabled", false);
            $agregar.text("Enviar");
        });
    }

    return {
        init: initialize
    };
};

var miPerfil;

$(document).ready(function () {

    if (typeof miPerfil === 'undefined') {

        miPerfil = new MiPerfil();

        miPerfil.init();
    }
});
