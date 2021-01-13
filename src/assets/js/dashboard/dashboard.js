/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) Syftedesigs 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/dashboard/dashboard.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesings.com/ para mas documentación
 *
 **/

var Dashboard = function () {

    //cache DOM
    var $logout = $(".logout");
    var $usuario = $(".usuario");
    var $correo = $(".correo");
    var $direccion = $(".direccion");

    //bind Event
    $logout.on("click", _logout);

    function initialize() {

        if (window.localStorage.getItem('token') !== null) {

            $(document).on("mousemove", _token);
            
            var user = JSON.parse(window.localStorage.getItem('user'));
            
            $usuario.text(user.nombre);
            $correo.text(user.email);
            $direccion.text(user.direccion);
        }
    }

    function _logout(event) {

        event.preventDefault();

        window.localStorage.clear();
        $(document).off("mousemove", _token);
        $("#wrapper").removeClass("d-none");
        $("#main-wrapper").addClass("d-none");
    }
    ;

    function _token() {

        var token = window.localStorage.getItem('token');

        var decoded = jwt_decode(token);

        //    var date = new Date(decoded.iat * 1000);
        //// Hours part from the timestamp
        //    var hours = date.getHours();
        //// Minutes part from the timestamp
        //    var minutes = "0" + date.getMinutes();
        //// Seconds part from the timestamp
        //    var seconds = "0" + date.getSeconds();
        //
        //// Will display time in 10:30:23 format
        //    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        //
        //    console.log(formattedTime);
        //    
        var exp = new Date(decoded.exp * 1000);
        //// Hours part from the timestamp
        //    var hours = exp.getHours();
        //// Minutes part from the timestamp
        //    var minutes = "0" + exp.getMinutes();
        //// Seconds part from the timestamp
        //    var seconds = "0" + exp.getSeconds();
        //
        //// Will display time in 10:30:23 format
        //    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        //    
        //    console.log(formattedTime);

        if (new Date() > exp) {
            $logout.click();
        }
    }

    return {
        init: initialize
    };

};

var dashboard;

$(document).ready(function () {

    if (typeof dashboard === 'undefined') {

        dashboard = new Dashboard();

        dashboard.init();
    }
});
