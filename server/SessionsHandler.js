let Code = require('./models/Session.js');

const SESSION_CODES_AMOUNT = 9999;

class SessionsHandler {

  constructor() {
    this.listSessions = {};
    this.listBookedCodes = [];
    this.listAvailableCodes = this.fillList(SESSION_CODES_AMOUNT);
  }

  /*
   * Public methods
   */
  /* 'security' concern, should send something, someone can retrieved
   * unused code --> and then used codes
   */
  getPhotoIds(sessionCode) {
    if (this.listSessions[sessionCode] === undefined) {
      console.info("Session code " + sessionCode + " does not exist.");
    }
    return this.listSessions[code].listPhotoIds;
  }

  generateAndGetSessionCode(listPhotoIds) {
    let sessionCode = this.generateSessionCode();
    if (sessionCode === undefined) {
      return undefined;
    } else {
      this.listSessions[sessionCode] = new Session(sessionCode, listPhotoNames);
      return sessionCode;
    }
  }

  /*
   * Private methods
   */
  generateSessionCode() {
    let availableCodesAmount = this.listAvailableCodes.length;

    if (availableCodesAmount >= 1) {
      console.info("Available session codes amount: " + availableCodesAmount)
      let randNumber = Math.floor(Math.random() * (availableCodesAmount + 1));
      let sessionCode = this.listAvailableCodes[randNumber];
      this.transferAvailableCodeToBookedCode(randNumber);
      return sessionCode;

    } else {
      let oldestSessionCode = this.listBookedCodes[0];
      if (this.listSessions[oldestSessionCode].hasExpired()) {
        this.depileOlderSessionCodeAndPushItOnTop(oldestSessionCode);
        return oldestSessionCode;

      } else {
        console.log("No session code available for the moment."
        +"Oldest session will expire in " + this.listSessions[oldestCode].date
        + " + " + SESSION_EXPIRATION_DURATION + "min.");
        return undefined;
      }
    }
  }

  transferAvailableCodeToBookedCode(index) {
    this.listBookedCodes.push(this.listAvailableCodes[index]);
    this.listAvailableCodes.splice(index, 1);
  }

  depileOlderSessionCodeAndPushItOnTop(oldestSessionCode) {
    this.listBookedCodes.splice(0,1);
    this.listBookedCodes.push(oldestSessionCode);
  }

  fillList(max_number) {
    let list = []
    for (let i=0; i<max_number; i++) {
      list.push(i);
    }
    return list;
  }
}

module.exports = SessionsHandler;
