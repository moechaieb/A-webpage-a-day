/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

var p  = parallax;
var elements = [];

function init() {
	p.add("intro", $("#intro"));
	elements.push($('#fact1'));
	elements.push($('#fact2'));
	elements.push($('#fact3'));
	elements.push($('#fact4'));
	elements.push($('#fact5'));
	elements.push($('#fact6'));
	elements.push($('#fact7'));
	elements.push($('#fact8'));
	elements.push($('#fact9'));
	elements.push($('#fact10'));
	for (var i = 0; i < elements.length; i++)
		p.add(elements[i]);
};

/*
	Brings in the next fact, randomly
*/
function nextFact() {
	var coin = Math.floor(Math.random()*4);
	var next = Math.floor(Math.random()*10);
	var nextName = "fact"+next;
	if(coin == 0)
		p[nextName].top();
	else if(coin == 1)
		p[nextName].right();
	else if(coin == 2)
		p[nextName].bottom();
	else p[nextName].left();
	elements[next].css('margin-top', '30%');
	elements[next].css('margin-left', '10%');
	elements[next].css('width', '80%');
	console.log("Next fact, mate");
};

$(document).ready(function() {
	//set up the properties of parallax
	p.background = $("body");
	p.scaling = 0.9;
	p.speed = 600;

	//set up key binding
	$(document).keydown(function(e) {
		nextFact();
	});

	//initializes all elements in parallax and caches them
	init();
	p.intro.show();
	$("#intro").css('margin-top', '30%');
	$("#intro").css('margin-left', '20%');
	$('#intro').css('width', '60%')
});