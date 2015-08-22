Level = function() { }

Level.prototype = {
	currentMap: null,
	collisionLayer: null,
	_layers: [],
	enemies: [],

 
	createWorld: function(){
		this._createMap('world');
	},

	_createMap: function(id){
		if(this.currentMap){
			this.currentMap.destroy();
		}

		this._layers.forEach(function(e){
			e.destroy();
		}, this);

		this.currentMap = game.add.tilemap(id);
		this.currentMap.addTilesetImage('tileset', 'tileset');

		this._layers.push(this.currentMap.createLayer('ground'));
		this._layers.push(this.currentMap.createLayer('construction'));
		this._layers.push(this.currentMap.createLayer('detail'));
		this.collisionLayer = this.currentMap.createLayer('collision');
		this.collisionLayer.resizeWorld();
		this.collisionLayer.alpha = 0;
		this.currentMap.setCollisionBetween(1, 400, true, this.collisionLayer);


		this.enemies.forEach(function(e){
			e.sprite.destroy();
		}, this);
		this.enemies.length = []; 

		var tiles = this._getNonSolidTiles();
		for(var i = 0; i < 1; i++){
			var row = 0;
			do {
				var row = Math.floor(Math.random()*tiles.length);
			}while(tiles[row].length === 0);

			var col = Math.floor(Math.random()*tiles[row].length);

			var enemy = new Zombie(tiles[row][col].x*this.currentMap.tileWidth, tiles[row][col].y*this.currentMap.tileHeight);
			enemy.create();
			this.enemies.push(enemy);
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

	_getNonSolidTiles: function(){
		var tiles = this.collisionLayer.layer.data.slice(0);
		for(var row = tiles.length - 1; row >= 0; row--){
			tiles[row] = tiles[row].slice(0);

			for(var col = tiles[row].length - 1; col >= 0; col--){
				if(tiles[row][col].index != -1){
					tiles[row].splice(col, 1);
				}
			}
		}

		return tiles;
	}


}