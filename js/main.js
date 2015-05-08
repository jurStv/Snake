function Vector(x,y){
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function(obj){
	return new Vector(this.x + obj.x, this.y + obj.y);
}

var KEY_CODE = {
	'w': 37,
	'n': 38,
	'e': 39,
	's': 40
};

var changeArr = [];
function MakeSmth(dir){
	this.direct = dir;
	this.count = 1;
}
MakeSmth.prototype.aaaa = function(){



	this.count ++;
}

function changeDirection(e){
	for(var prop in KEY_CODE){
		if(e.keyCode === KEY_CODE[prop]){
			snake[0].direction = prop;
			break;
		}
	}
}

var body = document.body;
body.addEventListener('keyup', changeDirection, false);

var directions = {
	"n": new Vector(0,-1),
	"w": new Vector(-1,0),
	"s": new Vector(0, 1),
	'e': new Vector(1,0)
};

var world = function(){
	var finArr = [];
	var table = document.getElementsByTagName('table')[0].childNodes[1];

	for(var i = 0; i < table.children.length; i++){
		var innerFinArr = [];
		for(var j = 0; j < table.children[i].children.length; j++){
			innerFinArr.push(table.children[i].children[j]);
		}
		finArr.push(innerFinArr);
	}

	return finArr;
}();


function SnakePart(x,y,dir,type){
	this.direction = dir;
	this.coord = new Vector(x,y);
	this.type = type;
	if(type === "tail")
		this.futureCoord = this.coord; 
}

function changeCoordinate(context){
	if(context.coord.x === 10)
		context.coord.x = 0;
	if(context.coord.x === -1)
		context.coord.x = 9;
	if(context.coord.y === -1)
		context.coord.y = 9;
	if(context.coord.y === 10)
		context.coord.y = 0;
}

SnakePart.prototype.move = function(i, ev){
	var nextDir = this.look();
	if(this.type === "head"){
		if(nextDir === "apple"){
			snake.push(new SnakePart(snake[snake.length - 1].coord.x, snake[snake.length - 1].coord.y, snake[snake.length - 1].direction, "tail"));
			apple = new Apple(Number((Math.random()*9).toFixed(0)), Number((Math.random()*9).toFixed(0)));
			apple.be();
		}
		if(snake.length !== 1){
			snake[1].futureCoord = this.coord;
		}
		world[this.coord.y][this.coord.x].style.backgroundColor = 'green';
		this.coord = this.coord.plus(directions[this.direction]);
		if(nextDir === undefined)
			changeCoordinate(this);
		world[this.coord.y][this.coord.x].style.backgroundColor = 'red';
	}
	else if (this.type === "tail"){
		if(ev){
			world[this.coord.y][this.coord.x].style.backgroundColor = 'green';
			world[this.futureCoord.y][this.futureCoord.x].style.backgroundColor = 'red';
			this.coord = this.futureCoord;
		} else {
			snake[i+1].futureCoord = this.coord;
			world[this.futureCoord.y][this.futureCoord.x].style.backgroundColor = 'red';
			this.coord = this.futureCoord;
		}
	}
}

SnakePart.prototype.look = function(){
	var s = this.coord.plus(directions[this.direction]);
	if(s.x === apple.coord.x && s.y === apple.coord.y)
		return "apple";
	if(world[s.x] === undefined)
		return world[s.x];
	return world[s.x][s.y];
}

var snake = [new SnakePart(0, 0, 's', "head")];

function turn(){

	var s = snake;
	var len = s.length;
	for(var i = 0; i < len; i++){
		if(i===len-1)
			s[i].move(i,true);
		else
			s[i].move(i);
	}
}

var k = setInterval(turn, 1000);

function Apple(x,y){
	this.coord = new Vector(x,y);
}

Apple.prototype.be = function (){
	for(var i = 0; i<snake.length; i++){
		if(snake[i].coord.x === this.coord.x && snake[i].coord.y === this.coord.y) {
			apple = new Apple(Number((Math.random()*9).toFixed(0)), Number((Math.random()*9).toFixed(0)));
			apple.be();
		}
	}
	world[this.coord.y][this.coord.x].style.backgroundColor = 'yellow';
}

var apple = new Apple(Number((Math.random()*9).toFixed(0)), Number((Math.random()*9).toFixed(0)));
apple.be();
