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
if (require('dotenv').load()) {
  baseDir = process.env.BASE_URL /* dev */ || "/dist"/* prod */;
  console.log("Loaded .env - Base directory: "+baseDir);
  if (process.env.NODE_ENV==="dev") {
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

app.get('/api/photos', function(req, res) {
  res.send(photoBuilder.getPhotoNames());
  console.log("Sent the photo names");
});

app.get("/api/photo/uri/:photoName", function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("no photo with this name: "+photoName);
  } else {
    let photoProperties = photo.getProperties();
    res.send({"photoProperties":photoProperties});
  }
  console.log("Sent the photo properties for " + photoName);
});

app.get('/api/photo/:photoName', function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("Error with the photo name: "+photoName);
    console.log("no photo with this name: "+photoName);
  } else {
    let options = {
      "root" : __dirname,
      "headers": {
        "photoProperties": JSON.stringify(photo.getProperties())
      }
	};
    let filename = photo.getImagePath();
	console.log("filename of photo: "+filename);
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

app.get("/api/ar/web/:listPhotoNames", function(req, res) {
  let listPhotoNames = queryParser.convertQueryToList(req.params.listPhotoNames);
  let code = sessionHandler.getCode(listPhotoNames);
  console.log("Response code: "+code);
  res.send({"arSessionCode": code});
});

app.get("/api/ar/smartphone/:arSessionCode", function(req, res) {
  let listPhotoNames = sessionHandler.getPhotoNames(req.params.arSessionCode);
  console.log("Sent listPhotoNames: "+listPhotoNames);
  res.send({"listPhotoNames": listPhotoNames});
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.use(express.static(__dirname + baseDir));

app.listen(PORT, function() {
  console.log("Node server listening on port "+PORT);
});
