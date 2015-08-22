LoadState = function(){ }

LoadState.prototype = {
    progressBar: null,

    preload: function(){
        this.progressBar = this.add.sprite(this.game.world.centerX - 250, this.game.world.centerY, 'loadBar');
        this.progressBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.progressBar);

        //IMPORTANT: Preload all necessary resources below this line
        game.load.tilemap('world', 'res/lvl/world.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('houseE', 'res/lvl/houseE.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'res/img/tileset.png');

        game.load.atlasJSONHash('guy', 'res/img/guy.png', 'res/img/guyAnim.json');
        game.load.atlasJSONHash('zombie1', 'res/img/zombie1.png', 'res/img/zombieAnim.json');
        
    },

    create: function(){
        game.state.start('MainState');
    },

    update: function(){
        
    },

    render: function(){

    }
}