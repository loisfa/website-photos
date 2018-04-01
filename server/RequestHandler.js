let PhotoHandler = require('./PhotoHandler.js');
let SessionHandler = require('./SessionHandler.js');
let Photo       = require('./models/Photo.js');

class RequestHandler {

  constructor(resourceDirectory, relativeDirectory) {
    this.sessionHandler = new SessionHandler();
    this.photoHandler = new PhotoHandler(resourceDirectory, relativeDirectory);
      // asynchronous method, be careful in the rest of the app
  }

  sendAllPhotoIds(res) {
    let response = JSON.stringify(this.photoHandler.getPhotoIds());
    res.send(response);
    console.info("Sent the photo ids: " + response);
  }

  sendPhotoProperty(photoId, res) {
    if (photoId === undefined) {
      res.send("Should define the id of the photo.");
      console.log("Request on get-properties but no photoId defined.");
    }
    let photo = this.photoHandler.getPhoto(photoId);
    if (photo === undefined) {
      res.send("No photo with id: " + photoId);
      console.log("Could not send photo properties for id: " + photoId
        + ". Photo does not exist.");
    } else {
      let photoProperties = photo.getProperties();
      res.send({"photoProperties":photoProperties});
      console.log("Sent the photo properties for photo id: " + photoId);
    }
  }

  sendPhotoImage(photoId, res) {
    let photo = this.photoHandler.getPhoto(photoId);
    if (photo === undefined) {
      res.send("No photowith with name: " + photoId);
      console.log("Could not send photo path. No photo with id: " + photoId);

    } else {
      let options = {
        "root" : __dirname,
        "headers": {
          "photoProperties": JSON.stringify(photo.getProperties())
        }
    	};
      let filename = '.P' + this.photoHandler.getBaseDirectory() + photo.getImagePath();
    	console.log("Filename of photo: " + filename);
      res.sendFile(filename, options, function(err) {
        if (err) {
          console.error(err);
          // next(err);
        } else {
          console.log("Sent photo with id: " + photoId);
        }
      });
    }
  }

  generateAndSendSessionCode(listPhotoIds, res) {
    let code = this.sessionHandler.getCode(listPhotoIds);
    res.send({"arSessionCode": code});
    console.log("sent session code: " + code);
  }

  sendPhotoIds(arSessionCode, res) {
    let listPhotoIds = this.sessionHandler.getPhotoNames(arSessionCode);
    console.log("Sent listPhotoIds: " + listPhotoIds);
    res.send({"listPhotoNames": listPhotoIds});
  }

}

module.exports = RequestHandler;
