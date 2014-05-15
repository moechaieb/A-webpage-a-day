/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

$(document).ready(function() {
	$('.logo').hover(function() {
		$('.bottom').animate({
			top: "50px"
		}, 250);
		$('.top').animate({
			bottom: "50px"
		}, 250);
		$('.bar').fadeIn("slow");
	}, function() {
		$('.bar').fadeOut(150);
		$('.bottom').animate({
			top: "0"
		}, 250);
		$('.top').animate({
			bottom: "0"
		}, 250);
	});
});