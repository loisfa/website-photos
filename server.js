let express = require('express'),
bodyParser  = require('body-parser'),
fs          = require('fs'),
PhotoBuilder = require('./server/photoBuilder'),
Photo       = require('./server/photo'),
QueryParser = require('./server/queryParser'),
SessionHandler = require('./server/sessionHandler'),
path        = require('path'),
cors       	= require('cors');


let app = express();

let baseDir;
if (require('dotenv').load()) {
  console.log("Loaded .env");
  baseDir = process.env.BASE_URL /* dev */ || "/dist"/* prod */;
  console.log("Base directory: "+baseDir);
  if (process.env.NODE_ENV==="dev") {
    console.log("Dev environment, use of cors");
    let corsOptions = {
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors());
  }
}


let PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

const relativeDirectory = './assets/photos';
photoBuilder = new PhotoBuilder(relativeDirectory);
photoBuilder.scanFiles(); // asynchronous method, be careful in the rest of the app
queryParser = new QueryParser();
sessionHandler = new SessionHandler();

app.get('/api/photos', function(req, res) {
  res.send(photoBuilder.getPhotoNames());
  console.log("sent the photo names");
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
});

app.get('/api/photo/:photoName', function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("no photo with this name: "+photoName);
  } else {
    let options = {
      "root" : __dirname,
      "headers": {
        "photoProperties": JSON.stringify(photo.getProperties())
      }
	};
    let filename = photo.getImagePath();
    res.sendFile(filename, options, function(err) {
      console.log("file to send: "+filename);
	  console.log(options.headers.photoProperties);
      if (err) {
        console.error(err);
        // next(err);
      } else {
        console.log("sent photo: "+filename);
      }
    });
  }
});

app.get("/api/ar/web/:listPhotoNames", function(req, res) {
  let listPhotoNames = queryParser.convertQueryToList(req.params.listPhotoNames);
  let code = sessionHandler.getCode(listPhotoNames);
  console.log("response code: "+code);
  res.send({"arSessionCode": code});
});

app.get("/api/ar/smartphone/:arSessionCode", function(req, res) {
  let listPhotoNames = sessionHandler.getPhotoNames(req.params.arSessionCode);
  console.log("sent listPhotoNames: "+listPhotoNames);
  res.send({"listPhotoNames": listPhotoNames});
});

app.use(express.static(__dirname + baseDir));
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});*/

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.listen(PORT, function() {
  console.log("Node server listening to port "+PORT);
});
