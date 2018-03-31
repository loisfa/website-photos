let express     = require('express');
let bodyParser  = require('body-parser');
let fs          = require('fs');
let path        = require('path');
let cors       	= require('cors');
let PhotoHandler = require('./server/PhotoHandler.js');
let Photo       = require('./server/model/Photo.js');
let QueryParser = require('./server/QueryParser.js');
let SessionHandler = require('./server/SessionHandler.js');

let app = express();
let PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

let baseDir;
if (require('dotenv').load()) { // loads environment from .env file in root directory
  baseDir = process.env.BASE_URL /* dev */ || "/dist"/* prod */;
  console.log("Loaded .env - Base directory: " + baseDir);
  if (process.env.NODE_ENV === "dev") {
    console.log("Dev environment - Use of cors");
    let corsOptions = {
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors());
  }
}

const relativeDirectory = '/assets/photos';
photoHandler = new PhotoHandler(baseDir, relativeDirectory); // asynchronous method, be careful in the rest of the app
queryParser = new QueryParser();
sessionHandler = new SessionHandler();

// returns the ids list of all photos
app.get('/api/photos', function(req, res) {
  let response = JSON.stringify(photoHandler.getPhotoIds());
  res.send(response);
  console.info("Sent the photo ids: " + response);
});

// returns the properties of the photo identified by its id photoId
app.get("/api/photo/uri/:photoId", function(req, res) {
  let photoId = req.params.photoId;
  let photo = photoHandler.getPhoto(photoId);
  if (photo === undefined) {
    res.send("No photo with id: " + photoId);
    console.log("Could not send photo properties for id: " + photoId
      + ". Photo does not exist.");
  } else {
    let photoProperties = photo.getProperties();
    res.send({"photoProperties":photoProperties});
    console.log("Sent the photo properties for photo id: " + photoId);
  }
});

// returns the path of the photo identified by its id photoId
app.get('/api/photo/:photoId', function(req, res) {
  let photoId = req.params.photoId;
  let photo = photoHandler.getPhoto(photoId);
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
    let filename = '.' + baseDir + photo.getImagePath();
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
});

// returns a session code for the session associated with :listPhotoIds
app.get("/api/ar/web/:listPhotoIds", function(req, res) {
  let listPhotoIds = queryParser.convertQueryToList(req.params.listPhotoIds);
  let code = sessionHandler.getCode(listPhotoIds);
  res.send({"arSessionCode": code});
  console.log("sent session code: " + code);
});

// returns the photoNames associated with the code :arSessionCode
app.get("/api/ar/smartphone/:arSessionCode", function(req, res) {
  let listPhotoIds = sessionHandler.getPhotoNames(req.params.arSessionCode);
  console.log("Sent listPhotoIds: " + listPhotoIds);
  res.send({"listPhotoNames": listPhotoIds});
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// returns the files in baseDir (front-end and resources)
app.use(express.static(__dirname + baseDir));

app.listen(PORT, function() {
  console.log("Node server listening on port " + PORT);
});
