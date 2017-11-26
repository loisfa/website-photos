let Code = require('./Session.js');

const MAX_NUMBER = 9999;

class SessionHandler {

  constructor() {
    this.listSessions = {};

    // use the following code to optimize generation of code numbers
    this.listAvailableCodes = this.fillList(MAX_NUMBER);
    this.listUsedCodes = [];
  }

  getPhotoNames(code) {
    if (this.listSessions[code] === undefined) {
      console.log("Code "+code+" does not exist");
      // 'security' concern, should send something, a person can retrieved unused code --> and then used codes
    }
    return this.listSessions[code].listPhotoNames;
  }

  getCode(listPhotoNames) {
    let codeNumber = this.generateCode();
    this.listSessions[codeNumber] = new Code(codeNumber, listPhotoNames);
    return codeNumber;
  }

  generateCode() {
    let length = this.listAvailableCodes.length;
    if (length >=1) {
      console.log("length:"+length);
      let randNumber = Math.floor( Math.random() * (length+1) );
      let code = this.listAvailableCodes[randNumber];
      this.transferCodeToUsed(randNumber);
      console.log("randNumber="+randNumber);
      console.log("code="+code);
      return code;
    } else {
      let oldestSession = this.listUsedCodes[0];
      if (this.listSessions[oldestCode].hasExpired()) {
        this.listUsedCodes.splice(0,1);
        this.listUsedCodes.push(oldestCode);
        return this.listUsedCodes.pop();
      } else {
        console.log("No code available for the moment. "
        +"Oldest code expires at " + this.listSessions[oldestCode].date + "+60 min");
        return undefined;
      }
    }
  }

  transferCodeToUsed(index) {
    this.listUsedCodes.push(this.listAvailableCodes[index]);
    this.listAvailableCodes.splice(index, 1);
  }

  fillList(max_number) {
    let list = []
    for (let i=0; i<max_number; i++) {
      list.push(i);
    }
    return list;
  }
}

module.exports = SessionHandler;
