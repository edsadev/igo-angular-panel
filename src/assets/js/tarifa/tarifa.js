/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/tarifa/tarifa.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/
/* global moment, login, config */

var Tarifa = function () {

    //cache DOM
    var $layout = $('div.tarifa');
    var $menu = $("#menu-tarifa");
//    var $agregar = $layout.find('button[type="submit"]');
    var $form = $layout.find('form');
    var $cancelar = $layout.find('button[type="reset"]');
    var $table = $layout.find('table');
    var $dataTable = $table.DataTable();

    //bind Event
    $menu.on("click", _get);
//    $agregar.on("click", _insert);
    $cancelar.on("click", _cancelar);
    $table.on("click", "button.delete-row-btn", _delete);
    $table.on("click", "button.update-row-btn", _form);

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
            descripcion: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Introduzca la descripción de la notificación'
                    },
                    stringLength: {
                        message: 'La descripción de la notificación debe tener máximo 50 carateres'
                    },
                    blank: {}
                }
            },
            tarifa: {
                verbose: false,
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Introduzca el monto de la tarifa'
                    },
                    numeric: {
                        message: 'El valor no es numérico. Ej: 1.214,20',
                        // The default separators
                        thousandsSeparator: '.',
                        decimalSeparator: ','
                    },
                    callback: {
                        message: 'El monto debe ser mayor a cero',
                        callback: function (value, validator, $field) {

                            return !(Number(String(value).replace(/\./g, "").replace(",", ".")) <= 0);
                        }
                    },
                    blank: {}
                }
            },
            estatus: {
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

    function _cancelar(event) {
        var $form = $(event.target).parents("form");
        $form.find('input:hidden').val("");
    }

    function _form(event) {

        event.preventDefault();

        var $btn = $(this);
//        var $form = $agregar.parents("form");
        var $input = $form.find('input');
        var $select = $form.find('select');

        $table.find("tr").removeClass("selected");

        $btn.parents("tr").addClass("selected");

        $input.each(function (index, element) {

            var $elemt = $(this);

            if ($elemt.hasClass("decimal")) {

                $elemt.val(Number($btn.data($elemt.attr("name"))).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+\,)/g, "$1."));
            } else {
                $elemt.val($btn.data($elemt.attr("name")));
            }

        });

        $select.children("option").each(function (index, element) {

            var $elemt = $(this);

            if ($btn.data($elemt.parent().attr("name")) == $elemt.val()) {

                $elemt.prop("selected", true);

                return false;
            }

        });
    }

    function _get(event) {

        event.preventDefault();

        var HTTPMethod = "GET";
        var datos = new Object();
        var $button = $(this);
        var statusCode = {
            400: function () {
                console.log("Error 400");
            }
        };
        var headers = {
            'Authorization': config.authorization.token
        };
        var $content = $('.container-fluid').children(':visible');
        var beforeSend = function (xhr) {
            $dataTable.clear();
            $button.addClass("disabled");
            $content.addClass("d-none");
        };

        var resquest = ajax(config.pathname.tarifa.get, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            if (result.data.length > 0) {

                for (var key in result.data) {

                    $dataTable.row.add([
                        result.data[key].id,
                        result.data[key].nombre,
                        result.data[key].descripcion,
                        result.data[key].tarifa,
                        result.data[key].estatus,
                        moment(String(result.data[key].created_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        moment(String(result.data[key].updated_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline delete-row-btn" data-toggle="tooltip" data-original-title="Delete" data-href="' + config.pathname.tarifa.delete + result.data[key].id + '"><i class="ti-close" aria-hidden="true"></i></button>'
                                + '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline update-row-btn" data-toggle="tooltip" data-original-title="Modificar" '
                                + 'data-id="' + result.data[key].id + '"'
                                + 'data-nombre="' + result.data[key].nombre + '"'
                                + 'data-descripcion="' + result.data[key].descripcion + '"'
                                + 'data-tarifa="' + result.data[key].tarifa + '"'
                                + 'data-estatus="' + result.data[key].estatus + '"'
                                + '>'
                                + '<i class="ti-pencil-alt" aria-hidden="true"></i></button>'
                    ]);
                }
            }

            $layout.removeClass("d-none");

//            window.history.pushState({},"", $button.data("href"));

        }).fail(function (jqXHR, textStatus, errorThrown) {

        }).always(function (jqXHR, textStatus, data) {

            $dataTable.draw();
            $button.removeClass("disabled");
        });

    }

    function _insert(event) {

        event.preventDefault();

//        var $form = $(event.target).parents("form");
        var $form = $(event.target);
        var $agregar = $form.find('button[type="submit"]');
        var $id = $form.find('input:hidden');
        var HTTPMethod = $id.val() === '' ? "POST" : "PUT";
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

        var $input = $form.find('input');
        var $select = $form.find('select');

        $input.each(function (index, element) {

            var $elemt = $(this);

            if ($elemt.hasClass("decimal")) {

                datos[$elemt.attr("name")] = Number(String($elemt.val()).replace(/\./g, "").replace(",", "."));
            } else {
                datos[$elemt.attr("name")] = $elemt.val();
            }

        });

        $select.children("option:selected").each(function (index, element) {

            var $elemt = $(this);

            datos[$elemt.parent().attr("name")] = $elemt.val();
        });

        var resquest = ajax($id.val() === '' ? config.pathname.tarifa.post : config.pathname.tarifa.put + $id.val(), datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            $dataTable.row(".selected").remove();

            $dataTable.row.add([
                result.id,
                result.nombre,
                result.descripcion,
                result.tarifa,
                result.estatus,
                moment(String(result.created_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                moment(String(result.updated_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline delete-row-btn" data-toggle="tooltip" data-original-title="Delete" data-href="' + config.pathname.tarifa.delete + result.id + '"><i class="ti-close" aria-hidden="true"></i></button>'
                        + '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline update-row-btn" data-toggle="tooltip" data-original-title="Modificar" '
                        + 'data-id="' + result.id + '"'
                        + 'data-nombre="' + result.nombre + '"'
                        + 'data-descripcion="' + result.descripcion + '"'
                        + 'data-tarifa="' + result.tarifa + '"'
                        + 'data-estatus="' + result.estatus + '"'
                        + '>'
                        + '<i class="ti-pencil-alt" aria-hidden="true"></i></button>'
            ]);

            $dataTable.draw();

        }).fail(function (jqXHR, textStatus, errorThrown) {

        }).always(function (jqXHR, textStatus, data) {

            $agregar.attr("disabled", false);
            $agregar.text("Enviar");
//            $form.trigger("reset");
            $form.data('formValidation').resetForm(true);
            $cancelar.click();
        });
    }

    function _delete(event) {

        event.preventDefault();

        var $btn = $(this);
        var HTTPMethod = "DELETE";
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

            $btn.attr("disabled", true);
        };
        var resquest = ajax($btn.data('href'), datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            $dataTable.row($btn.parents('tr')).remove();

            $dataTable.draw();

        }).fail(function (jqXHR, textStatus, errorThrown) {

        }).always(function (jqXHR, textStatus, data) {

        });
    }

    return {
        init: initialize
    };
};

var tarifa;

$(document).ready(function () {

    if (typeof tarifa === 'undefined') {

        tarifa = new Tarifa();

        tarifa.init();
    }
});
