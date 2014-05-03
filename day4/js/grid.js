/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	var gridSize = 4;
	this.moveMap = [];
	this.free = [];
	this.tiles = [];
	this.previousState = [];
	this.newTile = null;
	//initialize free array
	for (var i = 0; i < gridSize*gridSize; i++) {
		this.free[i] = true;
	};

	this.refreshFree = function() {
		for (var i = 0; i < this.free.length; i++) {
			this.free[i] = true;
			if(this.tiles[i])
				this.free[i] = false;
		};
	}

	//returns a random position and updates the free position array
	this.getRandomPosition = function() {
		var coin = Math.floor(Math.random()*2);
		var c = 0;
		if(coin == 1) {
			for (var i = gridSize*gridSize-1; i >= 0 ; i--) {
				if(this.free[i]) {
					c = i;
					break;
				}
			};
		} else {
			for (var i = 0; i < gridSize*gridSize ; i++) {
				if(this.free[i]) {
					c = i;
					break;
				}
			};
		}
		this.free[c] = false;
		return c;
	};

	this.init = function() {
		//add two tiles at random positions
		var lvl = Math.floor(Math.random()*2);
		var pos = this.getRandomPosition();
		this.tiles[pos] = new Tile(pos%gridSize, Math.floor(pos/gridSize), lvl);
		pos = this.getRandomPosition();
		lvl = Math.floor(Math.random()*2);
		this.tiles[pos] = new Tile(pos%gridSize, Math.floor(pos/gridSize), lvl);
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
				for (var i = pos+1; i < Math.ceil((pos+0.1)/gridSize)*gridSize; i++) {
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
				this.moveMap.push({oldPos: i, newPos: newPos, level: this.tiles[i].level});
			};
		};
		this.previousState = this.tiles;
		this.tiles = update;
		this.refreshFree();
		//add a random tile for next turn if state changed
		if(!arrayEquals(this.tiles, this.previousState)) {
			newPos = this.getRandomPosition();
			var lvl = Math.floor(Math.random()*2);
			this.tiles[newPos] = new Tile(newPos%gridSize, Math.floor(newPos/gridSize), lvl);
			this.newTile = this.tiles[newPos];
		};
	}

	//helper method, checks if two grid states are identical
	var arrayEquals = function(a1, a2) {
		for(var i = 0; i<a1.length;i++) {
			if((a1[i] == null && a2[i] != null) || ((a2[i] == null && a1[i] != null)))
				return false;
		};
		return true;
	}
};