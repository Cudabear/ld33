Zombie = function(x, y) {this.startX = x; this.startY = y; }

Zombie.prototype = {
	sprite: null,
	startX: 0,
	startY: 0,

	create: function(){
		this.sprite = game.add.sprite(this.startX, this.startY, 'zombie1');
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.setSize(24, 24, 0, 12);
		this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.add('walk', [6, 7, 8, 9]);
	},

	update: function(){
		this.sprite.animations.play('idle', 2, false);
	},

	render: function(){

	},
}