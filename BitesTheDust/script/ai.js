class AI{
	constructor(x, y, s, H, h, w, a, t, r){
		this.x = x;
		this.y = y;
		this.speed = s;
		this.jumpf = 0;
		this.direction = 1;
		this.health = H;
		this.time = t;
		this.reload = r;
		this.height = h;
		this.width = w;
		this.ammo = a;
		this.initAmmo = this.ammo;
		this.initTime = this.time;
		this.initHealth = this.health;
		this.isClosed = false;
	}
	
	shoot(){
		if(this.ammo > 0){
			if(this.time <= 0 && this.isClosed){
				this.time = this.initTime;
				this.ammo -= 1;
				enemyProjectiles.push(
					new Bullet(this.x-10, this.y+this.height/20+6, -6*this.direction, 0, 16, 12)
				)
				
			}
		}
		else{
			this.time = this.reload;
			this.ammo = this.initAmmo;
		}
	}
	hunting(){
		if(Math.sqrt(Math.pow(this.x-P1.x, 2)+Math.pow(this.y-P1.y, 2))<300){
			if(Math.abs(this.y-P1.y)<=100){
				this.isClosed = true;
			}
			else{
				this.isClosed = false;
			}
			
			if(this.y > 0){
				if(this.x <= P1.x-this.width-100 || (Math.abs(this.y-P1.y) > 30 && this.x <= P1.x-this.width)){
					this.direction = -1;
					this.y -= 5;
					this.x += this.speed;
					if(bg.indexOf(rows[Math.floor((this.y+this.height/2)/50)][Math.floor((this.x+this.width/2)/50)]) != -1){
						if(bg.indexOf(rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width)/50)]) == -1||bg.indexOf(rows[Math.floor((this.y)/50)][Math.floor((this.x+this.width)/50)]) == -1){
							this.x -= this.speed;
							if(this.time <= 0){
								this.time = 60;
								this.jumpf = 60;
							}
						}
					}
					this.y += 5;
				}
				else if(this.x > P1.x+this.width+100 || (Math.abs(this.y-P1.y) > 30 && this.x > P1.x+this.width)){
					this.direction = 1;
					this.y -= 5;
					this.x -= this.speed;
					if(bg.indexOf(rows[Math.floor((this.y+this.height/2)/50)][Math.floor((this.x+this.width/2)/50)]) != -1){
						if(bg.indexOf(rows[Math.floor(this.y/50)][Math.floor(this.x/50)]) == -1||bg.indexOf(rows[Math.floor((this.y+this.height)/50)][Math.floor(this.x/50)]) == -1){
							this.x += this.speed;
							if(this.time <= 0){
								this.time = 60;
								this.jumpf = 50;
							}
							
						}
					}
					this.y += 5;
				}
			}
		}
		if(Math.abs(this.y-P1.y)<=100){
			if(this.health < this.initHealth){
				this.isClosed = true;
			}
		}
		else{
			this.isClosed = false;
		}
	}
	jump(){
		if(this.jumpf > 0){
			this.jumpf -= 5;
			this.y -= 10;
		}
		if(bg.indexOf(rows[Math.floor((this.y-5)/50)][Math.floor((this.x+this.width)/50)]) == -1|| bg.indexOf(rows[Math.floor((this.y-5)/50)][Math.floor(this.x/50)]) == -1){
			this.jumpf = 0;
		}
	}
	gravity(){
		this.Rbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width)/50)];
		this.Lbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor(this.x/50)];
		if(bg.indexOf(this.Rbottom) != -1 && bg.indexOf(this.Lbottom) != -1){
			this.y += 5;
		}
		else if(bg.indexOf(this.Rbottom) == -1 && bg.indexOf(this.Lbottom) == -1){
			this.isGrounded = true;
		}
	}
	update(){
		this.shoot();
		this.time -= 1;
		this.hunting();
		this.gravity();
		this.jump();
		if(minX == 0){
			drawRect(ctx, RED, this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, RED, this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
}

class soldier{
	constructor(x, y, s, H, h, w, a, t, r, d){
		this.x = x;
		this.y = y;
		this.direction = d;
		this.health = H;
		this.time = t;
		this.reload = r;
		this.height = h;
		this.width = w;
		this.ammo = a;
		this.initAmmo = this.ammo;
		this.initTime = this.time;
		this.initHealth = this.health;
	}
	
	shoot(){
		if(this.ammo > 0){
			if(this.time <= 0){
				this.time = this.initTime;
				this.ammo -= 1;
				if(this.direction == 1){
					enemyProjectiles.push(
						new Bullet(this.x-10, this.y+this.height/2-25, -4*this.direction, 0, 16, 10)
					)
				}
				if(this.direction == -1){
					enemyProjectiles.push(
						new Bullet(this.x, this.y+this.height/2-25, -4*this.direction, 0, 16, 10)
					)
				}
				
			}
		}
		else{
			this.time = this.reload;
			this.ammo = this.initAmmo;
		}
	}
	lie(){
		if(this.time > this.initTime && !this.isSquat){
			this.height -= 40;
			this.width += 40;
			this.isSquat = true;
		}
		else if(this.time == 0 && this.isSquat){
			this.height += 40;
			this.width -= 40;
			this.isSquat = false;
			this.y -= 40;
		}
	}
	squat(){
		if(this.time > this.initTime && !this.isSquat){
			this.height -= 30;
			this.isSquat = true;
		}
		else if(this.time == 0 && this.isSquat){
			this.height += 30;
			this.isSquat = false;
			this.y -= 30;
		}
	}
	gravity(){
		this.Rbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width)/50)];
		this.Lbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor(this.x/50)];
		if(bg.indexOf(this.Rbottom) != -1 && bg.indexOf(this.Lbottom) != -1){
			this.y += 5;
		}
		else if(bg.indexOf(this.Rbottom) == -1 && bg.indexOf(this.Lbottom) == -1){
			this.isGrounded = true;
		}
	}
	update(){
		this.squat();
		this.shoot();
		this.time -= 1;
		this.gravity();
		if(minX == 0){
			drawRect(ctx, RED, this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, RED, this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
	
}
class FORT{
	constructor(x, y, h, w){
		this.x = x;
		this.y = y;
		this.time = 0;
		this.height = h;
		this.width = w;
	}
	shoot(){
		if(this.time <= 0){
			this.time = 150;
			enemyProjectiles.push(
				new Bullet(this.x-10, this.y+this.height/2+8, -4, 0, 16, 12),
				new Bullet(this.x-10, this.y+this.height/2+8, 0, -4, 10, 12)
			)
			
		}		
	}
	update(){
		this.shoot();
		this.time -= 1;
		if(minX == 0){
			drawRect(ctx, RED, this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, RED, this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
}
class Boss{
	constructor(x, y, H, h, w){
		this.x = x;
		this.y = y;
		this.health = H;
		this.t = 0;
		this.height = h;
		this.width = w;
		this.INIThealth = this.health;
	}
	gravity(){
		this.Rbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor((this.x+this.width)/50)];
		this.Lbottom = rows[Math.floor((this.y+this.height)/50)][Math.floor(this.x/50)];
		if(bg.indexOf(this.Rbottom) != -1 && bg.indexOf(this.Lbottom) != -1){
			this.y += 5;
		}
		else if(bg.indexOf(this.Rbottom) == -1 && bg.indexOf(this.Lbottom) == -1){
			this.isGrounded = true;
		}
		if(this.health <= 1300 && !this.isBroken){
			
			AIs.splice(1, AIs.length-1);
			this.y += this.height;
			this.width -= 4;
			this.x += 2;
			this.height -= 4;
			this.y += 2;
			this.isBroken = true;
		}
	}
	shoot(){
		if(!this.isBroken){
			if(this.t <= 0){
				this.t = 100;
				enemyProjectiles.push(
					new Bullet(this.bulletX, this.bulletY, -this.Xs, this.Ys, 25, 25),
					new Bullet(this.bulletX, this.bulletY, this.Xs, -this.Ys, 25, 25)
				)
				for(let i = 0 ; i<=getRandomInt(2)-1;i++){
					this.Xs = getRandomInt(4)+3;
					this.Ys = 6-this.Xs;
					this.bulletX = this.x-10;
					this.bulletY = this.y+getRandomInt(this.height/2);
					enemyProjectiles.push(
						new Bullet(this.bulletX, this.bulletY, -this.Xs, this.Ys, 25, 25),
						new Bullet(this.bulletX, this.bulletY, this.Xs, -this.Ys, 25, 25)
					)
				}
			}	
		}
		else{
			if(this.t <= 0){
				this.t = 200;
				this.bulletX = this.x-10;
				this.bulletY = this.y+getRandomInt(this.height/2+20);
				enemyProjectiles.push(
					new Bullet(this.bulletX, this.bulletY, -4, 0.5, 25, 25),
					new Bullet(this.bulletX, this.bulletY, 4, 0.5, 25, 25)
				)
			}
			else if(this.t == 100){
				for(let i = 0 ; i<=getRandomInt(2);i++){
					this.bulletX = this.x-10;
					this.bulletY = this.y+getRandomInt(this.height/2);
					enemyProjectiles.push(
						new Bullet(this.bulletX, this.bulletY, -4, 0, 25, 25),
						new Bullet(this.bulletX, this.bulletY, 0, -4, 25, 25)
					)
				}
			}
			
		}
	}
	update(){
		drawRect(ctx, "rgba(80,80,80,0.9)", 225, 145, this.INIThealth/3+10, 45+10);
		drawRect(ctx, 'rgba(170,170,170,0.9)', 230, 150, this.INIThealth/3, 45);
		drawRect(ctx, RED, 230, 150, this.health/3, 45);
		this.Xs = getRandomInt(4)+3;
		this.Ys = 6-this.Xs;
		this.bulletX = this.x-10;
		this.bulletY = this.y+getRandomInt(this.height/2);
		this.gravity();
		this.shoot();
		this.t -= 1;
		if(minX == 0){
			drawRect(ctx, RED, this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, RED, this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
		
		
	}
}
class Chest{
	constructor(x, y, h, w){
		this.x = x;
		this.y = y;
		this.time = 0;
		this.height = h;
		this.width = w;
		this.totop = true;
	}
	update(){
		if(this.time < 60 && this.totop){
			this.time += 1;
			this.y += 0.1;
		}
		else if(this.time == 60 && this.totop){
			this.totop = false;
		}
		else if(this.time > 0 && !this.totop){
			this.time -= 1;
			this.y -= 0.1;
		}
		else if(this.time == 0 && !this.totop){
			this.totop = true;
		}
		else{
			
		}
		if(minX == 0){
			drawRect(ctx, "green", this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, "green", this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
}

var Chests = [];
function initChests(){
	Chests = [];
	Chests.push(
		new Chest(1375, 455, 30, 40),
		new Chest(4600, 505, 30, 40)
	)
}
initChests();
var AIs = [];
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