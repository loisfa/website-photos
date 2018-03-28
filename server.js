let express     = require('express');
let bodyParser  = require('body-parser');
let fs          = require('fs');
let path        = require('path');
let cors       	= require('cors');
let PhotoBuilder = require('./server/PhotoBuilder.js');
let Photo       = require('./server/Photo.js');
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
photoBuilder = new PhotoBuilder(baseDir, relativeDirectory); // asynchronous method, be careful in the rest of the app
queryParser = new QueryParser();
sessionHandler = new SessionHandler();

// returns the list of all photos
app.get('/api/photos', function(req, res) {
  res.send(photoBuilder.getPhotoNames());
  console.log("Sent the photo names");
});

// returns the properties of the photo with name :photoName
app.get("/api/photo/uri/:photoName", function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("No photo with name: " + photoName);
    console.log("could not send photo properties for " + photoName
      + ". Photo does not exist");
  } else {
    let photoProperties = photo.getProperties();
    res.send({"photoProperties":photoProperties});
    console.log("sent the photo properties for " + photoName);
  }
});

// returns the pathName of the photo with name :photoName
app.get('/api/photo/:photoName', function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("No photowith name: "+photoName);
    console.log("no photo with this name: "+photoName);

  } else {
    let options = {
      "root" : __dirname,
      "headers": {
        "photoProperties": JSON.stringify(photo.getProperties())
      }
  	};
    let filename = '.' + baseDir + photo.getImagePath();
  	console.log("filename of photo: " + filename);
    res.sendFile(filename, options, function(err) {
      if (err) {
        console.error(err);
        // next(err);
      } else {
        console.log("Sent photo: "+filename);
      }
    });
  }
});

// returns a session code for the session associated with :listPhotoNames
app.get("/api/ar/web/:listPhotoNames", function(req, res) {
  let listPhotoNames = queryParser.convertQueryToList(req.params.listPhotoNames);
  let code = sessionHandler.getCode(listPhotoNames);
  res.send({"arSessionCode": code});
  console.log("sent session code: "+code);
});

// returns the photoNames associated with the code :arSessionCode
app.get("/api/ar/smartphone/:arSessionCode", function(req, res) {
  let listPhotoNames = sessionHandler.getPhotoNames(req.params.arSessionCode);
  console.log("Sent listPhotoNames: "+listPhotoNames);
  res.send({"listPhotoNames": listPhotoNames});
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// returns the files in baseDir (front-end and resources)
app.use(express.static(__dirname + baseDir));

app.listen(PORT, function() {
  console.log("Node server listening on port "+PORT);
});
