Zombie = function(x, y) {this.startX = x + 12; this.startY = y + 12; }

Zombie.prototype = {
	sprite: null,
	startX: 0,
	startY: 0,
	
	scanRange: 10*32,
	scanCooldown: 0,
	moveArray: [],
	currentStep: 0,
	isMoving: false,
	speed: 5,


	create: function(){
		this.sprite = game.add.sprite(this.startX, this.startY, 'zombie1');
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.setSize(24, 24, 0, 12);
		this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.add('walk', [6, 7, 8, 9]);
	},

	update: function(player, map){
		this.sprite.animations.play('walk', 8, false);

		if(this.scanCooldown > 20){
			if(Util.getDistanceBetweenSprites(this.sprite, player.sprite) <= this.scanRange){
				this.moveToTile(Util.tileUnderSprite(player.sprite, map), player, map);
			}
		
			this.scanCooldown = 0;	
		}else{
			this.scanCooldown++;
		}


		if(this.currentStep < this.moveArray.length){
            var destTile = this.moveArray[this.currentStep];

            if(destTile.x*map.tileWidth + 12 < this.sprite.x){
                this.sprite.x -= this.speed;

                if(destTile.x*map.tileWidth + 12 > this.sprite.x){
                    this.sprite.x = destTile.x*map.tileWidth + 12;
                }
            }else if(destTile.x*map.tileWidth + 12 > this.sprite.x){
                this.sprite.x += this.speed;

                if(destTile.x*map.tileWidth+12  < this.sprite.x){
                    this.sprite.x = destTile.x*map.tileWidth + 12;
                }
            }

            if(destTile.y*map.tileHeight+ 12 < this.sprite.y){
                this.sprite.y -= this.speed;

                if(destTile.y*map.tileHeight+ 12 > this.sprite.y){
                    this.sprite.y = destTile.y*map.tileHeight+ 12;
                }
            }else if(destTile.y*map.tileHeight+ 12 > this.sprite.y){
                this.sprite.y += this.speed;

                if(destTile.y*map.tileHeight+ 12 < this.sprite.y){
                    this.sprite.y = destTile.y*map.tileHeight+ 12;
                }
            }

            if(destTile.y*map.tileHeight+12 === this.sprite.y && destTile.x*map.tileWidth+12 === this.sprite.x){
                this.currentStep++;

                if(this.currentStep >= this.moveArray.length){
                    this.currentStep = 0;
                    this.moveArray = [];
                    this.isMoving = false;

                    this.startX = destTile.x;
                    this.startY = destTile.y;
                }
            }
        }
	},

	render: function(){

	},

	moveToTile: function(tile, player, map){
		this.moveArray = (new AStarSearch(this, tile, map)).getShortestPath();
		this.currentStep = 0;
	}
}