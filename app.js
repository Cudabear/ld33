var WIDTH = 960;
var HEIGHT = 640;
var game;

window.onload = function(){
	//create a new game and run it
	game = new Phaser.Game(WIDTH, HEIGHT, Phaser.OPENGL, 'game');

	//add the game states
	game.state.add('StartupState', new StartupState());
	game.state.add('LoadState', new LoadState());
	game.state.add('MainState', new MainState());

	//kickoff the starting state
	game.state.start('StartupState');
}
