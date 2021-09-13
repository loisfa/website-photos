const express     = require('express');
const bodyParser  = require('body-parser');
const cors       	= require('cors');
const RequestHandler = require('./server/RequestHandler.js');
const dotEnv      = require('dotenv');
const convertQueryToList = require('./server/utils/QueryUtils.js');

const app = express();
const PORT = process.env.PORT || 8080;
// app.use(bodyParser.json());

const DEV='dev';
const nodeEnv=process.env.NODE_ENV;

let resourcesPath;
if (dotEnv.load()) { // loads environment from .env file of root directory
  console.log(`process.env.BASE_URL: ${process.env.BASE_URL}`);
  resourcesPath = nodeEnv === DEV ? "/src" /* dev */ : "/dist" /* prod */;
  console.log("Loaded '.env' file. resourcesPath: " + resourcesPath);
  if (nodeEnv === DEV) {
    console.log("Dev environment - use of cors.");
    app.use(cors());
  } else {
    console.log("Prod environment.");
  }
}

const photosDirRelPath = '/assets/photos';
requestHandler = new RequestHandler(
  __dirname,
  resourcesPath,
  photosDirRelPath);

// returns the ids list of all photos
app.get("/api/photos/get-all-ids/", function(req, res) {
  requestHandler.sendAllPhotoIds(res);
});

// returns the properties of the photo identified by its id photoId
app.get("/api/photos/get-properties/:photoId", function(req, res) {
  const photoId = req.params.photoId;
  requestHandler.sendPhotoProperty(photoId, res);
});

// returns the path of the photo identified by its id photoId
app.get("/api/photos/get-image/:photoId", function(req, res) {
  const photoId = req.params.photoId;
  requestHandler.sendPhotoImage(photoId, res);
});

// returns a session code for the session associated with :listPhotoIds
app.get("/api/ar/get-session-code/:listPhotoIds", function(req, res) {
  const listPhotoIds = convertQueryToList(req.params.listPhotoIds);
  requestHandler.generateAndSendSessionCode(listPhotoIds, res);
});

// returns the ids of the photos associated with the code :arSessionCode
app.get("/api/ar/get-photo-ids/:arSessionCode", function(req, res) {
  const arSessionCode = req.params.arSessionCode;
  requestHandler.sendPhotoIds(arSessionCode, res);
});

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});

if (nodeEnv!==DEV) {
  app.use(express.static(__dirname + resourcesPath));
}

app.listen(PORT, function() {
  console.log("Node server listening on port: " + PORT);
});
