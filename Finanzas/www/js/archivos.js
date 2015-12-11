document.addEventListener("deviceready", iniciaArchivos, false);
var filesystem = null;
var messageBox;

function iniciaArchivos() {
 alert("si funciona");
	// Allow for vendor prefixes.
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	messageBox = document.getElementById('messages');

	// Start the app by requesting a FileSystem (if the browser supports the API)
	if (window.requestFileSystem) {
		initFileSystem();

	} else {
		alert("Sorry! Your browser doesn\'t support the FileSystem API :(");
	}

	//onInitFs();

}

function initFileSystem() {
	// Request a file system with the new size.
	window.requestFileSystem(window.PERSISTENT, 1024, function(fs) {
		filesystem = fs;

	}, errorHandler);
}

function onInitFs() {
	setTimeout(cargarNotas, 500);

}

function cargarNotas() {
	var dirReader = filesystem.root.createReader();
	var entries = [];

	// Call the reader.readEntries() until no more results are returned.
	var readEntries = function() {

		dirReader.readEntries(function(results) {
			if (!results.length) {
				listResults(entries.sort());
			} else {
				entries = entries.concat(toArray(results));
				readEntries();
			}
		}, errorHandler);
	};

	readEntries();
	// Start reading dirs.
}

function toArray(list) {
	return Array.prototype.slice.call(list || [], 0);
}

function listResults(entries) {
	// Document fragments can improve performance since they're only appended
	// to the DOM once. Only one browser reflow occurs.

	entries.forEach(function(entry, i) {
		if (!entry.isDirectory) {
			file = (entry.name).split('.');
			if (file[1] == 'txt') {
				readFile(file[0]);
			}
		}
	});

}

function readFile(name) {
	var content = null;
	var rutaArchivo = name;
	filesystem.root.getFile(rutaArchivo + '.txt', {}, function(fileEntry) {

		// Get a File object representing the file,
		// then use FileReader to read its contents.
		fileEntry.file(function(file) {
			var reader = new FileReader();

			reader.onloadend = function(e) {
				content = String(this.result);
				desplegarNota(name, content);
			};
			reader.readAsText(file);

		}, errorHandler);

	}, errorHandler);

}

function desplegarNota(nombre, contenido) {

	notaADesplegar = '<div id="' +nombre+'" class="nota">'
	+'<input type="checkbox" name="checkboxlist" value="'+nombre+'" id="cb_'+nombre+'" class="checkb"/>'
	+ nombre 
	+ '<img id="abrir_'+nombre+'" src="img/editar.png" height="30" width="30" class="imagen" />' 
	
	+ '</div></br>';
	document.getElementById('listaNotas').innerHTML += notaADesplegar;

	var tapped = false
	$("#abrir_" + nombre).on("touchstart", function(e) {
		if (!tapped) {//if tap is not set, set up single tap
			tapped = setTimeout(function() {
				tapped = null
				//insert things you want to do when single tapped
			}, 300);
			//wait 300ms then run single click code
		} else {//tapped within 300ms of last tap. double tap
			clearTimeout(tapped);
			//stop single tap callback
			tapped = null
			//insert things you want to do when double tapped
			$.mobile.pageContainer.pagecontainer("change", "#page3");
			mostrarInfoDelArchivo(nombre, contenido);
		}
		e.preventDefault()
	});

}
//////////////////////////////////
function agregarNota() {
	//var nombre = document.getElementById('nombreNota');
	
        var nombre = "cuentas";
	var contenido = document.getElementById('contenidoNota');
        
	saveFile(nombre + ".csv", contenido.value);
	//desplegarNota(nombre.value, contenido.value);
	//nombre.value = "";
	//contenido.value = "";
	//$.mobile.pageContainer.pagecontainer("change", "#page1");

};

function saveFile(filename, content) {
    alert("si entra");
	var rutaArchivo = filename;
	alert(rutaArchivo);
	filesystem.root.getFile(rutaArchivo, {
		create : true
	}, function(fileEntry) {

		fileEntry.createWriter(function(fileWriter) {
			var fileParts = [content];
			var contentBlob = new Blob(fileParts, {
<<<<<<< HEAD
				type : 'text/html'
=======
				type : 'text/csv'
>>>>>>> 7ecb347791b290d4906e3fd9b964ef099796659a
			});
			fileWriter.write(contentBlob);

			fileWriter.onwriteend = function(e) {
				alert("exito");
			};

			fileWriter.onerror = function(e) {
				console.log('Write error: ' + e.toString());
				alert('An error occurred and your file could not be saved!');
			};

		}, errorHandler);

	}, errorHandler);
}
/////////////////////////////
function borrarSeleccionados() {
	var arreglo = new Array();
	$("input:checkbox[name=checkboxlist]:checked").each(function() {
		arreglo.push($(this).val());
	});
	for (var i = 0; i < arreglo.length; i++) {
		deleteFile(arreglo[i]);
	};
	$.mobile.pageContainer.pagecontainer("change", "#page1");
}

function deleteFile(name) {
	var rutaArchivo = name;
	window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function() {
		filesystem.root.getFile(rutaArchivo + '.txt', {
			create : false
		}, function(fileEntry) {

			fileEntry.remove(function() {
				document.getElementById(name).remove();

			}, errorHandler);

		}, errorHandler);
	}, errorHandler);

}

function mostrarInfoDelArchivo(nombre, contenido) {

	document.getElementById('archivoEditable').value = nombre;

	document.getElementById('textoEditable').innerHTML = contenido;

}

function editarNota() {
	var nombre = document.getElementById("archivoEditable").value;
	nombre = nombre + ".txt";

	var contenido = document.getElementById("textoEditable").value;
	editFile(nombre, contenido);

	$.mobile.pageContainer.pagecontainer("change", "#page1");

}

function editFile(filename, content) {
	filesystem.root.getFile(filename, {
		create : false
	}, function(fileEntry) {
		// Create a FileWriter object for our FileEntry (with the given name of the file).
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.seek(0);
			//Start write position at EOF
			var fileParts = [content];
			var contentBlob = new Blob(fileParts, {
				type : 'text/html'
			});
			fileWriter.write(contentBlob);

		}, errorHandler);
	}, errorHandler);

	document.getElementById('listaNotas').innerHTML = "";
	cargarNotas();

}

// A simple error handler to be used throughout this demo.
function errorHandler(error) {
	var message = '';
	switch (error.code) {
	case FileError.SECURITY_ERR:
		message = 'Security Error';
		break;
	case FileError.NOT_FOUND_ERR:
		message = 'Not Found Error';
		break;
	case FileError.QUOTA_EXCEEDED_ERR:
		message = 'Quota Exceeded Error';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		message = 'Invalid Modification Error';
		break;
	case FileError.INVALID_STATE_ERR:
		message = 'Invalid State Error';
		break;
	default:
		message = 'Unknown Error';
		break;
	}

}

