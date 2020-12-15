
var map = `
xxxxxxxxxxxxxxxxxxxx
x..++++++++++++++..x
x.++++++++++++++++.x
x++xx++++++++++++++x
x++++++++++++++++++x
x++++++++xx++++++++x
x+++++++xxxx+++++++x
x++++++++xx++++++++x
x++++++++++++++++++x
x++++++++++++++xx++x
x.++++++++++++++++.x
x..++++++++++++++..x
xxxxxxxxxxxxxxxxxxxx
`;

var mousePos;
var mouseDown = false;

var manHeight = 40;
var manWidth = 40;
var manX = 155;
var manY = 55;
var bombX;
var bombY;
var time = 0;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var enterPressed = false;

let rows = map.trim().split("\n").map(l => [...l]);

var canvas = document.createElement("canvas");
canvas.width = rows[0].length*50;
canvas.height = rows.length*50;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x:evt.clientX - rect.left,
        y:evt.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', function (evt) {
	mouseDown = true;
	mousePos = getMousePos(canvas, evt);
	console.log("X: " + Math.floor(mousePos.x/50) + ",Y: " + Math.floor(mousePos.y/50));
	console.log(rows[Math.floor(manY/50)][Math.floor(manX/50)]);
	});
	
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        P1.rightPressed = true;
		console.log("keydown");
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        P1.leftPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        P1.downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        P1.upPressed = true;
    }
    else if(e.key == "Enter") {
        P1.enterPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        P1.rightPressed = false;
		console.log("keyup");
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        P1.leftPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        P1.downPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        P1.upPressed = false;
    }
    else if(e.key == "Enter") {
        P1.enterPressed = false;
		P1.settingBomb = false;
    }
}

function drawBackground(ctx) {
	for(let y in rows) {
		let row = rows[y];
		for(let x in row) {
			let color = LIGHTYELLOW;
			if(row[x] == MAP_EMPTY) {
			color = LIGHTGREEN;
			}
			else if(row[x] == MAP_WALL) {
				color = NAVYBLUE;
			}
			else if(row[x] == MAP_ROCK) {
				color = GREEN;
			}
			else{
				color = LIGHTGREEN;
			}
			
			drawRect(ctx, color, x * REC_SIZE, y * REC_SIZE, REC_SIZE, REC_SIZE);
		}
	}
	
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground(ctx);
	P1.move();
	P1.setBomb();
	/*if(rightPressed) {
		manX += 4;
		if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)] == "."){
			if(rows[Math.floor((manY+manHeight)/50)][Math.floor((manX+manWidth)/50)] != "."||rows[Math.floor((manY)/50)][Math.floor((manX+manWidth)/50)] != "."){
				manX -= 4;
			}
		}
		
		
		if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)] == "B"){
			if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)+1] != "."){
				manX -= 4;
			}
		}
		
	}
	else if(leftPressed) {
		manX -= 4;
		if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)] == "."){
			if(rows[Math.floor(manY/50)][Math.floor(manX/50)] != "."||rows[Math.floor((manY+manHeight)/50)][Math.floor(manX/50)] != "."){
				manX += 4;
			}
		}
	}
	if(downPressed) {
		manY += 4;
		if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)] == "."){
			if(rows[Math.floor((manY+manHeight)/50)][Math.floor((manX+manWidth)/50)] != "."||rows[Math.floor((manY+manHeight)/50)][Math.floor(manX/50)] != "."){
				manY -= 4;
			}
		}
	}
	else if(upPressed) {
		manY -= 4;
		if(rows[Math.floor((manY+manHeight/2)/50)][Math.floor((manX+manWidth/2)/50)] == "."){
			if(rows[Math.floor(manY/50)][Math.floor((manX+manWidth)/50)] != "."||rows[Math.floor(manY/50)][Math.floor(manX/50)] != "."){
				manY += 4;
			}
		}
	}
	if(enterPressed && time == 0) {
		time = 100;
		bombX = Math.floor(manX/50)*50+5;
		bombY = Math.floor(manY/50)*50+5;
		rows[Math.floor(manY/50)][Math.floor(manX/50)] = "B";
	}
	if(time > 0){
		drawRect(ctx, RED, bombX, bombY, manWidth, manHeight);
		time -=1;
	}
	if(time == 1){
		console.log(time);
		rows[Math.floor(bombY/50)][Math.floor(bombX/50)] = ".";
	}*/
	drawRect(ctx, GOLD, P1.x, P1.y, manWidth, manHeight);
}

setInterval(draw, 10);

canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
});
