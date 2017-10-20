let express = require('express'),
bodyParser  = require('body-parser'),
fs          = require('fs'),
PhotoBuilder = require('./server/photoBuilder'),
Photo       = require('./server/photo'),
QueryParser = require('./server/queryParser'),
SessionHandler = require('./server/sessionHandler'),
path        = require('path');


let app = express();
let PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

let relativeDirectory = './assets/photos';
photoBuilder = new PhotoBuilder(relativeDirectory);
photoBuilder.scanFiles();
// asynchronous method, be careful in the rest of the app
queryParser = new QueryParser();
sessionHandler = new SessionHandler();

app.get('/api/photos/get-photo-names', function(req, res) {
  res.send(photoBuilder.getPhotoNames());
  console.log("sent the photo names");
});

app.get('/api/photos/:photoName', function(req, res) {
  let photoName = queryParser.parseQuery(req.params.photoName);
  let photo = photoBuilder.getPhoto(photoName);
  if (photo === undefined) {
    res.send("no photo with this name: "+photoName);
  } else {
    let options = {
      'root' : __dirname,
      'headers': {
        'photoProperties': JSON.stringify(photo.getProperties())
      }
    };
    let filename = photo.getImagePath();
    res.sendFile(filename, options, function(err) {
      console.log("filename to send: "+filename);
      if (err) {
        console.error(err);
        // next(err);
      } else {
        console.log("sent photo: "+filename);
      }
    });
  }
});

app.get("/api/vr/web/:listPhotoNames", function(req, res) {
  let listPhotoNames = queryParser.convertQueryToList(req.params.listPhotoNames);
  let code = sessionHandler.getCode(listPhotoNames);
  console.log("response code: "+code);
  res.send({"vrSessionCode": code});
});

app.get("/api/vr/smartphone/:vrSessionCode", function(req, res) {
  let listPhotoNames = sessionHandler.getPhotoNames(req.params.vrSessionCode);
  console.log("sent listPhotoNames: "+listPhotoNames);
  res.send({"listPhotoNames": listPhotoNames});
});

app.use(express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.listen(PORT, function() {
  console.log("Node server listening to port "+PORT);
});
