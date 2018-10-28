(function( window, require ) {
	'use strict';

	function AeroGrid( element, options ) {
		if ( element && element.nodeType === 1 ) {
			this.grid = element;
			this.grid.style.cssText = 'position: relative;' +
							 					 			 	'overflow: hidden;';
		} else {
			throw new Error('You need define a valid element.');
		}

		var defs = { rows: 3, cols: 3,
								 breakpoint: '992px' },
				opts = {};

		if ( options && typeof options === 'object' ) {
			for ( var key in defs ) {
				if ( options.hasOwnProperty( key ) ) {
					opts[ key ] = options[ key ];
				} else {
					opts[ key ] = defs[ key ];
				}
			}
		} else {
			opts = defs;
		}

		this.rows = 100 / opts.rows;
		this.cols = 100 / opts.cols;

		this.setChildrenStyles( opts.breakpoint );

		var self = this;
		window.onresize = function() {
			self.setChildrenStyles( opts.breakpoint );
		};
	};

	var proto = AeroGrid.prototype = {
		constructor: AeroGrid,

		extend: function( obj ) {
			for ( var key in obj ) {
				this[ key ] = obj[ key ];
			}
		}
	};

	// Utils
	proto.extend({
		toPercentage: function( input ) {
			return parseFloat( input ) + '%';
		},

		eachChildren: function( fn ) {
			var child;
			for ( var i = this.grid.children.length; i--; ) {
				child = this.grid.children[ i ];
				fn( child.style, child.dataset );
			}
		}
	});

	// Styles
	proto.extend({
		setChildrenStyles: function( bp ) {
			if ( window.matchMedia('(max-width: ' + bp + ')').matches ) {
				this.resetChildrenStyles();
			} else {
				this.setPositions();
				this.setSizes();
			}
		},

		resetChildrenStyles: function() {
			this.eachChildren(function( style ) {
				style.cssText = '';
			});
		}
	});

	// Positions
	proto.extend({
		getPositionRows: function( multiplier ) {
			return this.toPercentage(
				this.rows * ( multiplier - 1 ) 
			);
		},

		getPositionCols: function( multiplier ) {
			return this.toPercentage(
				this.cols * ( multiplier - 1 ) 
			);
		},

		setPositions: function() {
			var self = this;

			this.eachChildren(function( style, data ) {
				style.position = 'absolute';
				style.top = self.getPositionRows( data.row );
				style.left = self.getPositionCols( data.col );
			});
		}
	});

	// Sizes
	proto.extend({
		getSizeRows: function( multiplier ) {
			return this.toPercentage(
				this.rows * ( multiplier || 1 )
			);
		},

		getSizeCols: function( multiplier ) {
			return this.toPercentage(
				this.cols * ( multiplier || 1 )
			);
		},

		setSizes: function() {
			var self = this;

			this.eachChildren(function( style, data ) {
				style.height = 'rowSpan' in data ?
											self.getSizeRows( data.rowSpan ) :
											self.getSizeRows();

				style.width = 'colSpan' in data ?
											self.getSizeCols( data.colSpan ) :
											self.getSizeCols();
			});
		}
	});

	require.exports( AeroGrid );

})( window, window.require, undefined );