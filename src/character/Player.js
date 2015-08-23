Player = function(){ }

Player.prototype = {
	sprite: null,


	speed: 400,

	wasInput: false,

	weapons: [],
	ammunition: 5,
	clipSize: 12,
	ammunitionText: null,
	clips: 5,

	item1: null,
	item2: null,
	item1Text: null,
	item2Text: null,

	health: 50,
	healthText: null,
	getHitCooldown: 0,

	create: function(){
		this.sprite = game.add.sprite(0, 0, 'guy');
		game.camera.follow(this.sprite);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.setSize(24, 24, 0, 12);
		game.camera.deadzone = new Phaser.Rectangle(350, 250, WIDTH-700, HEIGHT-500);
		this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.add('walk', [6, 7, 8, 9]);

		this.weapons.push(new Gun(this));

		this.item1 = ItemFactory.medkit();
		this.item2 = ItemFactory.boombox();
		this.item1Text = game.add.bitmapText(0, 0, 'font', 'item2text', 16);
		this.item2Text = game.add.bitmapText(0, 0, 'font', 'item1text', 16);
		this.ammunitionText = game.add.bitmapText(0, 0, 'font', 'blah', 16);
		this.healthText = game.add.bitmapText(0, 0, 'font', 'blah', 16);
	},

	update: function(){
		//handle input
		if(!game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !game.input.keyboard.isDown(Phaser.Keyboard.Q)){
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

			this.item1Text.alpha = 0;
			this.item2Text.alpha = 0;
			this.ammunitionText.alpha = 0;
			this.healthText.alpha = 0;
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){
			this.sprite.body.velocity.y = 0;
			this.sprite.body.velocity.x = 0;
			this.item1Text.x = this.sprite.x - 80;
			this.item1Text.y = this.sprite.y - 20;
			this.item2Text.x = this.sprite.x - 80;
			this.item2Text.y = this.sprite.y - 0;
			if(this.item1){
				this.item1Text.setText(this.item1.displayName);
			}else{
				this.item1Text.setText("");
			}
			if(this.item2){
				this.item2Text.setText(this.item2.displayName);
			}else{
				this.item2Text.setText("");
			}
			this.ammunitionText.setText('Ammo: '+this.ammunition+'/'+this.clipSize+' x '+this.clips);
			this.healthText.setText('Health: ' + this.getHealthText());
			this.ammunitionText.x = this.sprite.x - 80;
			this.ammunitionText.y = this.sprite.y + 20;
			this.healthText.x = this.sprite.x - 80;
			this.healthText.y = this.sprite.y + 40;
			this.item1Text.alpha = 1;
			this.item2Text.alpha = 1;
			this.healthText.alpha = 1;
			this.ammunitionText.alpha = 1;
		}else{
			this.sprite.body.velocity.y = 0;
			this.sprite.body.velocity.x = 0;
			this.item1Text.alpha = 0;
			this.item2Text.alpha = 0;
			this.ammunitionText.alpha = 0;
			this.healthText.alpha = 0;
		}

		if(this.sprite.body.velocity.y === 0 && this.sprite.body.velocity.x === 0){
			this.sprite.animations.play('idle', 2, false);
		}else{
			this.sprite.animations.play('walk', 8, false);
		}

		this.weapons.forEach(function(w){
			w.update();
		}, this);

		if(this.getHitCooldown > 0){
			this.getHitCooldown--;
		}else{
			this.sprite.tint = 0xFFFFFF;
		}
	},

	getHealthText: function(){
		switch(this.health){
			case 5:
			return "Good";
			break;
			case 4:
			return "Fair";
			break;
			case 3:
			return "Injured";
			break;
			case 2:
			return "Poor";
			break;
			case 1:
			return "Critical";
			break;

		}
	},

	handleClick: function(enemies, collisionLayer){
		this.weapons[0].shoot(collisionLayer, enemies);
	},

	render: function(){

	},

	getHit: function(){
		if(this.getHitCooldown == 0){
			this.getHitCooldown = 25;
			this.sprite.tint = 0xFF0000;
			this.health--;
		}
	},

	pickup: function(){
		if(!this.item1){
			return true;
		}else if(!this.item2){
			return true;
		}else{
			return false;
		}
	}
}