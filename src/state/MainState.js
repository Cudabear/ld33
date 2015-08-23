MainState = function(){ }

MainState.prototype = {
	level: null,
	player: null,

	textbox: null,
	textboxText: null,
	textboxName: null,
	textDisplayed: false,
	textStages: [],
	textStageIndex: [],

    preload: function(){

    },

    create: function(){
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.input.onDown.add(this.onClick, this);



        this.level = new Level();
        this.level.createWorld();
        this.player = new Player();
        this.player.create();

        this.textbox = game.add.sprite(60, HEIGHT - 250, 'textbox');
        this.textboxText = game.add.bitmapText(75, HEIGHT -185, 'font', 'My text goes here. My text goes here. My text goes here. My text goes here. My text goes here. My text goes here. v My text goes here. My text goes here. v My text goes here. My text goes here. My text goes here. My text goes here.', 24);
        //this.textboxText.width = 800;
        //this.textboxText.height = 180;
        this.textboxName = game.add.bitmapText(75, HEIGHT -228, 'font', 'Dr. Edward Earnhardt', 20);
        this.textbox.alpha = 0;
	    this.textboxText.alpha = 0;
	    this.textboxName.alpha = 0;

	    this.swapForText = game.add.bitmapText(game.world.centerX - 75, game.world.centerY - 200, 'font', 'Swap For?', 32);
	    this.swapForItem1 = game.add.sprite(game.world.centerX - 300, game.world.centerY - 100, 'itembox');
	    this.swapForItem2 = game.add.sprite(game.world.centerX + 50, game.world.centerY - 100, 'itembox');
	    this.swapForItem1Text = game.add.bitmapText(game.world.centerX - 300, game.world.centerY - 100, 'font', 'blah', 32);
	    this.swapForItem2Text = game.add.bitmapText(game.world.centerX + 50, game.world.centerY - 100, 'font', 'blah', 32);
	    this.swapForText.alpha = 0;
	    this.swapForItem1.alpha = 0;
	    this.swapForItem2.alpha = 0;
	    this.swapForItem1Text.alpha = 0;
		this.swapForItem2Text.alpha = 0;

        //default starting position for first map.
        this.player.sprite.x = 0;
        this.player.sprite.y = 8*32;
    },

    update: function(){
    	if(!this.textDisplayed && !this.swapping){
	    	this.player.update();
	    	this.level.update();

	    	game.physics.arcade.collide(this.player.sprite, this.level.collisionLayer, function(e, f){ 
	    		if(f.properties.destination){
	    			this.level.handleTeleport(f, this.player, this);
	    		}

	    		if(f.properties.action){
	    			this.level.handleAction(f, this);
	    		}
	    	}, null, this);

	    	for(var i = this.level.enemies.length -1; i >= 0; i--){
	    		var e = this.level.enemies[i];

	    		e.update(this.player, this.level.currentMap, this.level.collisionLayer);

	    		this.level.enemies.forEach(function(me){
	    			game.physics.arcade.collide(me.sprite, e.sprite);
	    		}, this);

	    		if(e.health <= 0){
	    			if(e.onDead){
	    				e.onDead();
	    			}

	    			e.sprite.destroy();
	    			this.level.enemies.splice(i, 1);
	    		}
	    	}

	    	if(this.player.health <= 0){
	    		this.gameOver();
	    		this.player.sprite.destroy();
	    	}

	    	
	    }else{
	    	this.player.sprite.body.velocity.setTo(0, 0);
		    this.level.enemies.forEach(function(e){
		    	e.sprite.body.velocity.setTo(0,0);
		    }, this);
	    }

	    if(this.swapping){

	    }

	    //this.textbox.bringToTop();
    },

    render: function(){
    	// game.debug.body(this.player.sprite);

    	// this.level.enemies.forEach(function(e){
    	// 	game.debug.body(e.sprite);
    	// }, this);
    },

    onClick: function(e){
    	if(this.textDisplayed){
	    	this.textStageIndex++;

	    	if(this.textStageIndex >= this.textStages.length){
	    		this.textDisplayed = false;
	    		this.textbox.alpha = 0;
	    		this.textboxText.alpha = 0;
	    		this.textboxName.alpha = 0;

	    		if(this.callback){
	    			this.callback(this);
	    			this.callback = false;
	    		}
	    	}else{
	    		this.textboxText.setText(this.textStages[this.textStageIndex]);
	    	}
	    }else if(this.swapping){
	    	if(e.worldX > this.swapForItem1.x && e.worldX < this.swapForItem1.x + this.swapForItem1.width &&
	    		e.worldY > this.swapForItem1.y && e.worldY < this.swapForItem1.y + this.swapForItem1.height){
	    		
	    		
	    		this.actionTile.properties.bling = this.player.item1.displayName.replace(" ", "");
	    		this.level.blings[this.actionTile.properties.action].item = this.actionTile.properties.bling;
	    		this.player.item1 = this.newItem;
	    		this.player.pickup(this, this.newItem, true);
	    		this.stopSwapping();
	    	}

	    	if(e.worldX > this.swapForItem2.x && e.worldX < this.swapForItem2.x + this.swapForItem2.width &&
	    		e.worldY > this.swapForItem2.y && e.worldY < this.swapForItem2.y + this.swapForItem2.height){
	    		
	    		this.actionTile.properties.bling = this.player.item2.displayName.replace(" ", "");
	    		this.level.blings[this.actionTile.properties.action].item = this.actionTile.properties.bling;
	    		this.player.item2 = this.newItem;
	    		this.player.pickup(this, this.newItem, true);
	    		this.stopSwapping();
	    	}
	 	}else{
	    	if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
				this.player.handleClick(this.level.enemies, this.level.collisionLayer);
    		}
	    }
	},

	showText: function(textStages,callback){
		this.textStages = textStages;
		this.textStageIndex = 0;
		this.textDisplayed = true;

		this.textbox.alpha = 1;
	    this.textboxText.alpha = 1;
	    this.textboxName.alpha = 1;
	    this.textbox.bringToTop();
	    this.textboxText.parent.bringToTop(this.textboxText);
	    this.textboxName.parent.bringToTop(this.textboxName);
        this.textbox.x = 60 + game.camera.x;
        this.textbox.y = HEIGHT-250 + game.camera.y;
        this.textboxText.x = 75 + game.camera.x;
        this.textboxText.y = HEIGHT-185 + game.camera.y;
        this.textboxName.x = 75 + game.camera.x;
        this.textboxName.y = HEIGHT-228 + game.camera.y;

	    this.textboxText.setText(textStages[0]);
	    this.callback = callback;
	},

	showSwapForDialog: function(newItem, actionTile){
		this.swapForItem2.alpha = 1;
		this.swapForItem1.alpha = 1;
		this.swapForText.alpha = 1;	
		this.swapForItem1Text.alpha = 1;
		this.swapForItem2Text.alpha = 1;
		this.actionTile = actionTile;
		this.newItem = newItem;
		this.swapForItem2.x = game.world.centerX + 50 + game.camera.x;
		this.swapForItem2.y = game.world.centerY - 100 + game.camera.y;
		this.swapForItem1.x = game.world.centerX - 300 + game.camera.x;
		this.swapForItem1.y = game.world.centerY - 100 + game.camera.y;
		this.swapForItem1Text.x = game.world.centerX - 280 + game.camera.x;
		this.swapForItem1Text.y = game.world.centerY - 50 + game.camera.y;
		this.swapForItem2Text.x = game.world.centerX + 70 + game.camera.x;
		this.swapForItem2Text.y = game.world.centerY - 50 + game.camera.y;
		this.swapForItem1Text.setText(this.player.item1.displayName);
		this.swapForItem2Text.setText(this.player.item2.displayName);
		this.swapForText.setText("Swap for " + newItem.displayName + "?");
		this.swapForText.x = game.world.centerX - 150 + game.camera.x; 
		this.swapForText.y = game.world.centerY - 200 + game.camera.y;

		this.swapForItem1.bringToTop();
		this.swapForItem2.bringToTop();
		this.swapForItem1Text.parent.bringToTop(this.swapForItem1Text);
		this.swapForItem2Text.parent.bringToTop(this.swapForItem2Text);
		this.swapForText.parent.bringToTop(this.swapForText);

		this.swapping = true;
	},

	stopSwapping: function(){
		this.swapping = false;
		this.swapForItem2.alpha = 0;
		this.swapForItem1.alpha = 0;
		this.swapForText.alpha = 0;	
		this.swapForItem1Text.alpha = 0;
		this.swapForItem2Text.alpha = 0;
		this.actionTile = null;
		this.newItem = null;
	},

	gameOver: function(){
		console.log('gameover');
	}
}