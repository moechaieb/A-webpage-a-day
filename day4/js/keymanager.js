/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function KeyManager(g, grid) {
	this.graphicsManager = g;
	this.gameGrid = grid;
	
	var self = this;

	this.trigger = function(n) {
		this.gameGrid.update(n);
		this.graphicsManager.updateTiles(this.gameGrid);
		//g.translateTiles([grid.grid[3][0], grid.grid[0][0]], [3,0],[3,3]);
	};

	//initialize key listeners
	Mousetrap.bind(['up', 'w'], function() {self.trigger(0);});
	Mousetrap.bind(['down', 's'], function() {self.trigger(2);});
	Mousetrap.bind(['left', 'a'], function() {self.trigger(3);});
	Mousetrap.bind(['right', 'd'], function() {self.trigger(1);});
}