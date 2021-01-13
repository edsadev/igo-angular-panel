/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/usuario/usuario.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/
/* global moment, login, config */

var Usuario = function () {

    //cache DOM
    var $layout = $('div.l-usuario');
    var $menu = $("#menu-l-usuario");
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
        
        _addElement(config.authorization.token, config.pathname.perfil.get, $select.eq(0));
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
        var path = config.pathname.usuario.get;
        
        if( $select.children('option:selected').index() > 0 ) {
            path += "?roles_id=" + $select.children('option:selected').val();
        }
        
        var resquest = ajax(path, datos, beforeSend, HTTPMethod, true, 'application/x-www-form-urlencoded; charset=UTF-8', 'json', statusCode, true, headers);

        resquest.done(function (result, textStatus, jqXHR) {

            if (result.data.length > 0) {

                for (var key in result.data) {

                    $dataTable.row.add([
                        result.data[key].id,
                        result.data[key].nombre,
                        result.data[key].apellido,
                        result.data[key].email,
                        result.data[key].direccion,
                        result.data[key].latitud,
                        result.data[key].longitud,
                        result.data[key].roles[0].nombre,
                        result.data[key].estatus,
                        moment(String(result.data[key].created_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        moment(String(result.data[key].updated_at).toLocaleLowerCase(), "YYYY-MM-DD").format("DD-MM-YYYY"),
                        '<button type="button" class="btn btn-sm btn-icon btn-pure btn-outline delete-row" data-toggle="tooltip" data-original-title="Delete" data-href="' + config.pathname.usuario.delete + result.data[key].id + '"><i class="ti-close" aria-hidden="true"></i></button>'
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

var usuario;

$(document).ready(function () {

    if (typeof usuario === 'undefined') {

        usuario = new Usuario();

        usuario.init();
    }
});
