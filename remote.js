#!/usr/bin/env node
var Blynk = require('/usr/lib/node_modules/blynk-library');
var serialport = require('serialport');
var port = new serialport('/dev/ttyACM0');
var blynk = new Blynk.Blynk('4f018551f5bc41548d80d021e096e0d1');
var exec = require('child_process').exec, child;

var power = new blynk.VirtualPin(0);
var menu = new blynk.VirtualPin(1);
var volUp = new blynk.VirtualPin(2);
var volDown = new blynk.VirtualPin(3);
var lampSwitch = new blynk.VirtualPin(4);
var lampBrightness = new blynk.VirtualPin(5);
var enter = new blynk.VirtualPin(6);
var input = new blynk.VirtualPin(7);

power.on('write', function(param) 	{ if (param == 1) { port.write('l') console.log("TV power"); }}); 
menu.on('write', function(param) 	{ if (param == 1) { port.write('i') console.log("TV menu"); }}); 
volUp.on('write', function(param) 	{ if (param == 1) { port.write('b') console.log("TV volume up"); }}); 
volDown.on('write', function(param) { if (param == 1) { port.write('c') console.log("TV volume down"); }}); 

lampSwitch.on('write', function(param) 	{
	var command;
	if (param == 1) {
		command = "python /home/jj/Workspace/lightflask/bulbman.py -on";
	}else{
		command = "python /home/jj/Workspace/lightflask/bulbman.py -off";
	}
	exec(command);
	console.log(command);
});

lampBrightness.on('write', function(param) {
	var command = "python /home/jj/Workspace/lightflask/bulbman.py -level "+ param;
	exec(command);
	console.log(command);
});

enter.on('write', function(param) 	{ if (param == 1) { port.write('x') console.log("TV enter") }});
input.on('write', function(param) 	{ if (param == 1) { port.write('w') console.log("TV input") }});

blynk.on('connect', function() { console.log("Blynk ready."); });
blynk.on('disconnect', function() { console.log("DISCONNECT"); });
