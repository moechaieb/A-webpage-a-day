/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	var gridSize = 4;
	this.moveMap = [];
	this.free = [];
	this.tiles = [];
	//initialize free array
	for (var i = 0; i < gridSize*gridSize; i++) {
		this.free[i] = {x: i%gridSize, y: Math.floor(i/gridSize)};
	};

	//returns a random position and updates the free position array
	this.getRandomPosition = function() {
		var rnd = Math.floor(Math.random()*(this.free.length));
		var elem = this.free[rnd];
		this.free.splice(rnd, 1);
		return elem;
	};

	this.init = function() {
		//add two tiles at random positions
		var pos = this.getRandomPosition();
		this.tiles[pos.x+4*pos.y] = new Tile(pos.x, pos.y, 0);
		pos = this.getRandomPosition();
		this.tiles[pos.x+4*pos.y] = new Tile(pos.x, pos.y, 0);
	};

	this.getMovePosition = function(pos, dir) {
		var cntr = 0;
		switch(dir) {
			case 0 : //case up
				for (var i = pos+4; i < gridSize*gridSize; i+=4) {
					if(this.tiles[i] == null)
						cntr++;
				};
				return pos+cntr*4;
				break;
			case 1 : //case right
				console.log("Scanning between "+(pos+1)+" and "+Math.ceil(pos/gridSize)*gridSize)
				for (var i = pos+1; i < Math.ceil(pos/gridSize)*gridSize-1; i++) {
					if(this.tiles[i] == null)
						cntr++;
				};
				return pos+cntr;
				break;
			case 2 : //case down
				for (var i = pos-4; i >= 0; i-=4) {
					if(this.tiles[i] == null)
						cntr++;
				};
				return pos - 4*cntr;
				break;
			case 3 : //case left
				console.log("Scanning between "+(pos-1)+" and "+Math.floor(pos/gridSize)*gridSize)
				for (var i = pos-1; i >= Math.floor(pos/gridSize)*gridSize; i--) {
					if(this.tiles[i] == null)
						cntr++;
				};
				return pos-cntr;
				break;
		}
	}

	// returns a new grid with an updated state
	this.update = function(dir) {
		var newPos;
		var tmp;
		var update = [];
		this.moveMap = [];
		for (var i = this.tiles.length; i >= 0; i--) {
			if(this.tiles[i]) {
				newPos = this.getMovePosition(i,dir);
				//moving the tile here
				update[newPos] = this.tiles[i];
				//////////////////////
				this.moveMap.push({tile: update[newPos], newPos: newPos});
			};
		};
		this.tiles = update;
		//update the free block vector
		for (var i = 0; i < gridSize*gridSize; i++) {
			this.free[i] = {x: i%gridSize, y: Math.floor(i/gridSize)};
			if(this.tiles[i] == null)
				this.free.splice(i,1);
		};
		console.log(this.tiles);
		console.log(this.moveMap);
		//add a random tile for next turn
		// newPos = getRandomPosition();
		// var randomTile = this.grid[newPos.x][newPos.y] = new Tile(newPos.x,newPos.y,0);
		// this.grid[randomTile.x][randomTile.y] = randomTile;
	}
};