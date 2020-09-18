const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let test = new Rover(27);
    assert.strictEqual(test.position, 27);
    assert.strictEqual(test.mode, 'NORMAL'); //default value for mode
    assert.strictEqual(test.generatorWatts, 110); //default value for generatorWatts
  }); //test 7

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command ('MODE_CHANGE', 'LOW_POWER', 'STATUS_CHECK')];
    let message = new Message('test 8', commands);
    let rover = new Rover(30)
    let test = rover.receiveMessage(message);
    assert.strictEqual(test.message, 'test 8');
  }); //test 8

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command ('MODE_CHANGE', 'LOW_POWER'), new Command ('STATUS_CHECK')];
    let message = new Message('test 9', commands);
    let rover = new Rover(30)
    let test = rover.receiveMessage(message);
    assert.strictEqual(test.result.length, 2);
  }); //test 9

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('test 10', commands);
    let rover = new Rover(4667)
    let test = rover.receiveMessage(message);
    let result = {mode: 'NORMAL', generatorWatts: 110, position: 4667}
    assert.deepEqual(test.result[0].roverStatus, result);
  }); //test 10

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE','LOW_POWER')];
    let message = new Message('test 11', commands);
    let rover = new Rover(4667)
    let test = rover.receiveMessage(message);
    let result = 'LOW_POWER'
    assert.strictEqual(rover.mode, result);
  }); //test 11

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('MOVE', 1269)];
    let message = new Message('test 11', commands);
    let rover = new Rover(4667)
    let test = rover.receiveMessage(message);
    let result = {completed: false}
    assert.deepEqual(test.result[1], result);
  }); //test 11

  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 1269)];
    let message = new Message('test 11', commands);
    let rover = new Rover(4667)
    let test = rover.receiveMessage(message);
    let result = 1269;
    assert.strictEqual(rover.position, result);
  }); //test 12
  
}); // closes describe fuunction