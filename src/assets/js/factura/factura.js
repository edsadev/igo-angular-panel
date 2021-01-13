/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/factura/factura.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/
/* global moment, login, config */

var Factura = function () {

    //cache DOM
    var $layout = $('div.factura');
    var $menu = $("#menu-factura");
    var $table = $layout.find('table');
    var $dataTable = $table.DataTable();
    var $select = $layout.find('select');

    //bind Event
    $menu.on("click", _get);
    $table.on("click", "button.delete-row", _delete);
    $select.on("change", _getElement);

    function initialize() {

    }

    function _get(event) {

        event.preventDefault();

        var $button = $(this);
        
        _addElement(window.localStorage.getItem('token'), config.pathname.usuario.get, $select.eq(0));
    }
    
    function _addElement(authorization, path, $select){
        
        var HTTPMethod = "GET";
        var datos = new Object();
        var statusCode = {
            400: function () {

                console.log("Subcategoría");
            }
        };
        var headers = {
            'Authorization': authorization
        };
        var $content = $('.container-fluid').children(':visible');
        var beforeSend = function (xhr) {
            $select.children('option').remove();
            $select.append('<option value ="">SELECCIONE</option>');
            $content.addClass("d-none");
        };
        
        $select.change();
        
        var resquest = ajax( path, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            if (result.data.length > 0) {
                
                for (var key in result.data) {

                    $select.append('<option value ="' + result.data[key].id + '">' + result.data[key].id + " - " + result.data[key].nombre + '</option>');
                }
                
            }
            
            $layout.removeClass("d-none");

//            window.history.pushState({},"", $button.data("href"));

        }).fail(function (jqXHR, textStatus, errorThrown) {

        }).always(function (jqXHR, textStatus, data) {

        });
    }

    function _getElement(event) {
        
        var HTTPMethod = "GET";
        var datos = new Object();
        var $form = $(event.target).parents("form");
        var $selects = $form.find("select");
        var $select = $(this);
        var statusCode = {
            400: function () {
                console.log("Categoría");
            }
        };
        
        var headers = {
            'Authorization': window.localStorage.getItem('token')
        };
        var beforeSend = function (xhr) {
            $dataTable.clear();
        };
        var path;
        
        if($selects.index($select) === 0 && $select.children('option:selected').index() > 0){
            path = String(config.pathname.factura.get1).replace(/{usuario}/i, $select.children("option:selected").val());
        }else{
            path = config.pathname.factura.get;
        }

        var resquest = ajax(path, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            if (result.data.length > 0) {

                for (var key in result.data) {

                    $dataTable.row.add([
                        result.data[key].id,
                        result.data[key].monto,
                        result.data[key].montoTotal,
                        result.data[key].cantidad,
                        result.data[key].concepto,
                        result.data[key].usuario.nombre,
                        result.data[key].formaPago.nombre,
                        result.data[key].moneda.moneda_iso,
                        result.data[key].tarifa.nombre,
                        result.data[key].contrato.id,
                        moment(String(result.data[key].created_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        moment(String(result.data[key].updated_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline delete-row" data-toggle="tooltip" data-original-title="Delete" data-href="' + config.pathname.factura.delete + result.data[key].id + '"><i class="ti-close" aria-hidden="true"></i></button>'
                    ]);

                }

            }
//            window.history.pushState({},"", $button.data("href"));

        }).fail(function (jqXHR, textStatus, errorThrown) {


        }).always(function (jqXHR, textStatus, data) {

            $dataTable.draw();
        });

    }

    function _delete(event) {

        event.preventDefault();

        var $btn = $(this);
        var HTTPMethod = "DELETE";
        var datos = new Object();
        var statusCode = {
            400: function () {
                console.log("Categoría");
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

var factura;

$(document).ready(function () {

    if (typeof factura === 'undefined') {

        factura = new Factura();

        factura.init();
    }
});
