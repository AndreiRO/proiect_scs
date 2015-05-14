var attacked = false;
var maxHeight = 100;
var maxWidth = 100;
var loaded = 0;
var number_of_images = 1;

var boat_image = new Image();
boat_image.src = "boat.png";
boat_image.addEventListener("load", function() {
	loaded ++;
}, false);

fish = Array();
var boatX = 0, boatY = 0;
var left = false;
var up = false;
var right = false;
var down = false;

function draw() {
	if (loaded == number_of_images) {
		maxWidth = document.getElementById('gameCanvas').offsetWidth;
		maxHeight = document.getElementById('gameCanvas').offsetHeight;

		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, maxWidth, maxHeight);

		var h = maxHeight / 5;

		ctx.fillStyle = "#0000ff";
		ctx.fillRect(0, h, maxWidth, maxHeight);

		drawPlayer(h);
		drawFish();
		drawBait();

		setTimeout(draw, 20);	
	}
	
}

function drawPlayer(h) {
	ctx.drawImage(boat_image, boatX, boatY, h, h);
}

function drawFish() {

}

function drawBait() {

}

function spawnFish() {

}

function update() {
	updatePlayer();
	updateBait();
	updateFish();

	setTimeout(update, 50);
}

function updatePlayer() {
	var h = maxWidth / 5;
	if (boatX + h < maxWidth - h && right) {
		boatX += maxWidth / 100;
	}
	if ((boatX - h / 2 > 0) && left) {
		boatX -= maxWidth / 100.0;
	}
}

function updateBait() {
	
}

function updateFish() {
	
}

$(document).ready(function() {
	canvas = document.getElementById("gameCanvas");
	ctx    = canvas.getContext('2d');
	
	maxWidth = document.getElementById('gameCanvas').offsetWidth;
	maxHeight = document.getElementById('gameCanvas').offsetHeight;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, maxWidth, maxHeight);

	setTimeout(draw, 20);
	setTimeout(update, 50);
	left = false, up = false, right = false, down = false;
});

$(document).keypress(function (ev) {
	var c = String.fromCharCode(ev.which);

	switch (c) {
		case 'W':
		case 'w':
			up = true;
			break;
		case 'A':
		case 'a':
			left = true;
			break;
		case 'S':
		case 's':
			down = true;
			break;
		case 'D':
		case 'd':
			right = true;
			break;
	}
});

$(document).keyup(function (ev) {
	var c = String.fromCharCode(ev.which);
	switch (c) {
		case 'W':
		case 'w':
			up = false;
			break;
		case 'A':
		case 'a':
			left = false;
			break;
		case 'S':
		case 's':
			down = false;
			break;
		case 'D':
		case 'd':
			right = false;
			break;
	}
});