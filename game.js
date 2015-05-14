var ctx;
var canvas;
var attacked = false;
var maxHeight = 100;
var maxWidth = 100;
var loaded = 0;
var number_of_images = 5;

var boat_image = new Image();
var blue_image = new Image();
var fblue_image = new Image();
var red_image = new Image();
var fred_image = new Image();

boat_image.src = "boat.png";
red_image.src = "red.png";
fred_image.src = "fred.png";
blue_image.src = "blue.png";
fblue_image.src = "fblue.png";

red_image.addEventListener("load", function() {
	loaded ++;
}, false);

blue_image.addEventListener("load", function() {
	loaded ++;
}, false);

boat_image.addEventListener("load", function() {
	loaded ++;
}, false);

fblue_image.addEventListener("load", function() {
	loaded ++;
}, false);

fred_image.addEventListener("load", function() {
	loaded ++;
}, false);

fish = Array();


var boatX = 0, boatY = 0;
var left = false;
var up = false;
var right = false;
var down = false;
var h;

function draw()
{
	if (loaded == number_of_images)
    {
		maxWidth = document.getElementById('gameCanvas').width;
		maxHeight = document.getElementById('gameCanvas').height;


		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, maxWidth, maxHeight);

        h = 2 * maxHeight / 5;
        var dt = maxWidth / 100;
        if (fish.length == 0)
        {
            for (var i = 0; i < 5; i ++)
            {
                var f = {
                    x : ((Math.random() * 1000) % (maxWidth - dt)) % maxWidth,
                    y : (h + (Math.random() * 1000) % (maxHeight - h)) % maxHeight,
                    type : Math.floor((Math.random() * 2) + 1) % 2,
                    moving : Math.floor((Math.random() * 2) + 1) % 2
                };
                fish[i] = f;
            }
        }

		ctx.fillStyle = '#3399FF';
		ctx.fillRect(0, h, maxWidth, maxHeight);

		drawPlayer(h);
        drawFish(maxWidth / 25);

		setTimeout(draw, 20);
	}

}

function drawPlayer(h)
{
	ctx.drawImage(boat_image, boatX, boatY, h, h);
}

function drawFish(h) {

    for (var i = 0; i < fish.length ; ++ i)
    {
        if (fish[i].type == 0)
        {
            if (fish[i].moving)
            {
	            ctx.drawImage(fblue_image, fish[i].x, fish[i].y, h, h);
            }
            else
            {
	            ctx.drawImage(blue_image, fish[i].x, fish[i].y, h, h);
            }
        }
        else
        {
            if (fish[i].moving)
            {
	            ctx.drawImage(fred_image, fish[i].x, fish[i].y, h, h);
            }
            else
            {
	            ctx.drawImage(red_image, fish[i].x, fish[i].y, h, h);
            }
        }
    }
}

function update()
{
	updatePlayer();
    updateFish();

	setTimeout(update, 50);
}

function updatePlayer()
{
	var dt = maxWidth / 100;
    if (right) boatX += dt;
    if (boatX > maxWidth - h) boatX = maxWidth - h;
    if (left) boatX -= dt;
    if (boatX < 0) boatX = 0;
}

function updateFish()
{
	var dt = maxWidth / 100;
    for (var i = 0; i < fish.length; ++ i)
    {
        if (fish[i].moving == 0)
        {
            fish[i].x -= dt;
            if (fish[i].x < 0)
            {
                fish[i].x = 0;
                fish[i].moving = 1;
            }
        }
        else
        {
            fish[i].x += dt;
            if (fish[i].x > maxWidth - dt)
            {
                fish[i].x = maxWidth - dt;
                fish[i].moving = 0;
            }
        }
    }
}

$(document).ready(function()
{
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

$(document).keypress(function (ev)
{
	var c = String.fromCharCode(ev.which);

	switch (c)
    {
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

$(document).keyup(function (ev)
{
	var c = String.fromCharCode(ev.which);
	switch (c)
    {
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
