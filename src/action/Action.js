Action = function(){ }

Action.prototype = {
	//return false for repeatable actions
	handleAction: function(id, actionTile, main){
		switch(id){
			case 1:
				main.showText(["This is the first line of text.", "This is the second line of text.\n It occupies two lines.", "This is the third line of text."])
				return true;
			break;
			case 2:
				console.log('action2');
				return true;
			break;
			case 3:
				if(main.player.pickup(ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 4:

			break;
			case 5:

			break;
			case 6:

			break;
			case 7:

			break;
			case 8:

			break;
			case 9:

			break;
			case 10:

			break;
			case 11:

			break;
		}
	}
}