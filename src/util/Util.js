Util = {
	getDistanceBetweenSprites: function(a, b){
		var diffX = a.x - b.x;
		var diffY = a.y - b.y;

		return Math.sqrt(diffX*diffX + diffY*diffY);
	},

	tileUnderSprite: function(a, map){
		return map.getTile(Math.floor(a.x/map.tileWidth), Math.floor(a.y/map.tileHeight), 3, true);
	},

	tileToTheNorth: function(tile, map){
		return map.getTile(tile.x, tile.y-1, 3, true);
	},

	tileToTheSouth: function(tile, map){
		return map.getTile(tile.x, tile.y+1, 3, true);
	},

	tileToTheEast: function(tile, map){
		return map.getTile(tile.x+1, tile.y, 3, true);
	},

	tileToTheWest: function(tile, map){
		return map.getTile(tile.x-1, tile.y, 3, true);
	}
}