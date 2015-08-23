Paper = function(){this.create(); }

Paper.prototype = {
	sprite: null,

	create: function(){
		this.sprite = game.add.sprite(0, 0, 'paper');
		this.reposition(true);
		this.sprite.animations.add('1', [0,1,2,3,2,1]);
		this.sprite.rotation = Math.random()*Math.PI;

		this.sprite.animations.play("1", 5, true);
	},

	update: function(windX, windY){
		this.sprite.x += windX;
		this.sprite.y += windY;

		if(this.sprite.x > game.world.width || this.sprite.x < 0 || this.sprite.y > game.world.height || this.sprite.y < 0){
			this.reposition();
		}
	},

	render: function(){

	},

	reposition: function(ignoreCamera){
		var x;
		var y;

		if(!ignoreCamera){
			do{
				x = Math.floor(Math.random()*game.world.width);
				y = Math.floor(Math.random()*game.world.height);
			}while(x > game.camera.x && x < game.camera.x + WIDTH  && y > game.camera.x && y < game.camera.y + HEIGHT);
		}else{
			x = Math.floor(Math.random()*game.world.width);
			y = Math.floor(Math.random()*game.world.height);
		}
		this.sprite.x = x;
		this.sprite.y = y;
	}
}