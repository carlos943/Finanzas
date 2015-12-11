var db = null;
var sesion = null;

document.addEventListener("deviceready", function() {
    db = window.openDatabase("Finanzas", "1.0", "Finanzas", 200000);
    //alert("si pasa");
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS usuario (nombre text primary key, usuario text,contrasena text)");
        //QUITAR ESTA LINEA
        //tx.executeSql('DROP TABLE IF EXISTS balance');
        //
        tx.executeSql("CREATE TABLE IF NOT EXISTS balance (usuario text , cantidad )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS ingreso (usuario text , cantidad , descripcion text )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS egreso (usuario text , cantidad , descripcion text )");
        tx.executeSql("CREATE TABLE IF NOT EXISTS recordatorio (usuario, fecha, descripcion )");

    }, function(err) {
        alert("Ocurrio un error");
    });


}, false);

var watchID = null;

document.addEventListener("deviceready", iniciaAcelerometro, false);

function iniciaAcelerometro() {
    startWatch();
}

function startWatch() {
    var options = {
        frequency: 500
    };
    watchID = navigator.accelerometer.watchAcceleration(exitoAccel, errorAccel, options);
}

function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}



function exitoAccel(acceleration) {



    var valor1 = acceleration.x;

    if (valor1 > 6) {
        window.history.back();
    }

}

function errorAccel() {
    alert('onError!');
}
// Populate the database 
//
document.addEventListener("volumedownbutton", onVolumeDown, false);
document.addEventListener("volumeupbutton", onVolumeUp, false);


function onVolumeUp() {
    var ultimoAncho = parseInt($("#chartdiv").css("width"));
    var ultimoLargo = parseInt($("#chartdiv").css("height"));

    $("#chartdiv").remove();

    $("#prueba").append(" <div id='chartdiv' style='height:400px;width:300px; overflow: scroll;'></div>");

    $("#chartdiv").css("width", (parseInt(ultimoAncho) + 20) + "px");
    $("#chartdiv").css("height", (parseInt(ultimoLargo) + 20) + "px");

    var ultimoAncho = parseInt($("#chartdiv").css("width"));
    var ultimoLargo = parseInt($("#chartdiv").css("height"));

    cargarBalance();
}

function onVolumeDown() {
    var ultimoAncho = parseInt($("#chartdiv").css("width"));
    var ultimoLargo = parseInt($("#chartdiv").css("height"));

    $("#chartdiv").remove();

    $("#prueba").append(" <div id='chartdiv' style='height:400px;width:300px; overflow: scroll;'></div>");

    $("#chartdiv").css("width", (parseInt(ultimoAncho) - 20) + "px");
    $("#chartdiv").css("height", (parseInt(ultimoLargo) - 20) + "px");

    var ultimoAncho = parseInt($("#chartdiv").css("width"));
    var ultimoLargo = parseInt($("#chartdiv").css("height"));

    cargarBalance();
}


function check_login() {
    event.preventDefault(); // cancel default behavior
    var username = $("#username").val();
    var password = $("#password").val();
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS sesion');
        tx.executeSql("CREATE TABLE IF NOT EXISTS sesion (usuario)");
        tx.executeSql("INSERT INTO sesion (usuario) VALUES (?)", [username], function(tx, res) {
            //alert("sesion agregado");
        });
    });


    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM USUARIO WHERE usuario=? AND contrasena=?', [username, password], function(tx, results) {
            if (results.rows.length > 0) {


                window.location = "balance.html";
            } else {
                alert("Invalid username or password");
            }
        }, errorCB);
    });
}



// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}


//put JS code here
function add() {
    // var name = document.getElementById("name").value;
    // var text = document.getElementById("note-text").value;

    var nombre = document.getElementById("nombre").value;
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var balance = document.getElementById("balance").value;
    var fecha = new Date();
    //var cadenafecha=fecha.getDate()+"/"+fecha.getMonth()+1;
    var cadenafecha = "cadena de prueba";

    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO usuario (nombre, usuario, contrasena) VALUES (?,?,?)", [nombre, usuario, contrasena], function(tx, res) {
            alert("Usuario agregado");
        });
    }, function(err) {
        alert("Ocurrio un error");
    });

    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO balance (usuario, cantidad) VALUES (?,?)", [usuario, balance], function(tx, res) {
            alert("Balance agregado");
        });
    }, function(err) {
        alert("Ocurrio un error");
    });

}

function obtenerIngresosTabla() {
	
    var tablaIngreso = document.getElementById('tablaIngresos');

    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM ingreso where usuario=?', [sesion], function(tx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                //arr.push(res.rows.item(i).cantidad);
                //alert(res.rows.item(i).descripcion);
                tablaIngreso.innerHTML+="<tr>"+
                      "<td>"+res.rows.item(i).descripcion+"</td>"+
                        "<td>"+res.rows.item(i).cantidad+"</td>"+
                       "</tr>";
            }

        }, function(err) {
            alert("An error occured while saving the note");
        });
    });
}

