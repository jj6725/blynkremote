#!/usr/bin/env node
var Blynk = require('/usr/lib/node_modules/blynk-library');
var serialport = require('serialport');
var port = new serialport('/dev/ttyACM0');
var AUTH = '4f018551f5bc41548d80d021e096e0d1';
var blynk = new Blynk.Blynk(AUTH);

var power = new blynk.VirtualPin(0);
var menu = new blynk.VirtualPin(1);
var volup = new blynk.VirtualPin(2);
var voldown = new blynk.VirtualPin(3);
var select = new blynk.VirtualPin(4);
var back = new blynk.VirtualPin(5);
var enter = new blynk.VirtualPin(6);
var input = new blynk.VirtualPin(7);
var direction = new blynk.VirtualPin(8);

function between(x, min, max) {return x >= min && x <= max;}

power.on('write', function(param) 	{ if (param == 1) { port.write('l') }});
menu.on('write', function(param) 	{ if (param == 1) { port.write('i') }});
volup.on('write', function(param) 	{ if (param == 1) { port.write('b') }});
voldown.on('write', function(param) { if (param == 1) { port.write('c') }});
select.on('write', function(param) 	{ if (param == 1) { port.write('h') }});
back.on('write', function(param) 	{ if (param == 1) { port.write('j') }});
enter.on('write', function(param) 	{ if (param == 1) { port.write('x') }});
input.on('write', function(param) 	{ if (param == 1) { port.write('w') }});
direction.on('write', function(param) {
	var x = parseInt(param[0]);
	var y = parseInt(param[1]);

	if(between(x,0,32) && between(y,96,160)){
		port.write('f')
	}else if(between(x,224,256) && between(y,96,160)){
		port.write('g')
	}else if(between(x,96,160) && between(y,224,256)){
		port.write('d')
	}else if(between(x,96,160) && between(y,0,32)){
		port.write('e')
	}

});

blynk.on('connect', function() { console.log("Blynk ready."); });
blynk.on('disconnect', function() { console.log("DISCONNECT"); });
