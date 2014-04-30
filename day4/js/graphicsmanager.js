/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function GraphicsManager() {
	// Some convenient renames and constants
	var Point = Isomer.Point;
	var Path = Isomer.Path;
	var Shape = Isomer.Shape;
	var Color = Isomer.Color;
	//some constants
	var squareSide = 3;
	var gridSize = 4;
	var thickness = 0.25;
	var boardcolors = [new Color(32,32,32), new Color(0,0,0)];
	var progression = [new Color(226,208,169), new Color(247,223,177), new Color(228,125,173), new Color(111,125,173),
				   	   new Color(111,225,118), new Color(179,238,93), new Color(95,241,124), new Color(0,249,138),
				       new Color(0,249,255), new Color(208,21,139), new Color(95,241,9)];

	this.iso = new Isomer(document.getElementById("game"));

	this.drawBoard = function() {
		//add board
		this.iso.add(Shape.Prism(Point(0-thickness,0-thickness,0), 4*squareSide, 4*squareSide, thickness));
		//initialize the squares
		for (var i = 3; i >= 0; i--) {
			for (var j = 3; j >= 0; j--) {
				this.iso.add(new Path([Point(i*squareSide, j*squareSide, 0), 
					Point(i*squareSide+squareSide, j*squareSide, 0),
					Point(i*squareSide+squareSide, j*squareSide+squareSide, 0),
					Point(i*squareSide, j*squareSide+squareSide, 0)]), boardcolors[(i+j)%2]);
			};
		};
	};

	this.makeTile3D = function(tile) {
		return Shape.Prism(Point(tile.x*squareSide,tile.y*squareSide), squareSide, squareSide, thickness);
	};

	this.drawTiles = function(grid) {
		this.iso.canvas.clear();
		this.drawBoard();
		for (var i = gridSize - 1; i >= 0; i--) {
			for (var j = gridSize - 1; j >= 0; j--) {
				if(grid.grid[i][j])
					this.iso.add(this.makeTile3D(grid.grid[i][j]),progression[grid.grid[i][j].level]);
			};
		};
	};

	this.updateTiles = function(grid) {
		for (var i = gridSize - 1; i >= 0; i--) {
			for (var j = gridSize - 1; j >= 0; j--) {
				if(grid.previousState[i][j])
					this.translateTile(grid.previousState[i][j], grid.previousState[i][j].nextX, grid.previousState[i][j].nextY);
			};
		};
	};

	//dynamically moves a tiles from positions (x,y) to positions (newX, newY)
	this.translateTiles = function(tiles,newXs,newYs) {
		var self = this;
		var dxs = [];
		var dys = [];
		var tile3Ds = [];
		for (var i = 0; i < tiles.length; i++) {
			tile3Ds[i] = this.makeTile3D(tiles[i]);
			dxs[i] = 0;
			dys[i] = 0;
		};
		var id = setInterval(function() {
			self.iso.canvas.clear();
			self.drawBoard();
			for (var i = 0; i < tiles.length; i++) {
				self.iso.add(tile3Ds[i].translate(dxs[i],dys[i],0), progression[tiles[i].level]);
				dxs[i] += (newXs[i]-tiles[i].x)/20;
				dys[i] += (newYs[i]-tiles[i].y)/20;
			};
			console.log("Moving");
			if(allArrived(dxs,dys,newXs,newYs, tiles))
				clearInterval(id);
		}, 1);
	};

	function allArrived(dxs,dys,newXs,newYs, tiles) {
		for (var i = 0; i < dxs.length; i++) {
			if(!(Math.abs(dxs[i]) >= Math.abs(newXs[i]-tiles[i].x)*squareSide 
				&& Math.abs(dys[i]) >= Math.abs(newYs[i]-tiles[i].y)*squareSide))
				return false;
		};
		return true;
	}
};