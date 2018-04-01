let express     = require('express');
let bodyParser  = require('body-parser');
let fs          = require('fs');
let path        = require('path');
let cors       	= require('cors');
let RequestHandler = require('./server/RequestHandler.js');
require('./server/utils/QueryUtils.js');

let app = express();
let PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

let resourceDirectory;
if (require('dotenv').load()) { // loads environment from .env file in root directory
  resourceDirectory =   process.env.BASE_URL /* dev */ || "/dist"/* prod */;
  console.log("Loaded .env - Base directory: " + resourceDirectory);
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
requestHandler = new RequestHandler(resourceDirectory, relativeDirectory);

// returns the ids list of all photos
app.get("/api/photos/get-all-ids/", function(req, res) {
  requestHandler.sendAllPhotoIds(res);
});

// returns the properties of the photo identified by its id photoId
app.get("/api/photos/get-properties/:photoId", function(req, res) {
  let photoId = req.params.photoId;
  requestHandler.sendPhotoProperty(photoId, res);
});

// returns the path of the photo identified by its id photoId
app.get("/api/photos/get-image/:photoId", function(req, res) {
  let photoId = req.params.photoId;
  requestHandler.sendPhotoImage(photoId, res);
});

// returns a session code for the session associated with :listPhotoIds
app.get("/api/ar/get-session-code/:listPhotoIds", function(req, res) {
  let listPhotoIds = queryParser.convertQueryToList(req.params.listPhotoIds);
  generateAndSendSessionCode(listPhotoIds, res);
});

// returns the ids of the photos associated with the code :arSessionCode
app.get("/api/ar/get-photo-ids/:arSessionCode", function(req, res) {
  let arSessionCode = req.params.arSessionCode;
  sendPhotoIds(arSessionCode, res);
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// returns the files in baseDir (front-end and resources)
app.use(express.static(__dirname + relativeDirectory));

app.listen(PORT, function() {
  console.log("Node server listening on port: " + PORT);
});
