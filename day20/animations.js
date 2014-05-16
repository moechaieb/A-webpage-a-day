/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

$(document).ready(function() {
	$(".all").mousemove(function(event) {
		$(".all").css("background-color", randomColor(event.pageY, event.pageX));
	});
});

function randomColor(r,g) {
	var red = Math.floor(r/$(window).height())*255;
	var green = Math.floor(g/$(window).width())*255;
	var b = 60;
	return "rgb("+red+","+green+","+b+")";
};