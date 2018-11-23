var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var des_close = document.getElementById('des_close');
var startP = document.getElementById('startP');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var descripBtn = document.getElementById('descripBtn');
var mo_left = document.getElementById('mo_left');
var mo_up = document.getElementById('mo_up');
var mo_right = document.getElementById('mo_right');
var mo_down = document.getElementById('mo_down');
var description = document.getElementById('description');
var snakeMove;
var genGoldFood;
var delGoldFood;
var startGameBool = true;
var startPaushBool = true;
init();

function init() {
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	this.goldFoodX = 0;
	this.goldFoodY = 0;

	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];

	this.speed = 300;
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;

	this.score = 0;
	bindEvent();

}

function startGame() {
	startPage.style.display = 'none';
	startP.style.display = 'block';
	food();
	snake();


}

function food() {
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function goldfood() {
	var goldfood = document.createElement('div');
	goldfood.style.width = this.foodW + 'px';
	goldfood.style.height = this.foodH + 'px';
	goldfood.style.position = 'absolute';
	this.goldFoodX = Math.floor(Math.random() * (this.mapW / 20));
	this.goldFoodY = Math.floor(Math.random() * (this.mapH / 20));
	goldfood.style.left = this.goldFoodX * 20 + 'px';
	goldfood.style.top = this.goldFoodY * 20 + 'px';
	this.mapDiv.appendChild(goldfood).setAttribute('class', 'goldfood');
	delGoldFood = setTimeout(function() {
		removeClass('goldfood');
		clearTimeout(delGoldFood);
	}, 5000);
}

function snake() {
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] * 20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch (this.direct) {
			case 'right':
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'left':
				snake.style.transform = 'rotateY(180deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
	}
}

function move() {
	for (var i = this.snakeBody.length - 1; i > 0; i--) {
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch (this.direct) {
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'left':
			this.snakeBody[0][0] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();
	if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY || this.snakeBody[0][0] == this.goldFoodX && this.snakeBody[0][1] == this.goldFoodY) {

		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		switch (this.direct) {
			case 'right':
				this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
				break;
			case 'up':
				this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
				break;
			case 'left':
				this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
				break;
			case 'down':
				this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
				break;
			default:
				break;
		}

		if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
			this.score += 1;
			removeClass('food');
			food();
		} else {
			this.score += 3;
			removeClass('goldfood');
		}
		scoreBox.innerText = this.score;
		if (this.score == 20) {
			this.speed = 200;
			startAndPaush();
			startAndPaush();
		}
		if (this.score == 40) {
			this.speed = 100;
			startAndPaush();
			startAndPaush();
		}
	}

	if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW / 20) {
		reloadGame();
	}
	if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH / 20) {
		reloadGame();
	}
	var snakeHX = this.snakeBody[0][0];
	var snakeHY = this.snakeBody[0][1];
	for (var i = 1; i < this.snakeBody.length; i++) {
		if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
			reloadGame();
		}
	}
}

function reloadGame() {
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	clearInterval(genGoldFood);
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];

	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;

	this.speed = 300;


	lose.style.display = 'block';
	loserScore.innerText = this.score;
	this.score = 0;
	scoreBox.innerText = this.score;

	startGameBool = true;
	startPaushBool = true;
	startP.setAttribute('src', 'images/stop.png');
	startP.style.display = 'none';
}

function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}

function setDirect(code) {
	switch (code) {
		case 65:
			if (this.left) {
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 87:
			if (this.up) {
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 68:
			if (this.right) {
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 83:
			if (this.down) {
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		default:
			break;

	}
}

function bindEvent() {

	close.onclick = function() {
		lose.style.display = 'none';
		startP.style.display = 'block';
		startPage.style.display = 'block';
	}
	des_close.onclick = function() {
		description.style.display = 'none';
		startPage.style.display = 'block';
	}
	startBtn.onclick = function() {
		startAndPaush();
	}
	descripBtn.onclick = function() {
		description.style.display = 'block';
		startPage.style.display = 'none';
	}
	startP.onclick = function() {
		startAndPaush();
	}
	mo_left.onclick = function() {
		setDirect(65);
	}
	mo_up.onclick = function() {
		setDirect(87);
	}
	mo_right.onclick = function() {
		setDirect(68);
	}
	mo_down.onclick = function() {
		setDirect(83);
	}
}

function startAndPaush() {
	if (startPaushBool) {
		if (startGameBool) {
			startGame();
			startGameBool = false;
		}
		startP.setAttribute('src', 'images/start.png');
		document.onkeydown = function(e) {
			var code = e.keyCode;
			setDirect(code);
		}
		snakeMove = setInterval(function() {
			move();
		}, this.speed);

		genGoldFood = setInterval(function() {
			goldfood();

		}, 10000);
		startPaushBool = false;
	} else {
		startP.setAttribute('src', 'images/stop.png');
		clearInterval(snakeMove);
		clearInterval(genGoldFood);
		document.onkeydown = function(e) {
			e.returnValue = false;
			return false;
		};
		startPaushBool = true;
	}
}