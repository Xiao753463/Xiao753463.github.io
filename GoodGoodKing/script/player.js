class Player{
	constructor(x, y, bd, s, bo){
		//(x,y,炸彈數量,炸彈距離,速度,炸彈編號)
		this.x = x;
		this.y = y;
		this.bombAmount = 0;
		this.bombDistance = bd;
		this.speed = s;
		this.settingBomb = false;
		this.bomb = bo;
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
		if(this.enterPressed && this.bomb.length > 0  && this.settingBomb == false) {
			//放第0項炸彈
			this.bomb[0].time = 100; 
			this.bomb[0].x = Math.floor(this.x/50)*50+5;
			this.bomb[0].y = Math.floor(this.y/50)*50+5;
			this.bomb[0].drawBomb();
			this.bomb.splice(0, 1); //炸彈陣列從第0項開始刪除一個(也就是刪除第0項)，所以炸彈陣列的長度會減1，bomb.js的53行在炸彈爆炸後會補給它。所以現在是看炸彈陣列的長度來判斷還有沒有炸彈可以放，就不需要bombAmount了。
			this.settingBomb = true; 
			/*
			bombX = Math.floor(this.x/50)*50+5; //炸彈置中,算出格子(/50),再算座標(*50)，置中(+5)
			bombY = Math.floor(this.y/50)*50+5;*/
		}
		/*
		if(time > 0){
			drawRect(ctx, RED, bombX, bombY, manWidth, manHeight);
			time -=1;
		}
		if(time == 1){
			//補炸彈
			console.log(time);
			rows[Math.floor(bombY/50)][Math.floor(bombX/50)] = ".";
			this.bombAmount += 1;
		}*/
	}
}
var P1 = new Player(905, 555, 1, 4, [b1, b3, b6]); //黃色右下
var P2 = new Player(55,55, 1, 4, [b2, b4, b5]);    //藍色左上

b1.owner = P1;
b3.owner = P1;
b6.owner = P1;
b2.owner = P2;
b4.owner = P2;
b5.owner = P2;