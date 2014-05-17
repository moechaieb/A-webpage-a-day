/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var enabled = true;

$(document).ready(function() {
	$(".instruction").delay(5000).fadeOut();
	$(".all").mousemove(function(event) {
		if(enabled)
			$(".all").css("background-color", newColor(event.pageY, event.pageX));
	});
	$(".all").click(function() {
		enabled = !enabled
	});
});

function newColor(x,y) {
	var w = $(window).width();
	var h = $(window).height();
	var midY = h/2;
	var red = Math.floor((x-50)/(0.91*h)*255);
	var green = Math.floor(y/w*256);
	var blue = Math.floor(255*(Math.abs(2*y-h)/h));
	$(".rgb").html("<p class='rgb'>R:"+red+" G:"+green+" B:"+blue+"</p>");
	if((blue+red+green)/3 > 150)
		$(".rgb").css("color", "#222");
	return "rgb("+red+","+green+","+blue+")";
};