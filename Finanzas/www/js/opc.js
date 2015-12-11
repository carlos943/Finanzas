function tomarfoto() {
    var switchFoto = $("#tomarFoto");
    var cuadroFoto = $("#fotoTomada");
    if (switchFoto.val() == "si") {
        cuadroFoto.css({
            "display": "block",
            "text-align":"center"
        });
    } else {
        cuadroFoto.css({
            "display": "none"
        });
    }
}

function guardarubicacion() {
    var switchUbicacion = $("#guardarUbicacion");
    var cuadroUbicacion = $("#ubicacion");
    if (switchUbicacion.val() == "si") {
        cuadroUbicacion.css({
            "display": "block"
        });
    } else {
        cuadroUbicacion.css({
            "display": "none"
        });
    }
}

function actualizarFecha() {
    $("#fecha").val($("#calendario").val());

}

$(function() {

    
    
    //cajas de tomar foto y localizacion
    $("#fotoTomada").css({"display": "none"});
    $("#ubicacion").css({"display": "none"});
    
    //boton de ingreso en el menu
    $("#a1").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a1").css({
        "unselectable": "on"
    });


    //boton de egreso en el menu
    $("#a2").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a2").css({
        "unselectable": "on"
    });


    //boton de recordatorio en el menu
    $("#a3").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a3").css({
        "unselectable": "on"
    });

    //boton de balance en el menu
    $("#a4").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a4").css({
        "unselectable": "on"
    });
    
    $("#a5").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a5").css({
        "unselectable": "on"
    });
    
    $("#a6").css({
        "background-color": "#2AD",
        "border-color": "#2AD",
        "color": "#FFF",
        "text-shadow": "0px 1px 0px #08B",
        "cursor": "pointer"
    });

    $("#a6").css({
        "unselectable": "on"
    });

});