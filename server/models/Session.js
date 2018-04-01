const EXPIRATION_DURATION = 60; //min

class Session {
  constructor(code, listPhotoNames) {
    this.code = code;
    this.listPhotoNames = listPhotoNames;
    this.date = new Date();
  }

  hasExpired() {
    let now = new Date();
    if (now.setMinutes(someDate.getMinutes() - EXPIRATION_DURATION) <= this.date) {
      console.log("Code "+this.code+" has expired "
      +"(created at "+this.date+")");
    }
  }
}

module.exports = Session;
