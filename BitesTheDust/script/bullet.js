class Bullet{
	constructor(x, y, Xs, Ys, w, h){
		this.x = x;
		this.y = y;
		this.Xspeed = Xs;
		this.Yspeed = Ys;
		this.width = w;
		this.height = h;
	}
	
	update(){
		this.x += this.Xspeed;
		this.y += this.Yspeed;
		if(minX == 0){
			drawRect(ctx, RED, this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, RED, this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
	
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
class Cloud{
	constructor(x, y, w, h, s){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = s;
	}
	update(){
		this.x += this.speed;
		if(minX == 0){
			drawRect(ctx, "rgba(255,255,255,0.93)", this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, "rgba(255,255,255,0.95)", this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
}
class Mist{
	constructor(x, y, w, h, s){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = s;
	}
	update(){
		this.x += this.speed;
		if(minX == 0){
			drawRect(ctx, "rgba(255,255,255,0.6)", this.x, this.y, this.width, this.height);
		}
		
		else{
			drawRect(ctx, "rgba(255,255,255,0.6)", this.x-minX * REC_SIZE, this.y, this.width, this.height);
		}
	}
}
class Gun{
	constructor(Xs, Ys, w, h, t, ammo, r, d, n, range, aim, magazine){
		this.Xspeed = Xs;
		this.Yspeed = Ys;
		this.width = w;
		this.height = h;
		this.time = t;
		this.ammo = ammo;
		this.reload = r;
		this.damage = d;
		this.name = n;
		this.range = range; //偏差值
		this.aim = aim;
		this.magazine = magazine;
	}
}
var clouds = [];
function initClouds(){
	clouds = [];
	clouds.push(
		new Cloud(750, 170, 80, 30, 0.07),
		new Cloud(860, 200, 70, 50, 0.04),
		new Cloud(50, 100, 80, 30, 0.12),
		new Cloud(55, 80, 55, 30, 0.06),
		new Cloud(655, 145, 35, 30, 0.05),
		new Cloud(665, 185, 35, 30, 0.06),
		new Cloud(625, 165, 95, 34, 0.05),
		new Cloud(1380, 150, 70, 35, 0.05),
		new Cloud(1250, 170, 50, 45, 0.06),
		new Cloud(1350, 370, 55, 35, 0.07),
		new Cloud(1080, 320, 60, 55, 0.06),
		new Cloud(1620, 250, 50, 45, 0.05),
		new Cloud(1820, 250, 45, 45, 0.06),
		new Cloud(2020, 270, 65, 55, 0.06),
		new Cloud(1220, 200, 90, 65, 0.04),
		new Cloud(100, 100, 80, 20, 0.09),
		new Cloud(355, 80, 105, 40, 0.06),
		new Cloud(440, 120, 60, 40, 0.05),
		new Cloud(480, 450, 40, 10, 0.07),
		new Cloud(400, 500, 120, 30, 0.06),
		new Cloud(390, 500, 60, 40, 0.06),
		new Cloud(420, 480, 40, 40, 0.06),
		new Cloud(200, 300, 120, 30, 0.05),
		new Cloud(490, 350, 60, 40, 0.04),
		new Cloud(320, 400, 40, 40, 0.06),
	)
}
initClouds();
//                    Xs, Ys, w, h, t, ammo, r, d, n, range, magazine
Pistol      = new Gun(7, 5, 15, 8, 45, 12, 100, 35, ".45手槍", 2, 1, -1);
SMG         = new Gun(12, 7, 6, 5, 5, 20, 100, 10, "衝鋒槍", 15, 4, 10);
Rifle       = new Gun(10, 6, 14, 8, 15, 15, 150, 30, "自動步槍", 4, 2, 3);
TriRifle    = new Gun(9, 6, 14, 8, 5, 3, 50, 15, "三連發步槍", 3, 1, 20);
TrashRifle  = new Gun(8, 5, 14, 8, 18, 13, 150, 25, "破爛的步槍", 13, 9, 3);
SniperRifle = new Gun(18, 8, 17, 8, 100, 6, 200, 110, "狙擊步槍", 30, 29, 2);
const guns = [Pistol, SMG, Rifle, TrashRifle, SniperRifle, TriRifle];
const projectiles = [];
const enemyProjectiles = [];