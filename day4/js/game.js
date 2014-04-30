/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function Game() {
	var gridSize = 4;
	this.grid = new Grid();
	this.graphicsManager = new GraphicManager();

	this.initListeners = function() {
		//initialize key listeners
		Mousetrap.bind('up', function() {shift("up"); draw();});
		Mousetrap.bind('down', function() {shift("down")});
		Mousetrap.bind('left', function() {shift("left")});
		Mousetrap.bind('right', function() {shift("right")});
	};

	this.initListeners();
	this.graphicsManager.drawBoard();
}

new Game();

//initializes the grid with two random tiles
function init() {
	//create two random squares
	var newPos = getRandomPosition();
	grid[newPos.x][newPos.y] = {tile : Shape.Prism(Point(newPos.x*squareSide,newPos.y*squareSide,0),
						squareSide, squareSide, thickness), x : newPos.x, y : newPos.y, level : 0};
	newPos = getRandomPosition();
	grid[newPos.x][newPos.y] = {tile : Shape.Prism(Point(newPos.x*squareSide,newPos.y*squareSide,0),
						squareSide, squareSide, thickness), x : newPos.x, y : newPos.y, level : 0};
	draw();
}

//draw the tiles in the current grid
function draw() {
	console.log(grid);
	iso = new Isomer(document.getElementById("art"));
	for (var i = gridSize - 1; i >= 0; i--) {
		for (var j = gridSize - 1; j >= 0; j--) {
			if(grid[i][j])
				iso.add(grid[i][j].tile, progression[grid[i][j].level+7])
		};
	};
}

//shifts all tiles to the given direction
//determines the new positions of all tiles
function shift(dir) {
	var newPos;
	var tmp;
	var prog = [[false,false,false,false],
				[false,false,false,false],
				[false,false,false,false],
				[false,false,false,false]];
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			if(grid[i][j] != null && !prog[i][j]) {
				newPos = getMovePosition(grid[i][j], dir);
				tmp = grid[i][j];
				grid[i][j] = null;
				tmp.x = newPos.x;
				tmp.y = newPos.y;
				grid[newPos.x][newPos.y] = tmp;
				prog[newPos.x][newPos.y] = true;
					
			}
		};
	};
	//add a random tile for next turn
	var randomTile = getRandomTile();
	grid[randomTile.x][randomTile.y] = randomTile;
	draw();
}

//returns the position the tile should move to, given the direction
function getMovePosition(tile, dir) {
	var cntr = 0;
	if(dir == "up") {
		for (var i = tile.y+1; i < gridSize; i++) {
			if(grid[tile.x][i] == null)
				cntr++;
		};
		return {x:tile.x, y:tile.y+cntr};
	} else if(dir == "down"){
		for (var i = tile.y-1; i >= 0; i--) {
			if(grid[tile.x][i] == null)
				cntr++;
		};
		return {x:tile.x, y:tile.y-cntr};
	} else if(dir == "left"){
		for (var i = tile.x-1; i >= 0; i--) {
			if(grid[i][tile.y] == null)
				cntr++;
		};
		return {x:tile.x-cntr, y:tile.y};
	} else if(dir == "right"){
		for (var i = tile.x+1; i < gridSize; i++) {
			if(grid[i][tile.y] == null)
				cntr++;
		};
		return {x:tile.x+cntr, y:tile.y};
	}

}

//returns a random color
function randomColor() {
	return new Color(Math.floor(Math.random()*255),
		Math.floor(Math.random()*255),
		Math.floor(Math.random()*255));
};

//returns a random pair of numbers between (0,0) and (3,3)
//the position is always free on the grid
function getRandomPosition() {
	return ;
}

//gets a random tile
function getRandomTile() {
	
}

//determines whether the two given positions are adjacent
function isAdjacent(e1, e2) {
	return (Math.abs(e1.y-e2.y) == 1) && (Math.abs(e1.x-e2.x) == 1);
}