
var map = `
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
x//////////////////xx//////////////////xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiix
x///////////////////x//////////////////xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiix
x///////////////////x//////////////////xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxxxxxxxxxxxx
x//////////////////xx//////////////////xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxiiiiiixxxxxx
x//////////////////////////////////////xiiiiiiiixixiiiiiiiiiiiiiiixxxxiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxxiiiiiiiixxxxx
x//////////////////////////////////////xiiiiiiiixxxiiiiiiiiiiiiiiiiiixiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxiiiiiiiiiixxxx
x/////////////////xxx//////////////////xxiixiiiixxxiiiiiiiiiiiiiiixiixiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixiiiiixxxiiiiiiiiiixxxx
x/////x///x/x//x///x///////////////////iiiixxiiiixiiiiiixxxxiiiiiixxxxiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxiiiiiiiiiiiixxx
x////xx////x//x////////////////////////iiixxxiiiiiiiiiiiiiixiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxxxiiiiiiiiixxxiiiiiiiiiixxiiiiiiiiiiiiiixxxx
x///xxx///////////////xx///xx/////////xxxxxxxiiixiiiiixiixixiiiiiiiiixiiiiiiiiiiiiiiiiiiiiiiixiiiiiiiiiiiixiiiiiiiiixxxiiixiixxiixiiixxix
x..xxxx............xxxii////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiixxxiiixxiixxxxxxxixxxxxxxxxxxiixxxxxixxxxxxxxiiiiiiixiiiiiiiixiiiiix
xxxxxxxx.x.xxxxxxxxxiiix............xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiiiiiixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiiiiiiiiiiiiiiiiixxxx
xxxxxxxxxxxxxxxxxxiiiixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiiiixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiiiiiiiiiiixxx
xxxxxxxxxxxxxxxxxxiixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxiiiiiiiiiiiiiiiix
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxixxiiiiiiiiiixxix
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxixxixxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
`;
var map2 = `
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxiiiiiiiiiiiiiiiiiixxxxxxxx
iiiiiixxiiiiiiiiiiiiiiiiiiiixxxxxxx
iiixxxxiiiiiiiiiiiiiiiiiiiiiixxxxx
iiixxxiiiiiiiiiiiiiiiiiiiiiiiixxxx
iiixxxiiiiixiiiiiiiiiiiiiixiiixxxx
iiixxiiiiiiixxiiiiiiiiiixxiiiiixxx
iixxiiiiiiiiiiiiiiiiiiiiiiiiiiiixxxxxxx
ixxxiiiiiiiixiiiiixxiiiiixiiiiiixxxxiix
iixiiiiiiiixiiiiiiiiiiiiiixiiiiiiiiiixx
iixiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiixxx
xxxxxiiiixiiiiiiiiiiiiiiiiiixiixiixxx
xxiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiix
xxixxxiiiiiiiiiiiixxiiiiiiiiiiiiixxix
xxxxxxxiiixxixxiiiiiiiiiixixxiiiixxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
`;
var map3 = `
xxxxxxxxxxxxxxxxxxxx
x...++........++...x
x..++..xx..xx..++..x
x.+++..........+++.x
x++++..x....x..++++x
x+x++..........++x+x
x+x++....xx....++x+x
x+x+++........+++x+x
x++xx++......++xx++x
x.++++++++x+++x+++.x
x..++++++x+++++++..x
x...++++++x+++++...x
xxxxxxxxxxxxxxxxxxxx
`;
var maps = [map, map2, map3];
var mousePos;
var mouseDown = false;
const overs = ["你死了", "You Died", "Impostor", "&emsp;死&emsp;", "wasted", "&ensp;失敗&ensp;"];
var over;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var color = LIGHTYELLOW;
var manHeight = 60;
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

var nowMap = maps[0];

let rows = nowMap.trim().split("\n").map(l => [...l]);

var canvas = document.createElement("canvas");
canvas.width = 1050;
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
var x = document.getElementById("touchedBtn"); 
function playAudio() { 
	x.muted = false; 
	x.volume = 0.1;
    x.play(); 
} 

function pauseAudio() { 
    x.pause(); 
} 
canvas.addEventListener('mousedown', function (evt) {
	
	document.getElementById('audio').muted = false; 
	document.getElementById('audio').autoplay = true;
	document.getElementById('audio').play();
	document.getElementById('audio').volume = 0.1;
	mouseDown = true;
	mousePos = getMousePos(canvas, evt);
	console.log("X: " + Math.floor(mousePos.x/50) + ",Y: " + Math.floor(mousePos.y/50));
	console.log(40-Math.floor((P1.x+manWidth/2)/50));
	});
	
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "d" || e.key == "D") {
        P1.rightPressed = true;
    }
    else if(e.key == "a" || e.key == "A") {
        P1.leftPressed = true;
    }
    if(e.key == "w" || e.key == "W") {
        P1.upPressed = true;
    }
    else if(e.key == "s" || e.key == "S") {
        P1.dPressed = true;
    }
    if(e.key == "r" || e.key == "R") {
        P1.RPressed = true;
    }
    if(e.key == "Shift") {
        P1.downPressed = true;
		P1.y -= 5;
    }
    else if(e.key == " ") {
        P1.jumpPressed = true;
    }
    if(e.key == "Enter") {
        P1.enterPressed = true;
	}
}

