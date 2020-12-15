class Player{
	constructor(x, y, ba, bd, s){
		this.x = x;
		this.y = y;
		this.bombAmount = ba;
		this.bombDistance = bd;
		this.speed = s;
		this.settingBomb = false;
	}
	move(){
		if(this.rightPressed) {
			this.x += 4;
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "."){
				if(rows[Math.floor((this.y+manHeight)/50)][Math.floor((this.x+manWidth)/50)] != "."||rows[Math.floor((this.y)/50)][Math.floor((this.x+manWidth)/50)] != "."){
					this.x -= 4;
				}
			}
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "B"){
				if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)+1] != "."){
					this.x -= 4;
				}
			}
		}
		else if(this.leftPressed) {
			this.x -= 4;
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "."){
				if(rows[Math.floor(this.y/50)][Math.floor(this.x/50)] != "."||rows[Math.floor((this.y+manHeight)/50)][Math.floor(this.x/50)] != "."){
					this.x += 4;
				}
			}
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "B"){
				if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)-1] != "."){
					this.x += 4;
				}
			}
		}
		if(this.downPressed) {
			this.y += 4;
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "."){
				if(rows[Math.floor((this.y+manHeight)/50)][Math.floor((this.x+manWidth)/50)] != "."||rows[Math.floor((this.y+manHeight)/50)][Math.floor(this.x/50)] != "."){
					this.y -= 4;
				}
			}
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "B"){
				if(rows[Math.floor((this.y+manHeight/2)/50)+1][Math.floor((this.x+manWidth/2)/50)] != "."){
					this.y -= 4;
				}
			}
		}
		else if(this.upPressed) {
			this.y -= 4;
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "."){
				if(rows[Math.floor(this.y/50)][Math.floor((this.x+manWidth)/50)] != "."||rows[Math.floor(this.y/50)][Math.floor(this.x/50)] != "."){
					this.y += 4;
				}
			}
			if(rows[Math.floor((this.y+manHeight/2)/50)][Math.floor((this.x+manWidth/2)/50)] == "B"){
				if(rows[Math.floor((this.y+manHeight/2)/50)-1][Math.floor((this.x+manWidth/2)/50)] != "."){
					this.y += 4;
				}
			}
		}
	}
	setBomb(){
		if(this.enterPressed && this.bombAmount > 0 && this.settingBomb == false) {
			this.bombAmount -= 1;
			time = 100;
			this.settingBomb = true;
			bombX = Math.floor(this.x/50)*50+5;
			bombY = Math.floor(this.y/50)*50+5;
			rows[Math.floor(this.y/50)][Math.floor(this.x/50)] = "B";
		}
		if(time > 0){
			drawRect(ctx, RED, bombX, bombY, manWidth, manHeight);
			time -=1;
		}
		if(time == 1){
			console.log(time);
			rows[Math.floor(bombY/50)][Math.floor(bombX/50)] = ".";
			this.bombAmount += 1;
		}
	}
}
var P1 = new Player(55, 55, 1, 1, 4);
var P2 = new Player(205,55, 1, 1, 4);