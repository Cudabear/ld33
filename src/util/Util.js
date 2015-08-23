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
	},

	getTilesOnPath: function(startX, startY, endX, endY, layer){
		var line = new Phaser.Line(startX, startY, endX, endY);

		return layer.getRayCastTiles(line, 3, true);
	},

	lineIntersectsRect: function(p1x, p1y, p2x, p2y, rx, ry, rw, rh){
        return Util.lineIntersectsLine(p1x, p1y, p2x, p2y, rx, ry, rx + rw, ry) ||
               Util.lineIntersectsLine(p1x, p1y, p2x, p2y, rx + rw, ry, rx + rw, ry + rh) ||
               Util.lineIntersectsLine(p1x, p1y, p2x, p2y, rx + rw, ry + rh, rx, ry + rh) ||
               Util.lineIntersectsLine(p1x, p1y, p2x, p2y, rx, ry + rh, rx, ry);
    },

    lineIntersectsLine: function(l1p1x, l1p1y, l1p2x, l1p2y, l2p1x, l2p1y, l2p2x, l2p2y){
        var q = (l1p1y - l2p1y) * (l2p2x - l2p1x) - (l1p1x - l2p1x) * (l2p2y - l2p1y);
        var d = (l1p2x - l1p1x) * (l2p2y - l2p1y) - (l1p2y - l1p1y) * (l2p2x - l2p1x);

        if( d == 0 ){
            return false;
        }

        var r = q / d;

        q = (l1p1y - l2p1y) * (l1p2x - l1p1x) - (l1p1x - l2p1x) * (l1p2y - l1p1y);
        var s = q / d;

        if( r < 0 || r > 1 || s < 0 || s > 1 ){
            return false;
        }

        return true;
    },
}