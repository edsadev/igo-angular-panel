/*
 *    Sistema    : 
 *    Description: 
 *    
 * 
 *    @package IGo
 *    @version 1.0
 *    @since 1.0 15/07/2020, 08:46:03
 *    @copyright (c) syftedesigns 2020, @OttoValera 15/07/2020
 *    @file ~/freelife/public/js/include/language/message.js
 *    @author Jonathan Valera <otto.valera@gmail.com>
 *    @see http://syftedesigns.com/ para mas documentación
 *
 **/
var message = {
        
    paisIso:{
        created:{
            201:"El país y sus terminales han sido creados",
            message:"La solicitud ha sido procesada y ha resultado en la creación del nuevo recurso"
        },
        accepted:{
            202:"El país y sus terminales han sido actualizados",
            message:"La petición ha sido aceptada para procesamiento. La petición eventualmente pudiere no ser satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar"
        },
        conflict:{
            409:"Datos erroneos",
            message:"La solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica"
        },
        internalServerError:{
            
            500:"Error en el servidor",
            message:"Ha ocurrido un error en el servidor"
        },
        notFound:{
            404: "El país no esta agregado ni tiene terminales asociados",
            message: "Agregue un terminal para el país"
        }
        
    }
};


