

document.addEventListener("deviceready", function() {
	obtenerSesion();
cargarBalance();
obtenerIngresosTabla();
obtenerEgresosTabla();
});

 $(function() {


            var valoresX = 10;//numero de transacciones (ingresos y egresos)
            var valoresY = [1000, 200, 1000, 500, 1000, 1230, 2436, 1200, 765, 234]; //cantidad en efectivo
            var matriz;
            mi_matriz();
            function mi_matriz() {
                matriz = new Array(valoresX);
                for (i = 0; i < valoresX; i++) {
                    matriz[i] = new Array(2)
                    for (j = 0; j < 1; j++) {
                        matriz[i][j]=i+1;
                        matriz[i][j+1]=valoresY[i];
                        
                    }
                }
            }

            

            //var s1 = [[2002, 112000], [2003, 122000], [2004, 104000], [2005, 99000], [2006, 121000],
             //   [2007, 148000], [2008, 114000], [2009, 133000], [2010, 161000], [2011, 173000]];
            

        });