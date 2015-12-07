var db = openDatabase('app', '1.0', 'app DB', 2 * 1024 * 1024);

initDatabase();

function initDatabase(){
    var names = ["Luis", "Camila", "Pablo", "Karen", "Vale"];
    var msg;
    db.transaction(function (tx) { 
        tx.executeSql('DROP TABLE IF EXISTS cuenta');
        tx.executeSql('CREATE TABLE IF NOT EXISTS cuenta (nombre,usuario,contreseña)');
        for (var i=0; i< names.length; i++){
            tx.executeSql('INSERT INTO cuenta (nombre,usuario,contreseña) VALUES (?,?,?)', [names[i]], [names[i]], [names[i]]);    
        }
    doQuery();
    });             
}

function doQuery(){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM STUDENT', [], function (tx, result) {
           for (var i = 0; i < result.rows.length; i++){
              var item = result.rows.item(i);
              display(item.id, item.name);
           }
        });
    });     
}

function display(id, name){
    var row = document.createElement("tr");
    var idCell = document.createElement("td");
    var nameCell = document.createElement("td");
    idCell.textContent = id;
    nameCell.textContent = name;
    row.appendChild(idCell);
    row.appendChild(nameCell);
    document.getElementById("racers").appendChild(row);
}

function drop(){
    db.transaction(function (tx) {
        tx.executeSql('DROP DATABASE school');
    });
}
