/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var enabled = true;

$(document).ready(function() {
	$(".instruction").delay(2000).fadeOut();
	$(".all").mousemove(function(event) {
		if(enabled)
			$(".all").css("background-color", randomColor(event.pageY, event.pageX));
	});
	$(".all").click(function() {
		enabled = !enabled
	});
});

function randomColor(r,g) {
	var red = Math.floor((r-50)/(0.91*$(window).height())*255);
	var green = Math.floor(g/$(window).width()*256);
	var blue = Math.floor((red+green)/2);
	$(".rgb").html("<p class='rgb'>R:"+red+" G:"+green+" B:"+blue+"</p>");
	if((blue+red+green)/3 > 180)
		$(".rgb").css("color", "#222");
	return "rgb("+red+","+green+","+blue+")";
};