function obtenerEgresosTabla() {
    var tablaIngreso = document.getElementById('tablaEgresos');

    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM egreso where usuario=?', [sesion], function(tx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                //arr.push(res.rows.item(i).cantidad);
                tablaIngreso.append+="<tr>"+
                       "<td>"+res.rows.item(i).descripcion+"</td>"+
                        "<td>"+res.rows.item(i).cantidad+"</td>"+
                        "</tr>";
            }

        }, function(err) {
            alert("An error occured while saving the note");
        });
    });
}
      

        



function obtenerSesion() {

    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM sesion', [], function(tx, results) {
            sesion = results.rows.item(0).usuario;
            document.getElementById("sesion").innerHTML = sesion;

        }, errorCB);
    });
}

function registrarIngreso() {
    obtenerSesion();
    var cantidadAnterior = "";
    var cantidadNueva = null;
    var descripcion = document.getElementById("descripcion").value;
    var cantidad = document.getElementById("cantidad").value;
    var fecha = new Date();
    //var cadenafecha=fecha.getDate()+"/"+fecha.getMonth()+1;
    var cadenafecha = "prueba";
    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO ingreso (usuario, cantidad, descripcion) VALUES (?,?,?)", [sesion, cantidad, descripcion], function(tx, res) {
            alert("ingreso agregado");
        });
    }, function(err) {
        alert("Ocurrio un error");
    });


    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM balance where usuario=?', [sesion], function(tx, results) {
            //for (var i=0; i < ; i++) {
            alert(results.rows.item(results.rows.length - 1).cantidad);
            var anterior = results.rows.item(results.rows.length - 1).cantidad;

            cantidadNueva = parseInt(anterior) + parseInt(cantidad);

            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO balance (usuario, cantidad) VALUES (?,?)", [sesion, cantidadNueva], function(tx, res) {

                    alert("ahora tienes " + cantidadNueva);
                });
            }, function(err) {
                alert("Ocurrio un error");
            });

            //cantidadAnterior=results.rows.item(0).cantidad;
        }, errorCB);
    });




}

function registrarEgreso() {
    obtenerSesion();
    var cantidadAnterior = "";
    var cantidadNueva = null;
    var descripcion = document.getElementById("descripcion").value;
    var cantidad = document.getElementById("cantidad").value;
    var fecha = new Date();
    //var cadenafecha=fecha.getDate()+"/"+fecha.getMonth()+1;
    var cadenafecha = "prueba";
    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO egreso (usuario, cantidad, descripcion) VALUES (?,?,?)", [sesion, cantidad, descripcion], function(tx, res) {
            //alert("ingreso agregado");
        });
    }, function(err) {
        alert("Ocurrio un error");
    });


    db.transaction(function(tx) {

        tx.executeSql('SELECT * FROM balance where usuario=?', [sesion], function(tx, results) {
            //for (var i=0; i < ; i++) {
            alert(results.rows.item(results.rows.length - 1).cantidad);
            var anterior = results.rows.item(results.rows.length - 1).cantidad;

            cantidadNueva = parseInt(anterior) - parseInt(cantidad);

            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO balance (usuario, cantidad) VALUES (?,?)", [sesion, cantidadNueva], function(tx, res) {

                    alert("Ahora tienes " + cantidadNueva);
                });
            }, function(err) {
                alert("Ocurrio un error");
            });

            //cantidadAnterior=results.rows.item(0).cantidad;
        }, errorCB);
    });

}


function cargarBalance() {


    var arr = [];
    var matriz = [];
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM balance where usuario=?', [sesion], function(tx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                arr.push(res.rows.item(i).cantidad);
            }
            //lert(arr);
            /// AQUI VA LA GRAFICA
            matriz = new Array(arr.length);
            for (i = 0; i < arr.length; i++) {
                matriz[i] = new Array(2);
                for (j = 0; j < 1; j++) {
                    matriz[i][j] = i + 1;
                    matriz[i][j + 1] = arr[i];

                }
            }
            //alert(matriz);

            $.jqplot('chartdiv', [matriz], {
                title: 'Balance del dia'
            });
        });
    }, function(err) {
        alert("Ocurrio un error");
    });
}

function agregarRecordatorio() {
    obtenerSesion();
    var descripcion = document.getElementById("descripcion").value;
    var fecha = document.getElementById("fecha").value;

    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO recordatorio (usuario, fecha, descripcion) VALUES (?,?,?)", [sesion, fecha, descripcion], function(tx, res) {

            alert("Recordatorio agregado");
        });
    }, function(err) {
        alert("Ocurrio un error");
    });

    cordova.plugins.notification.local.schedule({
        id: 2,
        //title      : 'I will bother you every minute',
        title: descripcion,
        //sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
        at: new Date(new Date().getTime() + 5 * 1000)
    });

    // cordova.plugins.notification.local.schedule({
    // id: 1,
    // text: descripcion,
    // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf'
//     
// });

}

var watchID = null;

document.addEventListener("deviceready", iniciaAcelerometro, false);

function iniciaAcelerometro() {
    startWatch();
}

function startWatch() {
    var options = {
        frequency: 500
    };
    watchID = navigator.accelerometer.watchAcceleration(exitoAccel, errorAccel, options);
}

function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}



function exitoAccel(acceleration) {



    var valor1 = acceleration.x;

    if (valor1 > 6) {
        window.history.back();
    }

}

function errorAccel() {
    alert('onError!');
}





