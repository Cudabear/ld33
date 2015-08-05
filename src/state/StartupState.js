StartupState = function(){ }

StartupState.prototype = {
    logoImage: null,
    logoText: null,
    frameCounter: 0,

    preload: function(){
        this.load.image('logoImage', 'res/img/wrapper/manfredi.png');
        this.load.image('logoText', 'res/img/wrapper/logo.png');
        this.load.image('loadBar', 'res/img/wrapper/loadbar.png');
    },

    create: function(){
       this.logoImage = this.add.sprite(this.world.centerX, this.world.centerY - 80, 'logoImage');
       this.logoImage.height = 256;
       this.logoImage.width = 256;
       this.logoImage.anchor.setTo(0.5);
       this.logoImage.alpha = 0;

       this.logoText = this.add.sprite(this.world.centerX, this.world.centerY + 80, 'logoText');
       this.logoText.anchor.setTo(0.5);
       this.logoText.alpha = 0;
    },

    update: function(){
        if(this.time.now > 1800 && this.time.now < 7200){
            if(this.logoImage.alpha < 1){
                this.logoImage.alpha += 0.005;
            }

            if(this.logoImage.alpha > 0.5 && this.logoText.alpha < 1){
                this.logoText.alpha += 0.005;
            }
        }

        if(this.time.now > 7200){
            if(this.logoImage.alpha > 0){
                this.logoImage.alpha -= 0.01;
            }

            if(this.logoText.alpha > 0){
                this.logoText.alpha -= 0.01;
            }
        }

        if(this.time.now > 9000){
            this.state.start('LoadState');
        }
    },

    render: function(){

    }
}