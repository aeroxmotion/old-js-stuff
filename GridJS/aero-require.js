(function( window ) {
	'use strict';

	function aeroRequire( arr, fn ) {
		var idx = 0, len = arr.length,
				xhr = new XMLHttpRequest();

		(function requireLoop() {
			if ( idx === len ) {
				return fn.apply( this, modules );
			}

			xhr.open('GET', arr[ idx++ ] + '.js', true);
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === XMLHttpRequest.DONE ) {
					if ( xhr.status === 200 ) {
						eval( xhr.responseText );
						requireLoop();
					}
				}
			};
			xhr.send();
		})();
	}

	var modules = [];
	aeroRequire.exports = function() {
		var idx = 0,
				len = arguments.length;

		for (; idx < len; idx++) {
			modules.push( arguments[ idx ] );
		}
	};

	window.require = aeroRequire;

})( window, undefined );