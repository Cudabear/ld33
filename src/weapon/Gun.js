Gun = function(shooter){this.shooter = shooter; this.create();}

Gun.prototype = {
	shooter: null,

	shootLineBmd: null,
	shootLineSprite: null,

	shootCooldown: 0,

	create: function(){
		this.shootLineBmd = game.add.bitmapData(WIDTH, HEIGHT);
		this.shootLineSprite = game.add.sprite(0, 0, this.shootLineBmd);
		this.shootLineBmd.ctx.strokeStyle = "white";
		this.shootLineSprite.alpha = 0;
	},

	update: function(){
		if(this.shootLineSprite.alpha > 0){
			this.shootLineSprite.alpha -= 0.1;
		}

		this.shootLineSprite.x = game.camera.x;
		this.shootLineSprite.y = game.camera.y;

		if(this.shootCooldown > 0 ){
			this.shootCooldown--;

			if(this.shootCooldown == 1 && this.shooter.ammunition == 0 && this.shooter.clips > 0){
				this.shooter.ammunition = this.shooter.clipSize; this.shooter.clips--;
			}
		}

		this.shootLineSprite.bringToTop();
	},

	render: function(){

	},

	shoot: function(collisionLayer, enemies){
		if(this.shootCooldown == 0 && this.shooter.ammunition > 0){
			shootsfx.play();
			this.shooter.ammunition--;
			var startX = this.shooter.sprite.x; 
			var startY = this.shooter.sprite.y; 
			var endX = startX + 1000 * Math.cos(game.physics.arcade.angleToPointer(this.shooter.sprite));
			var endY = startY + 1000 * Math.sin(game.physics.arcade.angleToPointer(this.shooter.sprite));

			var hitEnemy = this.getHitEnemy(this.shooter.sprite.x, this.shooter.sprite.y, endX, endY, enemies, collisionLayer);

			endX -= game.camera.x;
			endY -= game.camera.y;
			startX -= game.camera.x;
			startY -= game.camera.y;

			if(hitEnemy && hitEnemy.health){ //we hit a zombie
				endX = hitEnemy.sprite.x - game.camera.x;
				endY = hitEnemy.sprite.y - game.camera.y;

				hitEnemy.getShot(game.physics.arcade.angleToPointer(this.shooter.sprite));
			}else if(hitEnemy && hitEnemy.index){ //we hit a tile
				endX = hitEnemy.x*32 - game.camera.x;
				endY = hitEnemy.y*32 - game.camera.y;
			}

			

			this.shootLineBmd.ctx.clearRect(0, 0, WIDTH, HEIGHT);
			this.shootLineBmd.ctx.beginPath();
			this.shootLineBmd.ctx.moveTo(startX, startY); 
			this.shootLineBmd.ctx.lineTo(endX, endY);
			this.shootLineBmd.ctx.lineWidth = 1;
			this.shootLineBmd.ctx.stroke();
			this.shootLineBmd.ctx.closePath();
			this.shootLineBmd.dirty = true;
			this.shootLineSprite.alpha = 1;
			this.shootLineSprite.bringToTop();

			if(this.shooter.ammunition > 0){
				this.shootCooldown = 15;
			}else{
				this.shootCooldown = 180;
			}
		}else if(this.shootCooldown == 0 && this.shooter.ammunition == 0 && this.shooter.clips > 0){
			this.shootCooldown = 180;
		}
	},

	getHitEnemy: function(startX, startY, endX, endY, enemies, collisionLayer){
		var solidTiles = Util.getTilesOnPath(startX, startY, endX, endY, collisionLayer);
		
		var enemiesHit = [];
		enemies.forEach(function(e){
			if(Util.lineIntersectsRect(startX, startY, endX, endY, e.sprite.x, e.sprite.y - e.sprite.height/2, e.sprite.width, e.sprite.height)){
				enemiesHit.push(e);
			}
		}, this);

		var closestEnemy = {d: Number.MAX_VALUE};
		var closestTile = {d: Number.MAX_VALUE};
		solidTiles.forEach(function(tile){
			var diffX = startX - tile.x*32;
			var diffY = startY - tile.y*32;

			var d = Math.sqrt(diffX*diffX + diffY*diffY);

			if(!closestTile || closestTile.d >= d){
				tile.d = d;
				if(closestTile){
					delete closestTile.d;
				}
				closestTile = tile;
			}
		}, this);

		enemiesHit.forEach(function(enemy){
			var diffX = startX - enemy.sprite.x;
			var diffY = startY - enemy.sprite.y;

			var d = Math.sqrt(diffX*diffX + diffY*diffY);

			if(!closestEnemy || closestEnemy.d >= d){
				enemy.d = d;
				if(closestEnemy){
					delete closestEnemy.d;
				}
				closestEnemy = enemy;
			}
		}, this);

		if(closestEnemy.d < closestTile.d){
			if(closestEnemy){
				delete closestEnemy.d;
			}

			if(closestTile){
				delete closestTile.d;
			}

			return closestEnemy;
		}else if(closestEnemy.d > closestTile.d){
			if(closestEnemy){
				delete closestEnemy.d;
			}

			if(closestTile){
				delete closestTile.d;
			}

			return closestTile;
		}else{
			return [];
		}

		
	}
}