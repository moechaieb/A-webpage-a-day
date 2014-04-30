/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function KeyManager(g, grid) {
	//initialize key listeners
	Mousetrap.bind('up', function() {trigger(0);});
	Mousetrap.bind('down', function() {trigger(2);});
	Mousetrap.bind('left', function() {trigger(3);});
	Mousetrap.bind('right', function() {trigger(1);});
	Mousetrap.bind('w', function() {trigger(0);});
	Mousetrap.bind('s', function() {trigger(2);});
	Mousetrap.bind('a', function() {trigger(3);});
	Mousetrap.bind('d', function() {trigger(1);});

	var trigger = function(n) {
		//grid.updateState(n);
		//g.drawTiles(grid);
		g.translateTiles([grid.grid[3][0], grid.grid[0][0]], [3,0],[3,3]);
	};
}