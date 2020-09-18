const assert = require('assert');
const Message = require('../message.js');

describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name is required.'
      }
    );
  }); // test 4

  it("constructor sets name", function() {
    let test = new Message('this is a string');
    assert.strictEqual(test.name, "this is a string");
  }); // test 5

  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commands = ['MODE_CHANGE', 'LOW_POWER', 'STATUS_CHECK'];
    let test = new Message("kiwi", commands);
    assert.strictEqual(test.commands, commands);
  }); // test 6


}); // closes describe fuunction