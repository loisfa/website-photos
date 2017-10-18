let express = require('express'),
bodyParser  = require('body-parser'),
fs          = require('fs'),
PhotoBuilder = require('./server/photoBuilder'),
Photo       = require('./server/photo'),
QueryParser = require('./server/queryParser'),
SessionHandler = require('./server/sessionHandler');


let app = express();
let PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

let directory = __dirname + '/assets/photos';
//let directory = './assets/photos';
photoBuilder = new PhotoBuilder(directory);
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
  let options = {
    'root' : __dirname,
    'headers': {
      'photoProperties': JSON.stringify(photo.getProperties())
    }
  };
  let filename = photo.getImagePath();
  res.sendFile(filename, options, function(err) {
    if (err) {
      console.error(err);
      next("err");
    } else {
      console.log("sent photo: "+filename);
    }
  });
});

app.get("/api/vr/web/:listPhotoNames", function(req, res) {
  let listPhotoNames = queryParser.convertQueryToList(req.params.listPhotoNames);
  let code = sessionHandler.getCode(listPhotoNames);
  console.log("response code: "+code);
  res.send({"vrSessionCode": code});
});

app.get("/api/vr/smartphone/:vrSessionCode", function(req, res) {
  let listPhotoNames = sessionHandler.getPhotoNames(req.params.vrSessionCode);
  res.send({"listPhotoNames": listPhotoNames});
  console.log("sent listPhotoNames: "+listPhotoNames);
});



app.listen(PORT, function() {
  console.log("Node server listening to port "+PORT);
});
