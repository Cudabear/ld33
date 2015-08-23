Level = function() {this.actionHandler = new Action(); }

Level.prototype = {
	currentMap: null,
	collisionLayer: null,
	enemies: [],
	_layers: [],
	actionsUsed: [],
	actionHandler: null,
	blings: {},

	effects: [],
	effectWindX: 0.5,
	effectWindY: 0.8,
	windChangeCooldown: 0, 

 
	createWorld: function(){
		this._createMap('hospital');
	},

	_createEffects: function(){
		for(var i = 0; i < 25; i++){
			var effect = new Paper();
			this.effects.push(effect);
		}
	},

	update: function(){
		this.effects.forEach(function(e){
			e.update(this.effectWindX, this.effectWindY, this.collisionLayer);
		}, this);

		if(this.windChangeCooldown == 0){
			this.effectWindX = Math.random()*2-1;
			this.effectWindY = Math.random()*2-1;

			this.windChangeCooldown = 300;
		}else{
			this.windChangeCooldown--;
		}
	},

	_createMap: function(id){
		if(this.currentMap){
			this.currentMap.destroy();
		}

		this._layers.forEach(function(e){
			e.destroy();
		}, this);

		this.effects.forEach(function(e){
			e.sprite.destroy();
		}, this);

		this.effects = [];


		this.currentMap = game.add.tilemap(id);
		this.currentMap.addTilesetImage('tileset', 'tileset');

		this._layers.push(this.currentMap.createLayer('ground'));
		this._layers.push(this.currentMap.createLayer('construction'));
		this._layers.push(this.currentMap.createLayer('detail'));
		this.collisionLayer = this.currentMap.createLayer('collision');
		this.collisionLayer.resizeWorld();
		if(id == "world"){
			this._createEffects();
		}
		this.collisionLayer.alpha = 0;
		this.currentMap.setCollisionBetween(1, 500, true, this.collisionLayer);
		this._layers.push(this.collisionLayer);


		this.enemies.forEach(function(e){
			e.sprite.destroy();
		}, this);
		this.enemies.length = []; 

		var tiles = this._getNonSolidTiles();
		if(id == "world"){
			for(var i = 0; i < 100; i++){
				var row = 0;
				do {
					var row = Math.floor(Math.random()*tiles.length);
				}while(tiles[row].length === 0);

				var col = Math.floor(Math.random()*tiles[row].length);

				var enemy = new Zombie(tiles[row][col].x*this.currentMap.tileWidth, tiles[row][col].y*this.currentMap.tileHeight);
				enemy.create();
				this.enemies.push(enemy);
			}

			
		}

		
	},

	handleTeleport: function(teleportSpotTile, player){
		this._createMap(teleportSpotTile.properties.destination);

		var location = teleportSpotTile.properties.location;
		var locationParts = location.split(",");

		player.sprite.x = parseInt(locationParts[0])*this.currentMap.tileWidth + 16;
		player.sprite.y = parseInt(locationParts[1])*this.currentMap.tileHeight + 16;
		player.sprite.bringToTop();
	},

	handleAction: function(actionTile, main){
		var actionId = parseInt(actionTile.properties.action);

		if(this.actionsUsed.indexOf(actionId) == -1){
			if(this.actionHandler.handleAction(actionId, actionTile, main)){
				this.actionsUsed.push(actionId);

				if(!this.blings[actionId]){
					this.currentMap.removeTile(actionTile.x, actionTile.y, 3);
				}else{
					this.blings[actionId].destroy();
					this.blings[actionId] = null;
					actionTile.properties = {};
				}
			}else{

			}
		}else{
			if(!this.blings[actionId]){
				this.currentMap.removeTile(actionTile.x, actionTile.y, 3);
			}else{
				this.blings[actionId].destroy();
				this.blings[actionId] = null;
				actionTile.properties = {};
			}
		}
	},

	//hijacked this function to create static spawn zombies, too
	_getNonSolidTiles: function(){
		var tiles = this.collisionLayer.layer.data.slice(0);
		for(var row = tiles.length - 1; row >= 0; row--){
			tiles[row] = tiles[row].slice(0);

			for(var col = tiles[row].length - 1; col >= 0; col--){
				if(tiles[row][col].index >= 357 && tiles[row][col].index <= 368){
					var enemy = new Zombie(tiles[row][col].x*this.currentMap.tileWidth, tiles[row][col].y*this.currentMap.tileHeight);
					enemy.create();
					this.enemies.push(enemy);
					this.currentMap.removeTile(col, row, 3);
				}

				if(tiles[row][col].properties.bling){
					var actionId = parseInt(tiles[row][col].properties.action);

					if(this.actionsUsed.indexOf(actionId) == -1){
						var bling = game.add.sprite(tiles[row][col].x*32, tiles[row][col].y*32, 'bling');
						bling.animations.add('bling', [0, 1, 2, 3, 4, 5, 6, 7]);
						bling.animations.play('bling', 2, true);
						if(!this.blings[actionId]){
							this.blings[actionId] = bling;
							this.blings[actionId].item = tiles[row][col].properties.bling;
						}

						tiles[row][col].properties.bling = this.blings[actionId].item;
					}else{
						tiles[row][col].properties = {};
					}
				}

				if(tiles[row][col].index != -1){
					tiles[row].splice(col, 1);
				}
			}
		}

		return tiles;
	}


}