           var db = null;
           var sesion=null;

document.addEventListener("deviceready", function(){
    db = window.openDatabase("Finanzas", "1.0", "Finanzas", 200000);
    //alert("si pasa");
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS usuario (nombre text primary key, usuario text,contrasena text)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS balance (usuario text , cantidad integer)");
        
    }, function(err){
        alert("An error occurred while initializing the app");
    });
}, false);

    // Populate the database 
    //
 
    
    function check_login() {
        event.preventDefault(); // cancel default behavior
        var username = $("#username").val();
        var password = $("#password").val();
        db.transaction(function(tx) {
           
            tx.executeSql('SELECT * FROM USUARIO WHERE usuario=? AND contrasena=?', [username, password], function(tx, results) {
                 if (results.rows.length > 0) {
                 	tx.executeSql('DROP TABLE IF EXISTS sesion');
                 	tx.executeSql("CREATE TABLE IF NOT EXISTS sesion (usuario)");
                 	tx.executeSql("INSERT INTO sesion (usuario) VALUES (?)", [username]);
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
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    } 
    
    
    //put JS code here
function add(){
    // var name = document.getElementById("name").value;
    // var text = document.getElementById("note-text").value;
    alert("si pasa");
	var nombre = document.getElementById("nombre").value;
	var usuario = document.getElementById("usuario").value;
	var contrasena = document.getElementById("contrasena").value;
	var balance = document.getElementById("balance").value;
	
	

    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO usuario (nombre, usuario, contrasena) VALUES (?,?,?)", [nombre, usuario, contrasena], function(tx,res){
            alert("Usuario agregado");    
        });
    }, function(err){
        alert("An error occured while saving the note");
    });
    
    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO balance (usuario, cantidad) VALUES (?,?)", [usuario, balance], function(tx,res){
            alert("Balance agregado");    
        });
    }, function(err){
        alert("An error occured while saving the note");
    });
    
}

function obtenerSesion(){
	db.transaction(function(tx) {
           
            tx.executeSql('SELECT * FROM sesion' , [], function(tx, results) {
                 if (results.rows.length > 0) {
                 	var row = results.rows.item(0);
                 	document.getElementById("sesion").innerHTML=row[usuario];
                 } 
            }, errorCB);
        });
}

