CreditState = function(){ }

CreditState.prototype = {
    text: [],

    preload: function(){

    },

    create: function(){
      var xPos = WIDTH/4 - 50;
      var yPos = HEIGHT + 50;

      this.text.push(game.add.bitmapText(xPos + 50, yPos, 'font', "Patient ZERO", 64));
      this.text.push(game.add.bitmapText(xPos, yPos+150, 'font', "A game made by Cudabear for Ludum \nDare #33: You are the Enemy", 32));
      this.text.push(game.add.bitmapText(xPos, yPos+250, 'font', "This game was created entirely\n within a space of 48 hours.", 32));
      this.text.push(game.add.bitmapText(xPos, yPos+350, 'font', "Thank you for playing!!", 32));
      this.text.push(game.add.bitmapText(xPos, yPos+400, 'font', "(no fancy retry button, sorry.\n  Refresh the browser to try again.)", 32));
    },

    update: function(){
      this.text.forEach(function(text){
        text.y -= 0.7;
      }, this);
    },

    render: function(){

    }
}