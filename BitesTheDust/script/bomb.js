function sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
        continue;
    }
}
class Bomb{
	constructor(){
		this.time = 10;
		this.Self = this;
		
	}
	destroyBomb(){
		rows[Math.floor(this.y/50)][Math.floor(this.x/50)] = ".";
		for(let i = -this.owner.bombDistance; i <= this.owner.bombDistance; i++){ 
			if(rows[Math.floor(this.y/50)+i][Math.floor(this.x/50)] == "+"){
				rows[Math.floor(this.y/50)+i][Math.floor(this.x/50)] = ".";
			}
			if(rows[Math.floor(this.y/50)][Math.floor(this.x/50)+i] == "+"){
				rows[Math.floor(this.y/50)][Math.floor(this.x/50)+i] = ".";
			}
		}
		for(let i = -this.owner.bombDistance; i <= this.owner.bombDistance; i++){
			//分隔線 p2 lose
			if(Math.floor(this.y/50)+1 == Math.floor(P2.x/50)&& Math.floor(this.x/50) == Math.floor(P2.x/50)){
				over.innerHTML = "Blue lose";
				window.location.href='結尾.html';
				localStorage.setItem('winner', 'Yellow');
				localStorage.setItem('loser', 'Blue');
			}
			if(Math.floor(this.y/50) == Math.floor(P2.y/50) && Math.floor(this.x/50)+i == Math.floor(P2.x/50)){
				over.innerHTML = "Blue lose";
				window.location.href='結尾.html';
				localStorage.setItem('winner', 'Yellow');
				localStorage.setItem('loser', 'Blue');
			}
			//分隔線 p1 lose
			if(Math.floor(this.y/50)+i == Math.floor(P1.y/50) && Math.floor(this.x/50) == Math.floor(P1.x/50)){
				over.innerHTML = "Yellow lose";
				window.location.href='結尾.html';
				localStorage.setItem('winner', 'Blue');
				localStorage.setItem('loser', 'Yellow');
			}
			if(Math.floor(this.y/50) == Math.floor(P1.y/50) && Math.floor(this.x/50)+i == Math.floor(P1.x/50)){
				over.innerHTML = "Yellow lose";
				window.location.href='結尾.html';
				localStorage.setItem('winner', 'Blue');
				localStorage.setItem('loser', 'Yellow');
			}
		}
		console.log(rows[Math.floor(this.y/50)][Math.floor(this.x/50)]+ "x: " +Math.floor(this.x/50)+" y: "+Math.floor(this.y/50));
		this.owner.bombAmount -= 1;
		this.owner.bomb.push(this); // 將這顆炸彈放入它的擁有者的炸彈陣列裡。
	}
	drawBomb(){
		rows[Math.floor(this.y/50)][Math.floor(this.x/50)] = "B";
		
		
		setTimeout(this.destroyBomb.bind(this),1000); //在延後1000毫秒後執行destroyBomb
		
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

var over = document.getElementById("over");
var b1 = new Bomb();//送p1
var b2 = new Bomb();//送p2
var b3 = new Bomb();//撿來的
var b4 = new Bomb();//撿來的
var b5 = new Bomb();//撿來的
var b6 = new Bomb();//撿來的
var winner = localStorage.getItem('winner');
var winnerDiv = document.getElementById("winner");
winnerDiv.innerHTML = "贏家: " + winner;
var loser = localStorage.getItem('loser');
var loserDiv = document.getElementById("loser");
loserDiv.innerHTML = "輸家: " + loser;
