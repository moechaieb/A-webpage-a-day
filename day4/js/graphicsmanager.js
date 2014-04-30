/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

function GraphicManager() {
	// Some convenient renames and constants
	var Point = Isomer.Point;
	var Path = Isomer.Path;
	var Shape = Isomer.Shape;
	var Color = Isomer.Color;
	//some constants
	var squareSide = 3;
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
};