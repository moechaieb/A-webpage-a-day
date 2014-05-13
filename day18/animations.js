/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var images = [{path: "car.png", caption: "Ceci n'est pas une voiture"},
	{path: "house.png", caption: "Ceci n'est pas une maison"}, 
	{path:"pipe.png", caption: "Ceci n'est pas une pipe"},
	{path:"computer.png", caption: "Ceci n'est pas un ordinateur"},
	{path:"tv.png", caption: "Ceci n'est pas un televiseur"},
	{path:"shirt.png", caption: "Ceci n'est pas une chemise"}];
var loadedImages = [];
var $currentImage;
var $currentCaption;

$(document).ready(function() {
	init();
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
	Load all images at first.
*/
function init() {
	for (var i = 0; i < images.length; i++) {
		loadedImages.push({image:$("<img src='./images/"+images[i].path+"'></img>"), caption: $("<h1>"+images[i].caption+".</h1>")});
	};
}

/*
	Takes care of adding a new image and caption to the page.
*/
function newArt() {
	var i = Math.floor(Math.random()*images.length);
	$currentImage = loadedImages[i].image;
	$currentCaption = loadedImages[i].caption;
	$(".canvas").append($currentImage);
	$currentImage.delay(100).fadeIn("fast");
	$(".canvas").append($currentCaption);
	$currentCaption.delay(100).fadeIn();
};