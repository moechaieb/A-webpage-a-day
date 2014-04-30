/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	this.grid = [[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]];
	var free = [];

	//initializes a grid with two tiles
	this.init = function() {
		//initialize free array
		for (var i = 0; i < 16; i++) {
			free[i] = {x: i/4, y:i%4};
		};
		//add two tiles at random positions
		var pos = this.getRandomPosition();
		grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);
		pos = this.getRandomPosition();
		grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);
	};

	//returns a random position and updates the free position array
	var getRandomPosition = function() {
		var rnd = Math.floor(Math.random()*free.length);
		var elem = free[rnd];
		free.splice(rnd, 1);
		return elem;
	};
};