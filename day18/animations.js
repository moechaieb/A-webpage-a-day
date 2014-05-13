/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var images = [{path: "car.png", caption: "Ceci n'est pas une voiture"},
	{path: "house.png", caption: "Ceci n'est pas une maison"}, 
	{path:"pipe.png", caption: "Ceci n'est pas une pipe"},
	{path:"computer.png", caption: "Ceci n'est pas un ordinateur"},
	{path:"tv.png", caption: "Ceci n'est pas un televiseur"},
	{path:"shirt.png", caption: "Ceci n'est pas une chemise"},
	{path: "chair.png", caption: "Ceci n'est pas une chaise"}];
var $currentImage;
var $currentCaption;

$(document).ready(function() {
	// show instruction, then show first image
	$("h1").delay(500).fadeOut(1000, function() {
		newArt();
	});
	// set up the hover handlers
	$(".canvas").hover(function() {
		if($currentImage) {
			$currentImage.fadeOut("fast");
			$currentCaption.fadeOut("fast", function() {
				$currentImage.remove();
				$currentCaption.remove();
			});
		}
	}, function() {
		$currentImage.remove();
		$currentCaption.remove();
		newArt();
	});
});

/*
	Takes care of adding a new image and caption to the page.
*/
function newArt() {
	var i = Math.floor(Math.random()*images.length);
	$currentImage = $("<img src='./images/"+images[i].path+"'></img>");
	$currentCaption = $("<h1>"+images[i].caption+".</h1>");
	$(".canvas").append($currentImage);
	$currentImage.delay(100).fadeIn("fast");
	$(".canvas").append($currentCaption);
	$currentCaption.delay(100).fadeIn();
};