function sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
        continue;
    }
}
class Bomb{
	constructor(t){
		this.time = t;
		this.Self = this;
		
	}
	destroyBomb(){
		rows[Math.floor(this.y/50)][Math.floor(this.x/50)] = ".";
		if(rows[Math.floor(this.y/50)+1][Math.floor(this.x/50)] == "+"){
			rows[Math.floor(this.y/50)+1][Math.floor(this.x/50)] = ".";
		}
		if(rows[Math.floor(this.y/50)-1][Math.floor(this.x/50)] == "+"){
			rows[Math.floor(this.y/50)-1][Math.floor(this.x/50)] = ".";
		}
		if(rows[Math.floor(this.y/50)][Math.floor(this.x/50)+1] == "+"){
			rows[Math.floor(this.y/50)][Math.floor(this.x/50)+1] = ".";
		}
		if(rows[Math.floor(this.y/50)][Math.floor(this.x/50)-1] == "+"){
			rows[Math.floor(this.y/50)][Math.floor(this.x/50)-1] = ".";
		}
		console.log(rows[Math.floor(this.y/50)][Math.floor(this.x/50)]);
		this.owner.bombAmount -= 1;
	}
	drawBomb(){
		rows[Math.floor(this.y/50)][Math.floor(this.x/50)] = "B";
		this.start = (new Date()).getTime();
		setTimeout(this.destroyBomb.bind(this),1500);
	}
		/*
		if(this.time > 0){
			this.time -= 1;
			console.log(this.time);
			drawRect(ctx, RED, this.x, this.y, manWidth, manHeight);
			this.drawBomb();
		}
		if(this.time == 1){
			rows[Math.floor(this.Y/50)][Math.floor(this.X/50)] = ".";
			owner.bombAmount -= 1;
		}*/
	
}
var b1 = new Bomb(100);//送p1
var b2 = new Bomb(100);//送p2
var b3 = new Bomb(100);//撿來的
