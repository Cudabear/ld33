Item = function(displayName, handler){ this.displayName = displayName; this.handler = handler; }

Item.prototype = {
	handler: null,
	displayName: ""
}

ItemFactory = {
	medkit: function(){return new Item("medkit",  function(){ })},
	boombox: function(){return new Item("boombox", function(){ })},
	batteries: function(){return new Item("batteries", function(){ })},
	MansionKey: function(){return new Item("Mansion Key", function(){ })},
	TownHallKey: function(){return new Item("Town Hall Key", function(){ })},
	FireExtinguisher: function(){return new Item("Fire Extinguisher", function(){ })},
	FireAxe: function(){return new Item("Fire Axe", function(){ })}
}