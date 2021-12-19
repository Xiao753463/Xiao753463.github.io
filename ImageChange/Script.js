// JavaScript source code
var timer = new Timer(play, 20);
timer.start();
var index = 1;
var stop = false;
var progress = 100;
var imgs = document.getElementById("thumbs").getElementsByTagName("img");
for(let i=0; i<imgs.length; i++){
	imgs[i].onclick = function(){
			imgs[index].classList.remove("selected");
			progress = 0;
			index = i;
		}
}

var bigImg = document.getElementById("big").getElementsByTagName("img")[0];
function play() {
    var progressBar = document.getElementById("progressBar");
    imgs[index].classList.remove("selected");
    if (progress == 100) {
        progress = 0;
        index++;
    }
    progress += 1;
    progressBar.style.width = progress.toString() + "%";


    if (index == imgs.length)
        index = 0;
        imgs[index].classList.add("selected");
    bigImg.setAttribute("src", imgs[index].getAttribute("src"));
}
function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
    }
}
function stopOrRestart() {
    stop ? ((stop = false), timer.reset(20)) : ((stop = true), timer.stop());
}