Player = function(){ }

Player.prototype = {
	sprite: null,


	speed: 200,

	wasInput: false,

	create: function(){
		this.sprite = game.add.sprite(0, 0, 'guy');
		game.camera.follow(this.sprite);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.setSize(24, 24, 0, 12);
		game.camera.deadzone = new Phaser.Rectangle(200, 200, WIDTH-400, HEIGHT-400);
		this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.add('walk', [6, 7, 8, 9]);

		game.input.onDown.add(this.onClick, this);
	},

	update: function(){


		//handle input
		if(game.input.keyboard.isDown(Phaser.Keyboard.W)){ //north movement
			this.sprite.body.velocity.y = -this.speed;
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){ //south movement
			this.sprite.body.velocity.y = +this.speed;
		}else{
			this.sprite.body.velocity.y = 0;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.A)){ //west movement
			this.sprite.body.velocity.x = -this.speed;
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){ //east movement
			this.sprite.body.velocity.x = this.speed;
		}else{
			this.sprite.body.velocity.x = 0;
		}

		if(this.sprite.body.velocity.y === 0 && this.sprite.body.velocity.x === 0){
			this.sprite.animations.play('idle', 2, false);
		}else{
			this.sprite.animations.play('walk', 8, false);
		}
	},

	render: function(){

	},

	onClick: function(){
		console.log('click!');
	}
}