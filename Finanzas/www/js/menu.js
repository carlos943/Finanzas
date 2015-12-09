
    $( document ).on( "swipeleft swiperight", "#registrarIngreso", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#panelIzquierdo" ).panel( "close" );
            } else if ( e.type === "swiperight" ) {
                $( "#panelIzquierdo" ).panel( "open" );
            }
        }
    });



    $( document ).on( "swipeleft swiperight", "#registrarEgreso", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#panelIzquierdo" ).panel( "close" );
            } else if ( e.type === "swiperight" ) {
                $( "#panelIzquierdo" ).panel( "open" );
            }
        }
    });



    $( document ).on( "swipeleft swiperight", "#recordatorio", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#panelIzquierdo" ).panel( "close" );
            } else if ( e.type === "swiperight" ) {
                $( "#panelIzquierdo" ).panel( "open" );
            }
        }
    });
    