function keyUpHandler(e) {
    if(e.key == "d" || e.key == "D") {
        P1.rightPressed = false;
    }
    else if(e.key == "a" || e.key == "A") {
        P1.leftPressed = false;
    }
    if(e.key == "w" || e.key == "W") {
        P1.upPressed = false;
    }
    else if(e.key == "s" || e.key == "S") {
        P1.dPressed = false;
    }
    if(e.key == "r" || e.key == "R") {
        P1.RPressed = false;
    }
    if(e.key == "Shift") {
		if(bg.indexOf(rows[Math.floor((P1.y-15)/50)][Math.floor((P1.x+P1.width)/50)]) == -1 || bg.indexOf(rows[Math.floor((P1.y-15)/50)][Math.floor(P1.x/50)]) == -1){
			P1.downPressed = true;
		}
		else{
			P1.downPressed = false;
			console.log(bg.indexOf(rows[Math.floor((P1.y+15)/50)][Math.floor((P1.x+P1.width)/50)]));
			P1.stand();
		}
        
		
    }
    else if(e.key == " ") {
        P1.jumpPressed = false;
    }
    if(e.key == "Enter") {
        P1.enterPressed = false;
		P1.settingBomb = false;
    }
}
var minX;
var maxX;
function drawBackground(ctx) {
	
		//console.log("min: "+minX+" max: "+maxX);
	//console.log(Math.floor((P1.x+manWidth/2)/50));
	for(let y in rows) {
		let row = rows[y];
		if(Math.floor((P1.x+manWidth/2)/50) < 11){
			minX = 0;
		}
		else{
			minX = (P1.x+manWidth/2 - 11* REC_SIZE)/50;
		}
		maxX = 21 + minX;
		for(let x in row) {
			if(row[x] == MAP_EMPTY) {
			color = LIGHTGREEN;
			}
			else if(row[x] == MAP_ROCK) {
				color = GREEN;
			}
			else if(row[x] == Distance) {
				color = LIGHTRED;
			}
			else if(row[x] == MAP_SKY) {
				color = SKYBLUE;
			}
			else if(row[x] == MAP_CLOUD) {
				color = CLOUD;
			}
			else if(row[x] == MAP_IN) {
				if(rows[Math.floor((P1.y+P1.height/2)/50)][Math.floor((P1.x+P1.width/2)/50)]=="i"){
					color = GRAY;
				}
				else{
					color = NAVYBLUE;
				}
				
			}
			else{
				color = NAVYBLUE;
			}
			drawRect(ctx, color, (x-minX) * REC_SIZE, y * REC_SIZE, REC_SIZE, REC_SIZE);
			
			
			
		}
	}
	
}
function drawWall(ctx) {
	
		//console.log("min: "+minX+" max: "+maxX);
	//console.log(Math.floor((P1.x+manWidth/2)/50));
	for(let y in rows) {
		let row = rows[y];
		if(Math.floor((P1.x+manWidth/2)/50) < 11){
			minX = 0;
		}
		else{
			minX = (P1.x+manWidth/2 - 11* REC_SIZE)/50;
		}
		maxX = 21 + minX;
		for(let x in row) {
			if(row[x] == MAP_WALL) {
				drawRect(ctx, NAVYBLUE, (x-minX) * REC_SIZE, y * REC_SIZE, REC_SIZE, REC_SIZE);
			}
			else if(row[x] == MAP_IN) {
				if(rows[Math.floor((P1.y+P1.height/2)/50)][Math.floor((P1.x+P1.width/2)/50)]=="i"){
					drawRect(ctx, GRAY, (x-minX) * REC_SIZE, y * REC_SIZE, REC_SIZE, REC_SIZE);
				}
				else{
					drawRect(ctx, NAVYBLUE, (x-minX) * REC_SIZE, y * REC_SIZE, REC_SIZE, REC_SIZE);
				}
				
			}
		}
	}
	
}
var isEnd = false;
var spawnTime = 1000;
document.getElementById("over").innerHTML = overs[getRandomInt(6)];
function draw() {
		
	
	if(P1.health != 0 && !isEnd){
		
		if(P1.x > 5950){
			P1.health += 50;
			document.getElementById('audio').src = "8bit Master of Puppets.mp3";
			nowMap = maps[1];
			rows = nowMap.trim().split("\n").map(l => [...l]);
			P1.x = 250;
			P1.y = 400;
			AIs.splice(0, 15);
			Chests = [];
			var B1 = new Boss(915, 250, 1500, 100, 70);
			AIs.push(
				B1,
				new soldier(100, 550, 2, 100, 70, 40, 3, 120, 120, -1),
				new soldier(1750, 550, 2, 100, 70, 40, 3, 120, 120, 1),
			)
			Chests.push(
				new Chest(925, 605, 30, 40)
			)
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground(ctx);
		
		if(spawnTime == 0){
			if(AIs.length <= 4){
				var Rx = getRandomInt(150) + 700; 
				var Rx2 = getRandomInt(150) + 1001; 
				AIs.push(
					new soldier(Rx, 110, 2, 100, 70, 40, 2, 100, 120, 1),
					new soldier(Rx2, 110, 2, 100, 70, 40, 2, 100, 120, 1),
					new AI(350, 210, 2, 100, 60, 40, 2, 70, 120)
				)
				switch(Chests.length){
					case 0:
						Chests.push(
							new Chest(925, 605, 30, 40)
						)
						break;
					case 1:
						Chests = [];
						Chests.push(
							new Chest(925, 605, 30, 40),
							new Chest(305, 655, 30, 40)
						)
						break;
					case 2:
						Chests = [];
						Chests.push(
							new Chest(925, 605, 30, 40),
							new Chest(305, 655, 30, 40),
							new Chest(455, 505, 30, 40)
						)
						break;
					default:
						break;
					
				}
			}
			spawnTime = 1000;
		}
		switch (nowMap){
			case maps[0]:
				clouds.forEach((c) => {
				c.update();
				})
				break;
			case maps[1]:
				spawnTime -= 1;
				break;
			default:
				break;
		}
		drawWall(ctx);
		if(srcTime > 0){
			srcTime -= 1;
			src = 'character-02.png';
		}
		else{
			src = 'character-01.png';
		}
		
		Chests.forEach((c, index) => {
			c.update();
			if(c.x < P1.x + P1.width &&
			   c.x + c.width > P1.x &&
			   c.y < P1.y + P1.height &&
			   c.y + c.height > P1.y){
				P1.gun = guns[getRandomInt(5)+1];
				P1.ammo = P1.gun.ammo;
				P1.magazine = P1.gun.magazine;
				Chests.splice(index, 1);
				document.getElementById('getGun').muted = false; 
				document.getElementById('getGun').autoplay = true;
				document.getElementById('getGun').play();
				document.getElementById('getGun').volume = 0.1;
			}
		})
		AIs.forEach((ai, index) => {
			ai.update();
			projectiles.forEach((projectile, pIndex) => {
				const dist_x = Math.floor((projectile.x - ai.x - manWidth/2)/50)
				const dist_y = Math.floor((projectile.y - ai.y - manHeight/2)/50)
				const dist = Math.hypot(projectile.x - ai.x,
				projectile.y - ai.y)
				if(projectile.x < ai.x + ai.width &&
				   projectile.x + projectile.width > ai.x &&
				   projectile.y < ai.y + ai.height &&
				   projectile.y + projectile.height > ai.y){
					ai.health -= P1.gun.damage;
					
					if(ai.time<ai.initTime){
						ai.time = ai.initTime;
					}
					if(ai.health <= 0){
						if(ai.constructor.name == "Boss"){
							isEnd = true;
						}
						AIs.splice(index, 1);
					}
					else if(ai.health > 0){
						ai.y -= 20;
					}
					projectiles.splice(pIndex, 1);
				}
			})
		})
		enemyProjectiles.forEach((EP, epIndex) => {
				const dist_x = Math.floor((EP.x + EP.width*2 - P1.x - P1.width/2)/50)
				const dist_y = Math.floor((EP.y + EP.height - P1.y - P1.height/2)/50)
				const dist = Math.hypot(EP.x - P1.x - P1.width/2,
				EP.y - P1.y - P1.height/2)
				if(EP.x < P1.x + P1.width &&
				   EP.x + EP.width > P1.x &&
				   EP.y < P1.y + P1.height &&
				   EP.y + EP.height > P1.y){
					console.log("hit");
					srcTime = 30;
					P1.health -= 10;
					P1.y -= 20;
					var hit = document.createElement('audio');
					hit.src = "sound/270332__littlerobotsoundfactory__hit-03.wav";
					hit.muted = false; 
					hit.play();
					hit.volume = 0.1;
					if(P1.health < 0){
						P1.health = 0;
					}
					enemyProjectiles.splice(epIndex, 1);
				}
			})
			
		enemyProjectiles.forEach((EP, epIndex) => {
			EP.update();
			if(bg.indexOf(rows[Math.floor((EP.y + EP.height/2)/50)][Math.floor((EP.x + EP.width)/50)]) == -1 || bg.indexOf(rows[Math.floor((EP.y + EP.height/2)/50)][Math.floor(EP.x/50)]) == -1 ){
				enemyProjectiles.splice(epIndex, 1);
			}
		})
		projectiles.forEach((projectile, pIndex) => {
			projectile.update();
			if(bg.indexOf(rows[Math.floor((projectile.y + projectile.height/2)/50)][Math.floor((projectile.x + projectile.width)/50)]) == -1 || bg.indexOf(rows[Math.floor((projectile.y + projectile.height/2)/50)][Math.floor(projectile.x/50)]) == -1 ){
				projectiles.splice(pIndex, 1);
			}
		})
		P1.update();
		document.body.style.cursor = "url('./aim.png'),auto";
	}
	else if(P1.health == 0){
		
		document.getElementById('audio').muted = true; 
		drawRect(ctx, NAVYBLUE, 0, 0, canvas.width, canvas.height);
		
		document.getElementById("gun").innerHTML ="";
		document.getElementById("restart").style.display = "inline";
		document.getElementById("over").style.display = "inline";
		
		
	}
	else if(isEnd){
		document.getElementById('audio').muted = true; 
		drawRect(ctx, NAVYBLUE, 0, 0, canvas.width, canvas.height);
		
		document.getElementById("gun").innerHTML ="";
		document.getElementById("restart").style.display = "inline";
		document.getElementById("restart").style.width = "40px";
		document.getElementById("restart").style.height = "60px";
		document.getElementById("over").innerHTML = "你贏了！";
		document.getElementById("over").style.color = "white";
		document.getElementById("over").style.display = "inline";
	}
}
		document.getElementById("restart").style.display = "none";
function restart(){
	srcTime = 0;
	document.getElementById('audio').muted = false; 
	document.getElementById('audio').currentTime = 0;
	nowMap = maps[0];
	rows = nowMap.trim().split("\n").map(l => [...l]);
	P1.x = 100;
	P1.y = 400;
	P1.health = 100;
	P1.gun = guns[0];
	P1.ammo = P1.gun.ammo;
	document.getElementById("over").style.display = "none";
	document.getElementById("restart").style.display = "none";
	AIs = [];
	AIs.push(
		new AI(750, 310, 2, 100, 60, 40, 2, 70, 120),
		new AI(950, 110, 2, 100, 60, 40, 2, 25, 120),
		new AI(1500, 410, 3, 80, 60, 40, 2, 40, 80),
		new AI(1400, 310, 3, 80, 60, 40, 2, 40, 80),
		new soldier(2900, 410, 3, 100, 70, 40, 3, 30, 140, 1),
		new AI(3500, 410, 3, 100, 60, 40, 2, 40, 80),
		new AI(4000, 310, 3, 100, 60, 40, 2, 40, 80),
		new soldier(3400, 300, 0, 100, 70, 40, 2, 80, 90, 1),
		new soldier(4300, 300, 0, 100, 70, 40, 2, 150, 60, 1),
		new soldier(5250, 500, 0, 100, 70, 40, 40, 20, 350, 1),
		new FORT(5595, 355, 40, 40),
		new AI(4400, 310, 3, 80, 60, 40, 2, 40, 80),
		new AI(4500, 500, 1, 80, 40, 80, 5, 40, 80),
		new FORT(940, 555, 40, 40)
	)
	initClouds();
	initChests();
}
function start(){
	document.getElementById('audio').loop = true;
	document.getElementById('audio').src = "8bit Another One Bites The Dust.mp3";
	document.getElementById('audio').muted = false; 
	document.getElementById('audio').autoplay = true;
	document.getElementById('audio').play();
	document.getElementById('audio').volume = 0.05;
	setInterval(draw, 10);
	document.getElementById("start").style.display = "none";
	
	x.muted = false; 
    x.play(); 
}
function intro(){
	document.getElementById("intro").style.display = "block";
	document.getElementById("main").style.display = "none";
	
}
setInterval(()=>{clouds.push(
		new Cloud(0, getRandomInt(300)+100, getRandomInt(80)+20, getRandomInt(30)+20, getRandomInt(15)/100),
		new Cloud(0, getRandomInt(300)+100, getRandomInt(50)+20, getRandomInt(40)+20, getRandomInt(15)/100),
	)}, 20000);
canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
	
});
document.getElementById("startBtn").addEventListener('mouseenter', function(evt) {
    mousePos = getMousePos(canvas, evt);
	x.muted = false; 
    playAudio();
	
});
