MainState = function(){ }

MainState.prototype = {
	level: null,
	player: null,

    preload: function(){

    },

    create: function(){
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.input.onDown.add(this.onClick, this);

        this.level = new Level();
        this.level.createWorld();
        this.player = new Player();
        this.player.create();
    },

    update: function(){
    	this.player.update();

    	game.physics.arcade.collide(this.player.sprite, this.level.collisionLayer, function(e, f){ 
    		if(f.properties.destination){
    			this.level.handleTeleport(f, this.player);
    		}
    	}, null, this);

    	for(var i = this.level.enemies.length -1; i >= 0; i--){
    		var e = this.level.enemies[i];

    		e.update(this.player, this.level.currentMap, this.level.collisionLayer);

    		if(e.health <= 0){
    			e.sprite.destroy();
    			this.level.enemies.splice(i, 1);
    		}
    	}

    	if(this.player.health <= 0){
    		this.gameOver();
    		this.player.sprite.destroy();
    	}
    },

    render: function(){
    	game.debug.body(this.player.sprite);

    	this.level.enemies.forEach(function(e){
    		game.debug.body(e.sprite);
    	}, this);
    },

    onClick: function(){
    	if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
			this.player.handleClick(this.level.enemies, this.level.collisionLayer);
    	}
	},

	gameOver: function(){
		console.log('gameover');
	}
}