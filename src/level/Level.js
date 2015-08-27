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


		for(var key in this.blings){
			if(this.blings[key]){
				this.blings[key].alpha = 0;
			}
		}
		var tiles = this._getNonSolidTiles();
		if(id == "world"){
			if(fastbgm.isPlaying){
				fastbgm.stop();
				slowbgm.play();
			}

			for(var i = 0; i < 15; i++){
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

	handleTeleport: function(teleportSpotTile, player, main){
		if(this.hasKey(teleportSpotTile.properties.destination, player, main)){
			this._createMap(teleportSpotTile.properties.destination);

			var location = teleportSpotTile.properties.location;
			var locationParts = location.split(",");

			player.sprite.x = parseInt(locationParts[0])*this.currentMap.tileWidth + 16;
			player.sprite.y = parseInt(locationParts[1])*this.currentMap.tileHeight + 16;
			player.sprite.bringToTop();
			game.camera.focusOn(player.sprite);
		}
	},

	handleAction: function(actionTile, main){
		var actionId = parseInt(actionTile.properties.action);

		if(this.actionsUsed.indexOf(actionId) == -1){
			if(this.actionHandler.handleAction(actionId, actionTile, main)){
				
				if(actionId != 17){ //if it's the final phone trigger make sure it happens
					//even if we die or leave and come back.
					this.actionsUsed.push(actionId);
				}

				
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
						var bling;

						if(!this.blings[actionId]){
							bling = game.add.sprite(tiles[row][col].x*32, tiles[row][col].y*32, 'bling');
							

						
							this.blings[actionId] = bling;
							this.blings[actionId].item = tiles[row][col].properties.bling;
						}else{
							bling = this.blings[actionId];
							this.blings[actionId].alpha = 1;
							this.blings[actionId].bringToTop();
						}

						bling.animations.add('bling', [0, 1, 2, 3, 4, 5, 6, 7]);
						bling.animations.play('bling', 2, true);

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
	},

	_nonJackedGetNonSolidTiles: function(){
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
	},

	hasKey: function(destination, player, main){
		if(destination == "mansion"){
			if(!player.unlockedMansion && ((player.item1 && player.item1.displayName == "Mansion Key") || (player.item2 && player.item2.displayName == "Mansion Key"))){
				main.showText(["(The Mansion Key fits the lock and the door squeaks\n open.)",
					"It's quiet inside.  I'm not so sure I want to figure out what \n happened to Dr. Steven anymore."]);
				if(player.item1 && player.item1.displayName == "Mansion Key"){
					player.item1 = null;
				}else{
					player.item2 = null;
				}
				player.unlockedMansion = true;
			}else if(player.unlockedMansion){
				return true;
			}else{
				main.showText(["Hmm.  This is the Dr. Steven's house.  It's bigger\n than I remember.",
					"The door seems to be locked, and the house in good condition,\n but nobody is answering the door.",
					"Could anybody be inside?",
					"I should see if I can find the key down at the diner.  Dr. \n Steven used to go there with his wife often.",
					"Maybe he left a spare with the owner?"]);
				return false;
			}
		}else if(destination == "restaraunt"){
			if(!player.unlockedRestaraunt && (((player.item1 && player.item1.displayName == "boombox") && (player.item2 && player.item2.displayName == "batteries")) ||
				((player.item1 && player.item1.displayName == "batteries") && (player.item2 && player.item2.displayName == "boombox")))){
					main.showText(["Okay, here goes nothing.",
						"(you smartly go around back and place the boombox \njust outside the door, then turn it on and run.)",
						"(After a few moments, you notice the building has\n mostly cleared of zombies.)",
						"Alright, that worked like a charm!"], function(){player.sprite.body.velocity.y = -1;});
						player.unlockedRestaraunt = true;

						player.item1 = null;
						player.item2 = null;
					return false;
			}else if(player.unlockedRestaraunt){
				return true;
			}else{
				main.showText(["Ah, the Old Fox Den.  Our small town's\n only restaraunt.",
					"I used to go here often when I was younger, but now,\n not so much.",
					"I hope old Farmer Green and his wife are okay.",
					"(You go to open the door, but inside you notice a huge crowd\n of zombies.)",
					"Whoa!  I can't go in there right now.  Maybe I can set\n something up to lure them out the back door?",
					"I should explore a bit and see what I can find."]);
				return false;
			}
		}else if(destination == "townhall"){
			if((player.item1 && player.item1.displayName == "Town Hall Key") || (player.item2 && player.item2.displayName == "Town Hall Key")){
				if(!player.warnHall){
					player.warnHall = true;
					main.showText(["Finally, I can get to the bottom of this whole situation"], function(){player.sprite.body.velocity.y = -1;})
					return false;
				}else{
					return true;
				}
				
			}else{
				main.showText(["(You try to door, only to find it locked).",
					"Something really bad must have happend for the town \nhall to be locked like this.",
					"The only days I've ever seen it locked were holidays.\n Even during a union strike the mayor was taking meetings.",
					"(You knock on the door, but nobody answers)",
					"It looks dead inside, I'm not sure anyone's inside. \n but how will I get in?",
					"I know!  Dr. Steven had a spare key for the city hall.\n Maybe he'll lend it to me.",
					"That is, if he's still even alive...",
					"Can't think like that right now.  I need that key.\n  His house was the mansion on the west side of town."]);
				return false;
			}

		}else if(destination == "houseD"){
			if(!player.houseDWarning){
				main.showText(["This is my house, but I can hardly recognize it.\n It seems like nobody has been here in months.",
					"I can't believe this is all happening.  It's like I'm\n the only one left who hasn't been infected or gone crazy."], function(){player.sprite.body.velocity.y = -1;});
				player.houseDWarning = true;
				return false;
			}else{
				return true;
			}
		}else if(destination == "school"){
			if(!player.schoolWarning){
				main.showText(["The school.  I haven't been here in years.\n  It hasn't changed much, except for the fact that there's\n no children.",
					"There might be something useful inside.  I should\n definately check it out.",
					"(As you reach for the door, a horrible scream comes from\n inside.)",
					"Whoa.  When I enter I better be ready to face whatever that\n was."], function(){player.sprite.body.velocity.y = -1;});
					player.schoolWarning = true;
					return false;
			}else{
				return true;
			}
		}else if(destination == "police"){
			if(!player.unlockedPolice && !player.hasGun){
				main.showText(["Even the police station is dark and looks abandoned.\n I don't know if anyone's been here for months.",
					"Looks like there's a lot of activity inside.  I don't want to \n go in there without something to defend myself.",
					"I should search around some more."]);

				player.unlockedPolice = true;
				return false;
			}else if(player.unlockedPolice || player.hasGun){
				if(player.warningPolice){
					return true;
				}else{
					player.warningPolice = true;
					main.showText(["Normally this is the first place I'd come \n to when something dangerous was going on. \n",
						"Now, with the number of sick people inside, I'm\n pretty sure this is the last place I should be."], function(){player.sprite.body.velocity.y = -1;})
				}
			}
		}else{
			return true;
		}
	}


}