Zombie = function(x, y) {this.startX = x + 12; this.startY = y; }

Zombie.prototype = {
	sprite: null,
	startX: 0,
	startY: 0,
	
	scanRange: 10*32,
	scanCooldown: 0,
	moveArray: [],
	currentStep: 0,
	isMoving: false,
	speed: 50,
	isStunned: false,

	health: 3,

	create: function(){
		this.sprite = game.add.sprite(this.startX, this.startY, 'zombie1');
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.setSize(24, 24, 0, 12);
		//this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.add('walk', [6, 7, 8, 9]);
	},

	update: function(player, map, collisionLayer, level){
		if(this.sprite.body.velocity.x > 0 || this.sprite.body.velocity.y > 0){
			this.sprite.animations.play('walk', 8, false);
		}else{
			this.sprite.animations.play('idle', 2, false);
		}

		if(Util.getDistanceBetweenSprites(this.sprite, player.sprite) <= this.scanRange){
			if(player.sprite.y - 8 > this.sprite.y){
				if(this.sprite.body.velocity.y < this.speed){
					this.sprite.body.velocity.y += 5;
				}
			}else if(player.sprite.y + 8 < this.sprite.y){
				if(this.sprite.body.velocity.y > -this.speed){
					this.sprite.body.velocity.y -= 5;
				}
			}else{
				this.sprite.body.velocity.y /= 2;
			}

			if(player.sprite.x - 8 > this.sprite.x){
				if(this.sprite.body.velocity.x < this.speed){
					this.sprite.body.velocity.x += 5;
				}
			}else if(player.sprite.x + 8 < this.sprite.x){
				if(this.sprite.body.velocity.x > -this.speed){
					this.sprite.body.velocity.x -= 5;
				}
			}else{
				this.sprite.body.velocity.x /= 2;
			}
		}else{
			if(this.scanCooldown == 0){
				this.scanCooldown = 300;

				if(Math.random() >= 0.5){
					this.moveArray[0] = Math.random()*this.speed*2 - this.speed;
					this.moveArray[1] = Math.random()*this.speed*2 - this.speed;
				}else{
					this.moveArray[0] = 0;
					this.moveArray[1] = 0;
				}
			}else{
				this.scanCooldown--;

				if(this.sprite.body.velocity.x < this.moveArray[0]){
					if(!this.sprite.body.blocked.down){
						this.sprite.body.velocity.x += 5;
					}else{
						this.sprite.body.velocity.x = 0;
					}
				}else if(this.sprite.body.velocity.x > this.moveArray[0]){
					if(!this.sprite.body.blocked.up){
						this.sprite.body.velocity.x -= 5;
					}else{
						this.sprite.body.velocity.x = 0;
					}
				}

				if(this.sprite.body.velocity.y < this.moveArray[1]){
					if(!this.sprite.body.blocked.right){
						this.sprite.body.velocity.y += 5;
					}else{
						this.sprite.body.velocity.y = 0;
					}
				}else if(this.sprite.body.velocity.y > this.moveArray[1]){
					if(!this.sprite.body.blocked.left){
						this.sprite.body.velocity.y -= 5;
					}else{
						this.sprite.body.velocity.y = 0;
					}
				}
			}
		}


        if(this.isStunned){
	        if(this.sprite.body.velocity.x > 0){
	        	this.sprite.body.velocity.x -= 10;

	        	if(this.sprite.body.velocity.x < 0){
	        		this.sprite.body.velocity.x = 0;
	        		this.isStunned = false;
	        	}
	        }else if(this.sprite.body.velocity.x < 0){
	        	this.sprite.body.velocity.x += 10;

	        	if(this.sprite.body.velocity.x > 0){
	        		this.sprite.body.velocity.x = 0;
	        		this.isStunned = false;
	        	}
	        }

	        if(this.sprite.body.velocity.y > 0){
	        	this.sprite.body.velocity.y -= 10;

	        	if(this.sprite.body.velocity.y < 0){
	        		this.sprite.body.velocity.y = 0;
	        		this.isStunned = false;
	        	}
	        }else if(this.sprite.body.velocity.y < 0){
	        	this.sprite.body.velocity.y += 10;

	        	if(this.sprite.body.velocity.y > 0){
	        		this.sprite.body.velocity.y = 0;
	        		this.isStunned = false;
	        	}
	        }
	    }

        game.physics.arcade.collide(this.sprite, collisionLayer);
        game.physics.arcade.collide(this.sprite, player.sprite, function(){
        	player.getHit();
        }, null, this);

        if(this.health === 0){
        	//die, insect
        }
	},

	render: function(){

	},

	getShot: function(fromAngle){
		velocityX = 200 * Math.cos(fromAngle);
		velocityY = 200 * Math.sin(fromAngle);

		this.sprite.body.velocity.x = velocityX;
		this.sprite.body.velocity.y = velocityY;
		this.isStunned = true;

		this.health--;

		hurtsfx.play();
	}
}