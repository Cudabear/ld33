/*
 * A helper class to do A-Star pathfinding to tiles
 */
AStarSearch = function(entity, destinationTile, map){
    this.map = map;
    this.destinationTile = destinationTile;
    this.beginTile = Util.tileUnderSprite(entity.sprite, map);
    return this;
}

AStarSearch.prototype = {
    map: null,
    beginTile: null,
    destinationTile: null,
    _open: [],
    _closed: [],

    getShortestPath: function(){
        this._open = [];
        this._closed = [];
        var shortestPath = [];

        this._iterativeSearch(this.beginTile, 0, shortestPath);

        return shortestPath;
    },

    _iterativeSearch: function(current, d, shortestPath){
        if(current === this.destinationTile){
            this._backtrack(shortestPath);
            return;
        }

        //push current tile to the closed list
        this._closed.push(current);

        //remove current tile from the open list
        var i = this._open.indexOf(current);
        if(i != -1){
            this._open.splice(i, 1);
        }

        var currentCol = Math.floor(current.x/this.map.tileWidth);
        var currentRow = Math.floor(current.y/this.map.tileHeight);

        var north = Util.tileToTheNorth(current, this.map);
        var south = Util.tileToTheSouth(current, this.map);
        var east = Util.tileToTheEast(current, this.map);
        var west = Util.tileToTheWest(current, this.map);

        if(north){
            this._pushToOpen(north, current, this.destinationTile, d);
        }

        if(south){
            this._pushToOpen(south, current, this.destinationTile, d);
        }

        if(east){
            this._pushToOpen(east, current, this.destinationTile, d);
        }

        if(west){
            this._pushToOpen(west, current, this.destinationTile, d);
        }

        if(this._open.length > 0){
            var lowestF = this._open[0];

            this._open.forEach(function(tile){
                if((tile.hCost + tile.dCost) <= (lowestF.hCost + lowestF.dCost)){
                    lowestF = tile;
                }
            }, this);

            //keep searching for the end
            this._iterativeSearch(lowestF, d + 1, shortestPath);
        }else{
            return [];
        }
            
    },

    _pushToOpen: function(tile, current, dest, d){
        if(tile.index === -1 && $.inArray(tile, this._closed) === -1 && $.inArray(tile, this._open) === -1){
            this._open.push(tile);
            tile.parentTile = current;
            tile.hCost = this._calcHCost(tile, current, dest);
            tile.dCost = d;
        }
    },

    _backtrack: function(shortestPath){
        var currentTile = this.destinationTile;

        while(!(currentTile === this.beginTile)){
            shortestPath.unshift(currentTile);
            var temp = currentTile;
            currentTile = currentTile.parentTile;
            delete temp.parentTile;
            delete temp.hCost;
            delete temp.dCost;
        }

        return shortestPath;
    },

    _calcHCost: function(tile, current, dest){
        return Math.abs(this.pxToTiles(current.x) - this.pxToTiles(dest.x)) + 
        Math.abs(this.pxToTiles(current.y) - this.pxToTiles(dest.y));
    },

    pxToTiles: function(px){
        return Math.floor(px/32);
    }
}