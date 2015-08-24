Action = function(){ }

Action.prototype = {
	//return false for repeatable actions
	handleAction: function(id, actionTile, main){
		switch(id){
			case 1: //game intro
				main.showText(["What, where am I? ( click to continue)",
				 "This is the hospital I work in.  But what am I doing as the\n one in the bed?",
				  "The last thing I remember is going to bed at my house.\n  Did I have a heart Attack?",
				  "I don't feel particularly weak or anything...",
				  "Where even is everyone?  This is a small town but this place\n usually had a few people in it at all times.",
				  "I should have a look around and see if I can figure out\n what's going on.",
				  "(WASD to move, Q to check inventory.)"])
				return true;
			break;
			case 2: //zombie intro
				main.showText(["Hello?  Do you know what's going on here?",
					"(the zombie gurgles and looks at you curiously before\n moving in your direction)",
					"Oh God, what the hell happened to you?",
					"(the zombie claws at the bed in the way, grasping for\n your flesh)",
					"I've never seen anything like this is all my years as a\n doctor.  What has become of this person?",
					"I don't want to stick around to find out.  I need to\n find someone who isn't like this.",
					"Perhaps they'd be at the town hall?  It's in the middle\n of town."]);
				return true;
			break;
			case 3: //pickup medkit
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 4:
				main.showText(["It's so quiet. Where is everyone?  Even though\n this is a pretty small town, it's wierd that\n there's not even a soul.",
					"In fact, this whole place is looking quite run down.\n  What the hell happend here, and how long was I out for?"])

				return true;
			break;
			case 5:
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 6:
				main.showText(["Hmm, what's this?", "\"Dr. Earnhardt,",
					"Due to your inability to complete the tasks necessary to \n perform well in your role at St. Lukes, \n I unfortunately have made the decision to let you go.",
					"Your last day will be Friday, Sept 29th.\n I expect you will handle this with the\n maturity and professionalism you are known for.",
					"Sincerely, Dr. Steven.\"",
					"I was fired?  I don't remember that.\n  And even that, Sept 29th must have been ages ago!\n  It's almost winter now..."]);
				return true;
			break;
			case 7: // gun
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 8: //batteries
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 9:
				main.showText(["Hmm, what's this?", "\"Dr. Earnhardt,",
					"Due to your inability to complete the tasks necessary to \n perform well in your role at St. Lukes, \n I unfortunately have made the decision to let you go.",
					"Your last day will be Friday, Sept 29th.\n I expect you will handle this with the\n maturity and professionalism you are known for.",
					"Sincerely, Dr. Steven.\"",
					"I was fired?  I don't remember that.\n  And even that, Sept 29th must have been ages ago!\n  It's almost winter now..."]);
				return true;
			break;
			case 10:
				main.showText(["Hmm, what's this?", "\"Dr. Steven,",
					"Things have gotten too crazy around here, \n and Sophia and I are going to pack up\n and get the hell out of here.",
					"I've entrusted your spare key with the\n Police so you should go look for it at the station. \n",
					"I hope you'll make a similar choice\n and leave here before it's too late.\n He's not worth it, Steven.",
					"Godspeed, Robert Green\"",
					"Looks like the Police station is where I'll\n find Dr. Steven's key.  It's in the \n southeast corner of town."]);
				return true;
			break;
			case 11://ammo
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 12: //ammo
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 13: //ammo
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 14: //Dr. Steven's key
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 15: //Town Hall key
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 16:
				main.showText(["What, nobody's here?  That means for \n sure everyone's either left town or gotten infected.",
					"I can't say I wasn't expecting this place to \n be empty, even though I was holding onto hope that \n it wouldn't be.",
					"What's that?  It looks like that phone is\n blinking.  Is there a message?"]);
					return true;
			break;
			case 17:
				main.showText(["(you pick up the phone and listen to the message)",
					"\"Due to the presence of Patient 0 in the\n vicinity of the town of Cherrywood, The United \nStates government has declared a full quaritine of\n the area.",
					"Anyone entering or leaving the city will \n be shot on sight, until the outbreak of this \n virus can be dealth with.",
					"Mayor Smitt, I encourage you to control \n panic in your city and to preserve the life of Patient 0.\n",
					"He is the only one who is immune to the virus.\nEdward Earnhardt is our only shot at ever\n finding a cure for this plague.\"",
					"...",
					"   ...",
					"      ...",
					"The whole town, they all died, to save me?\n Because I'm the only one immune to the virus?",
					"But why?  Why would they do that? \n I am a monster...",
					"*CRASSSHHHHHH*",
					"Oh no, what was that!?",
					"I've got to get out of here!"], function(main){
						var tiles = main.level._nonJackedGetNonSolidTiles();
						var maxZombies = 10;

						slowbgm.stop();
						fastbgm.play('', 0, 1, true);

						for(var row = 8; row < tiles.length; row++){
							for(var col = 0; col < tiles[row].length; col++){
								var t = tiles[row][col];
								if(Math.random()>0.95 && maxZombies > 0){
									var enemy = new Zombie(t.x*32, t.y*32);
									enemy.create();
									enemy.speed *= 1.4;
									enemy.health += 2;
									main.level.enemies.push(enemy);
									maxZombies--;
								}
							}
						}

						main.level.currentMap.getTile(16, 17, 3).properties.destination = "endgame";
						
					});
				return true;
			break;
			case 18: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 19: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 20: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 21: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 22: //ammo
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 23: //health*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 24: //health*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 25: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 26: //ammo*
				if(main.player.pickup(main, ItemFactory[actionTile.properties.bling.replace(" ", "")]())){
					return true;
				}else{
					main.showSwapForDialog(ItemFactory[actionTile.properties.bling](), actionTile);
				}
			break;
			case 27:
				main.showText(["Hmm, what's this?",
					"\"To whoever finds this:",
					"You must protect Patient Zero.\n  I know he was the original carrier of the virus,\n but hear me out.",
					"He is the only one who is immune.\n He is the key to the cure.  Without him, we're\n done for.  He's safely locked away in the \n hospital right now.  Go to him. \n Wake him up.  Protect him.",
					"Get him to someone who will know \n what to do with his gift.  Just don't, whatever \n you do, let him die.",
					"He's a good man. I worked with him \n for many years.  He will do what you say. \n",
					"His name is Edward Earnheardt.",
					"- Steven Smith\"",
					"Dr. Steven wrote this?  The poor man.\n  He must have died... trying to protect me.\n  But this means... I'm patient zero?",
					"I'm the monster! \n Why did he die to save me?!",
					"Why?!"]);
					return true;
			break;
		}
	}
}