/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	var gridSize = 4;
	this.grid = [[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]];
	var free = [];

	//returns a random position and updates the free position array
	var getRandomPosition = function() {
		var rnd = Math.floor(Math.random()*free.length);
		var elem = free[rnd];
		free.splice(rnd, 1);
		return elem;
	};

	var getMovePosition = function(tile, dir) {
		var cntr = 0;
		switch(dir) {
			case 0 : //case up
				for (var i = tile.y+1; i < gridSize; i++) {
					if(this.grid[tile.x][i] == null)
						cntr++;
				};
				return {x:tile.x, y:tile.y+cntr};
				break;
			case 1 : //case right
				for (var i = tile.x+1; i < gridSize; i++) {
					if(this.grid[i][tile.y] == null)
						cntr++;
				};
				return {x:tile.x+cntr, y:tile.y};
				break;
			case 2 : //case down
				for (var i = tile.y-1; i >= 0; i--) {
					if(this.grid[tile.x][i] == null)
						cntr++;
				};
				return {x:tile.x, y:tile.y-cntr};
				break;
			case 3 : //case left
				for (var i = tile.x-1; i >= 0; i--) {
					if(this.grid[i][tile.y] == null)
						cntr++;
				};
				return {x:tile.x-cntr, y:tile.y};
				break;
		}
	}

	//initialize free array
	for (var i = 0; i < gridSize*gridSize; i++) {
		free[i] = {x: Math.floor(i/gridSize), y:i%gridSize};
	};
	//add two tiles at random positions
	var pos = getRandomPosition();
	this.grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);
	pos = getRandomPosition();
	this.grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);

	this.updateState = function(dir) {
		var newPos;
		var tmp;
		var prog = [[false,false,false,false],
					[false,false,false,false],
					[false,false,false,false],
					[false,false,false,false]];
		for (var i = 0; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				if(this.grid[i][j] != null && !prog[i][j]) {
					newPos = getMovePosition(this.grid[i][j], dir);
					tmp = this.grid[i][j];
					this.grid[i][j] = null;
					tmp.x = newPos.x;
					tmp.y = newPos.y;
					this.grid[newPos.x][newPos.y] = tmp;
					prog[newPos.x][newPos.y] = true;					
				}
			};
		};
		//add a random tile for next turn
		newPos = getRandomPosition();
		var randomTile = this.grid[newPos.x][newPos.y] = new Tile(newPos.x,newPos.y,0);
		this.grid[randomTile.x][randomTile.y] = randomTile;
	}
};