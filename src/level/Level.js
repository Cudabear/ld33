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

		for(var i =0; i < 10; i++){
			var zombie = new Zombie(Math.floor(Math.random()*this.currentMap.width)*32, Math.floor(Math.random()*this.currentMap.height)*32);
			zombie.create();
			this.enemies.push(zombie);
		}
	},

	handleTeleport: function(teleportSpotTile, player){
		this._createMap(teleportSpotTile.properties.destination);

		var location = teleportSpotTile.properties.location;
		var locationParts = location.split(",");

		player.sprite.x = parseInt(locationParts[0])*this.currentMap.tileWidth + 16;
		player.sprite.y = parseInt(locationParts[1])*this.currentMap.tileHeight + 16;
		player.sprite.bringToTop();
	}


}