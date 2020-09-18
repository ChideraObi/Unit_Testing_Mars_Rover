const Message = require('./message.js');

class Rover {
  constructor(position) {
    this.position = position;
   if (!position) {
      throw Error("Position is required.");
   } 
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

    receiveMessage(message) {
      let results = {
        message: message.name, //pulls in first message
        result: []
      };

      for (let i = 0; i < message.commands.length; i++) {
        let checkCommand = message.commands[i].commandType; //captures command in a variable
        if (checkCommand === 'STATUS_CHECK') {
          let roverObject = {
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          };
          results.result.push(roverObject);

        } else if (checkCommand === 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          let roverObject = {
            completed: true
          };
          results.result.push(roverObject);

        } else if (checkCommand === 'MOVE') {
          if (this.mode !== 'LOW_POWER') {
            this.position = message.commands[i].value;
            let roverObject = {
              completed: true
            };
          } else {
            let roverObject = {
              completed: false
            };
          results.result.push(roverObject);
          }
        }
      } //loops through each command and pushes them into the result array inside the results Object

      return results;
    }

};

module.exports = Rover;