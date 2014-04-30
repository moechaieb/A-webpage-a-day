/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Grid() {
	var gridSize = 4;
	this.grid = [[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]];
	this.previousState = [[],[],[],[]];
	var free = [];

	//returns a random position and updates the free position array
	var getRandomPosition = function() {
		var rnd = Math.floor(Math.random()*free.length);
		var elem = free[rnd];
		free.splice(rnd, 1);
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

	//initialize free array
	for (var i = 0; i < gridSize*gridSize; i++) {
		free[i] = {x: Math.floor(i/gridSize), y:i%gridSize};
	};
	//add two tiles at random positions
	//var pos = getRandomPosition();
	this.grid[0][0] = new Tile(0,0,0);
	//pos = getRandomPosition();
	this.grid[3][0] = new Tile(3,0,0);

	// moves the tile at the (x,y) position to (newX,newY)
	this.moveTile = function(x,y, newX, newY) {
		this.grid[newX][newY] = this.previousState[x][y];
		this.previousState[x][y].nextX = newX;
		this.previousState[x][y].nextY = newY;
	}

	this.updateState = function(dir) {
		var newPos;
		var tmp;
		this.previousState = this.grid;
		this.grid =  [[null,null,null,null],
					 [null,null,null,null],
					 [null,null,null,null],
					 [null,null,null,null]];
		for (var i = 0; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				if(this.previousState[i][j] != null) {
					newPos = this.getMovePosition(i, j, dir);
					this.moveTile(i,j, newPos.x, newPos.y);				
				}
			};
		};
		//add a random tile for next turn
		newPos = getRandomPosition();
		var randomTile = this.grid[newPos.x][newPos.y] = new Tile(newPos.x,newPos.y,0);
		this.grid[randomTile.x][randomTile.y] = randomTile;
	}
};