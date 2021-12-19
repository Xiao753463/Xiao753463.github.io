var img = new Image();  
var src = 'character-01.png';
var srcTime = 0;
img.addEventListener("load", function() {
}, false);
img.src = src;
class Player{
	constructor(x, y, s){
		this.x = x;
		this.y = y;
		this.speed = s;
		this.jumpf = 0;
		this.canJump = true;
		this.direction = 1;
		this.Ydirection = 0;
		this.time = 0;
		this.height = 60;
		this.health = 100;
		this.width = 40;
		this.gun = guns[0];
		this.ammo = this.gun.ammo;
		this.magazine = this.gun.magazine
	}
	shoot(){
		if(!this.reloading && this.RPressed && this.ammo != this.gun.ammo && (this.magazine > 1 || this.magazine <= -1)){
			this.ammo = 0;
		}
		if(this.ammo == 0){
			if(this.magazine == 0){
				this.gun = guns[0];
				this.ammo = this.gun.ammo;
				this.time = this.gun.time;
				this.reloading = false;
			}
			else if(!this.reloading){
				var gunReload = document.createElement('audio');
				gunReload.src = "sound/8bit-gun-reload-1.wav";
				gunReload.muted = false; 
				gunReload.play();
				gunReload.volume = 0.1;
				this.magazine -= 1;
				this.time = this.gun.reload;
				this.reloading = true;
			}
			else if(this.time == 0){
				this.ammo = this.gun.ammo;
				this.reloading = false;
			}
		}
		if(this.enterPressed && this.time <= 0 && this.ammo != 0){
			
			var gunShot = document.createElement('audio');
			gunShot.src = "sound/8bit-gunshot-34.wav";
			gunShot.muted = false; 
			gunShot.play();
			gunShot.volume = 0.1;
			this.ammo -= 1;
			this.time = this.gun.time;
			if(this.direction == 1){
				projectiles.push(
					new Bullet(this.x + this.width/2, this.y+2, this.direction*this.gun.Xspeed, this.Ydirection*this.gun.Yspeed+(getRandomInt(this.gun.range+this.aim)-(this.gun.range+this.aim)/2)/5, this.gun.width, this.gun.height)
					
				)
			}
			else{
				projectiles.push(
					new Bullet(this.x-20, this.y+2, this.direction*this.gun.Xspeed, this.Ydirection*this.gun.Yspeed+(getRandomInt(this.gun.range+this.aim)-(this.gun.range+this.aim)/2)/5, this.gun.width, this.gun.height)
				)
			}
		}
		
	}
	move(){
		if(this.rightPressed) {
			this.direction = 1;
			this.y -= 5;
			this.x += 4;
			if(bg.indexOf(rows[Math.floor((this.y+this.height/2)/50)][Math.floor((this.x+this.width/2)/50)]) != -1){
				if(bg.indexOf(rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width)/50)]) ==-1 ||bg.indexOf(rows[Math.floor((this.y)/50)][Math.floor((this.x+this.width)/50)]) == -1){
					this.x -= 4.1;
					this.x = Math.floor(this.x);
				}
			}
			this.y += 5;
		}
		else if(this.leftPressed) {
			this.direction = -1;
			this.y -= 5;
			this.x -= 4;
			if(bg.indexOf(rows[Math.floor((this.y+this.height/2)/50)][Math.floor((this.x+this.width/2)/50)]) != -1){
				if(bg.indexOf(rows[Math.floor(this.y/50)][Math.floor(this.x/50)]) ==-1 ||bg.indexOf(rows[Math.floor((this.y+this.height)/50)][Math.floor(this.x/50)]) ==-1){
					this.x += 4.1;
					this.x = Math.ceil(this.x);
				}
			}
			this.y += 5;
		}
		if(this.upPressed) {
			this.Ydirection = -1;
		}
		
		else if(this.dPressed) {
			this.Ydirection = 1;
		}
		else{
			this.Ydirection = 0;
		}
		if(this.downPressed) {
			this.height = 45;
			this.aim = -this.gun.aim;
		}
		else{
			this.height = 60;
			this.aim = 0;
		}
		if(this.jumpPressed && this.isGrounded && !this.downPressed && this.canJump && this.jumpf<12) {
			this.jumpf += 2;
		}
		else{
			this.canJump = false;
		}
		if(!this.jumpPressed && !this.isGrounded){
			this.canJump = false;
		}
	}
	stand(){
		this.y -= 15;
		this.y = Math.floor((this.y)/50)*50;
	}
	jump(){
		if(this.jumpf > 0){
			this.jumpf -= 1;
			this.y -= 10;
		}
		if(bg.indexOf(rows[Math.floor((this.y-5)/50)][Math.floor((this.x+this.width)/50)]) == -1 || bg.indexOf(rows[Math.floor((this.y-5)/50)][Math.floor(this.x/50)]) == -1){
			this.jumpf = 0;
			this.canJump = false;
		}
	}
	gravity(){
		this.Rbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width-5)/50)];
		this.Lbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+5)/50)];
		if(bg.indexOf(this.Rbottom) != -1 && bg.indexOf(this.Lbottom) != -1){
			this.y += 5;
		}
		else if(bg.indexOf(this.Rbottom) == -1 || bg.indexOf(this.Lbottom) == -1){
			this.isGrounded = true;
			this.canJump = true;
		}
	}
	update(){
		img.src = src;
		ctx.drawImage(img,60,630,150,150);
		drawRect(ctx, RED, 50, 850, this.health*2, 20);
		if(this.time>0){
			if(!this.reloading){
				drawRect(ctx, "green", 55, 780, this.time*1.5, 10);
			}
			else{
				drawArc(ctx, "green", 65, 780, 50, 50, 10, this.time/this.gun.reload*(Math.PI)/2);
			}
		}
		
		document.getElementById("gun").innerHTML = "武器: " + this.gun.name + " " + this.ammo + "/" + this.gun.ammo;
		if(this.gun.magazine >= 0){
			document.getElementById("gun").innerHTML += " x" + this.magazine;
		}
		
		this.time -= 1;
		this.shoot();
		this.gravity();
		this.jump();
		this.move();
		if(minX == 0){
			drawRect(ctx, GOLD, P1.x-0.5, P1.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, GOLD, P1.x-minX * REC_SIZE, P1.y, this.width, this.height);
		}
	}
}
var P1 = new Player(100, 420, 4);