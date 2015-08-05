LoadState = function(){ }

LoadState.prototype = {
    progressBar: null,

    preload: function(){
        this.progressBar = this.add.sprite(this.game.world.centerX - 250, this.game.world.centerY, 'loadBar');
        this.progressBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.progressBar);

        //IMPORTANT: Preload all necessary resources below this line
        
    },

    create: function(){
        game.state.start('MainState');
    },

    update: function(){
        
    },

    render: function(){

    }
}