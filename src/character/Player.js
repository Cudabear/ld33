Player = function(){ }

Player.prototype = {
	sprite: null,


	speed: 120,

	wasInput: false,

	weapons: [],
	hasGun: false,
	ammunition: 12,
	clipSize: 12,
	ammunitionText: null,
	clips: 0,

	item1: null,
	item2: null,
	item1Text: null,
	item2Text: null,

	health: 5,
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

		//this.item2 = ItemFactory.MansionKey();
		this.item1Text = game.add.bitmapText(0, 0, 'font', 'item2text', 16);
		this.item2Text = game.add.bitmapText(0, 0, 'font', 'item1text', 16);
		this.ammunitionText = game.add.bitmapText(0, 0, 'font', '', 16);
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
			if(this.hasGun){
				this.ammunitionText.setText('Ammo: '+this.ammunition+'/'+this.clipSize+' x '+this.clips);
			}
			this.healthText.setText('Health: ' + this.getHealthText());
			this.ammunitionText.x = this.sprite.x - 80;
			this.ammunitionText.y = this.sprite.y + 20;
			this.healthText.x = this.sprite.x - 80;
			this.healthText.y = this.sprite.y + 40;
			this.item1Text.alpha = 1;
			this.item2Text.alpha = 1;
			this.healthText.alpha = 1;
			this.ammunitionText.alpha = 1;
			this.item1Text.parent.bringToTop(this.item1Text);
			this.item2Text.parent.bringToTop(this.item2Text);
			this.ammunitionText.parent.bringToTop(this.ammunitionText);
			this.healthText.parent.bringToTop(this.healthText);

			if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
				if(this.item1 && this.item1.displayName == "medkit"){
					this.health += 3;
					this.item1 = null;
				}else if(this.item2 && this.item2.displayName == "medkit"){
					this.health += 3;
					this.item2 = null;
				}

				if(this.health < 5){
					this.health = 5;
				}
			}
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
			default:
			return "Excellent";
			break;

		}
	},

	handleClick: function(enemies, collisionLayer){
		if(this.hasGun){
			this.weapons[0].shoot(collisionLayer, enemies);
		}
	},

	render: function(){

	},

	getHit: function(){
		if(this.getHitCooldown == 0){
			this.getHitCooldown = 25;
			this.sprite.tint = 0xFF0000;
			this.health--;
			hurtsfx.play();
		}
	},

	pickup: function(main, item, forceText){
		if(!this.item1 || !this.item2 || item.displayName == "gun" || item.displayName == "ammo" || forceText){
			if(item.displayName == "medkit"){
				main.showText(["This looks like a standard issue military medical kit...",
					"What's it doing around here?  We only had basic supplies\n in this hospital.",
					"Whatever.  I'm going to pick it up anyway.",
					"(hold Q and press E to heal when injured)"]);
			}else if(item.displayName == "boombox"){
				main.showText(["My old boombox!  I haven't used this thing in \n so many years.  It's just not as useful anymore.",
					"However, if I cranked this thing up loud it would do a \ngreat job of luring those sick people away from something.",
					"Of course, they'd destroy it then...",
					"A necessary sacrafice, I suppose.  It'll need batteries\n to work, these are corroded and old."]);
			}else if(item.displayName == "gun"){
				var me = this;
				main.showText(["Whoa, what's a gun this doing at a place like this?",
					"Maybe there was some kind of last stand here.",
					"As much as I'd hate to shoot anyone, I'm going to take\n this just in case I need it.",
					"Not much ammunition, though.  I'll have to look for more.",
					"*CRASSHHHHHHH*",
					"AHH! What the hell was that behind me?!",
					"(hold shift and use the mouse to aim, then click\n to shoot)"], function(main){
						me.hasGun = true;
						me.ammunition = 12;
						me.clips = +2;

						var enemy = new Zombie(9*32, 7*32);
						enemy.create();
						enemy.health = 9;
						enemy.speed *= 1.3;
						enemy.scanRange = 100*32
						fastbgm.play('', 0, 1, true);
						slowbgm.stop()
						enemy.onDead = function(){
							main.showText(["Oh my God, I'm so sorry, I... you wouldn't stop...",
								"I had to... to save my own life..",
								"...",
								"I need to move on."]);

							fastbgm.stop();
							slowbgm.play();
						};
						main.level.enemies.push(enemy);
					});

			}else if(item.displayName == "batteries"){
				main.showText(["Cool, batteries.  These will be useful"]);
			}else if(item.displayName == "ammo"){	
				if(this.hasGun){
					main.showText(["Excellent, another magazine of ammunition for my pistol."]);
				}else{
					main.showText(["Hmm, a magazine of ammunition for a pistol.  Could come in\n handy if I find a gun."]);
				}
				this.weapons[0].shootCooldown = 180;
				this.clips += 1;
			}else if(item.displayName == "Mansion Key"){	
				main.showText(["Finally, the key to Dr. Steven's Mansion.",
					"Maybe finally I can figure out what's going on here.  \n Or at the very least, find someone who hasn't\n been infected by this virus.",]);
			}else if(item.displayName == "Town Hall Key"){	
				main.showText(["Well, here it is.  The key to the \n town hall.",
					"Poor Dr. Steven.  He sacraficed his life to save \n mine.  If Not for him, I would be one of those mindless\n monsters.\n",
					"I wish there was something, anything I could \n do to make this right again.  But what is there to be done?",
					"I should get to the Town Hall and see if anyone \n is bunkered down there.  Maybe then I can \n Use what I learned so far and put it to good use."])
			}



			if(item.displayName != "gun" && item.displayName != "ammo" && !forceText){
				if(!this.item1){
					this.item1 = item;
				}else{
					this.item2 = item;
				}
			}

			return true;
		}else{
			return false;
		}
	}
}