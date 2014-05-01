/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	var gridSize = 4;
	this.grid = [[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]];
	this.moveMap = [];
	this.free = [];
	//initialize free array
	for (var i = 0; i < gridSize*gridSize; i++) {
		this.free[i] = {x: Math.floor(i/gridSize), y:i%gridSize};
	};

	//returns a random position and updates the free position array
	this.getRandomPosition = function() {
		var rnd = Math.floor(Math.random()*(this.free.length));
		var elem = this.free[rnd];
		this.free.splice(rnd, 1);
		return elem;
	};

	this.getMovePosition = function(posX, posY, dir) {
		var cntr = 0;
		switch(dir) {
			case 0 : //case up
				for (var i = posY+1; i < gridSize; i++) {
					if(this.grid[posX][i] == null)
						cntr++;
				};
				return {x:posX, y:posY+cntr};
				break;
			case 1 : //case right
				for (var i = posX+1; i < gridSize; i++) {
					if(this.grid[i][posY] == null)
						cntr++;
				};
				return {x:posX+cntr, y:posY};
				break;
			case 2 : //case down
				for (var i = posY-1; i >= 0; i--) {
					if(this.grid[posX][i] == null)
						cntr++;
				};
				return {x:posX, y:posY-cntr};
				break;
			case 3 : //case left
				for (var i = posX-1; i >= 0; i--) {
					if(this.grid[i][posY] == null)
						cntr++;
				};
				return {x:posX-cntr, y:posY};
				break;
		}
	}

	//add two tiles at random positions
	var pos = this.getRandomPosition();
	this.grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);
	pos = this.getRandomPosition();
	this.grid[pos.x][pos.y] = new Tile(pos.x,pos.y,0);

	this.update = function(dir) {
		var newPos;
		var tmp;
		//keeps track of iterations
		var newMap = [[false,false,false,false],
					  [false,false,false,false],
					  [false,false,false,false],
					  [false,false,false,false]];
		this.moveMap = [];
		switch(dir) {
			case 0: //up
				for (var i = gridSize-1; i >= 0; i--) {
					for (var j = gridSize - 1; j >= 0; j--) {
						if(this.grid[j][i] && !newMap[j][i]) {
							newPos = this.getMovePosition(j,i,dir);
							this.moveMap.push({tile: this.grid[j][i], newX: newPos.x, newY: newPos.y});
							//moving the tile here
							tmp = this.grid[j][i];
							this.grid[j][i] = null;
							this.grid[newPos.x][newPos.y] = tmp;
							//--------------------
							newMap[newPos.x][newPos.y] = true;
						}
					};
				};
				break;
			case 1: //right
				break;
			case 2: //left
				break;
			case 3: //down
				break;
		};
		//add a random tile for next turn
		// newPos = getRandomPosition();
		// var randomTile = this.grid[newPos.x][newPos.y] = new Tile(newPos.x,newPos.y,0);
		// this.grid[randomTile.x][randomTile.y] = randomTile;
	}
};