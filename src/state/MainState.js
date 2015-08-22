MainState = function(){ }

MainState.prototype = {
	level: null,
	player: null,
	enemies: null,

    preload: function(){

    },

    create: function(){
    	game.physics.startSystem(Phaser.Physics.ARCADE);

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

    	this.level.enemies.forEach(function(e){
    		e.update(this.player, this.level.currentMap);
    	}, this);

    },

    render: function(){
    	game.debug.body(this.player.sprite);

    	this.level.enemies.forEach(function(e){
    		game.debug.body(e.sprite);
    	}, this);
    }
}