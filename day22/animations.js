/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var pictures = ["banana.jpg", "che.jpg", "gum.jpg", "jackson.jpg", "kfc.jpg", "lennon.png", "playstation.jpg", "soup.jpg"];
var i = Math.floor(Math.random()*pictures.length);

$(document).ready(function() {
	$("header").animate({
		"font-size": "10em"
	}, 400);
	$("header").delay(1000).animate({
		"top": "0",
		"margin-top": "0"
	}, function() {
		init();
	});
});

function init() {
	$(".slideshow").html("<img src='./images/"+pictures[i]+"'></img>");
	$(".slideshow").fadeIn();
	setInterval(function() {
		i++;
		$(".slideshow").fadeOut(1000, function() {
			$(".slideshow").html("<img src='./images/"+pictures[i%pictures.length]+"'></img>");
			$(".slideshow").fadeIn();
		});
	}, 3000);
};