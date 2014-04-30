/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function KeyManager(g, grid) {
	//initialize key listeners
	Mousetrap.bind('up', function() {grid.updateState(0); g.drawTiles(grid);});
	Mousetrap.bind('down', function() {grid.updateState(2); g.drawTiles(grid);});
	Mousetrap.bind('left', function() {grid.updateState(3); g.drawTiles(grid);});
	Mousetrap.bind('right', function() {grid.updateState(1); g.drawTiles(grid);});
	Mousetrap.bind('w', function() {grid.updateState(0); g.drawTiles(grid);});
	Mousetrap.bind('s', function() {grid.updateState(2); g.drawTiles(grid);});
	Mousetrap.bind('a', function() {grid.updateState(3); g.drawTiles(grid);});
	Mousetrap.bind('d', function() {grid.updateState(1); g.drawTiles(grid);});
}