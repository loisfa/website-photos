fs = require('fs');
Photo = require('./model/Photo.js');
PhotoUtils = require('./utils/PhotoUtils.js');
const jsonExtension = ".json";


class PhotoHandler {
  constructor(baseDir, directory) {
    this.baseDir = '.' + baseDir;
    this.directory = this.baseDir + directory;
    this.photos = {};
    this.listPhotoIds = [];
    this.scanPhotoFolder();
  }

  scanPhotoFolder() {
    fs.readdir(this.directory, (err, files) => {
      console.log("Scanning directory: " + this.directory);
      if (err) {
        console.error(err);
      } else if (files === undefined) {
        console.log("No files found in directory: " + this.directory);
      }

      else {
        files.forEach(filename => {
          let extension = this.getExtension(filename);
        	if (IMAGE_EXTENSIONS.includes(extension) === true) {
            let imageFullPath = this.directory + '/' + filename;
            console.log("Image full path: " + imageFullPath);
            let fullPathFile = this.replaceExtension(
              imageFullPath, extension, jsonExtension);
        		fs.readFile(fullPathFile, 'utf8',  (err, data) => {
        		  if (err) {
          			if (err.code === 'ENOENT') {
          			  console.error(fullPathFile + ' does not exist');
          			  return;
          			}
        			throw err;
        		  }
              let properties = JSON.parse(data);
              console.log("imageFullPath (before replacement of base directory): "
                  + imageFullPath);
        		  this.buildPhoto(imageFullPath, properties);
        		});
        	}
        });
      }
    });
  }

  buildPhoto(imageFullPath, properties) {
    let photo = new Photo(this.removeBaseDir(imageFullPath), properties);
    let photoId = photo.getPhotoId();
    if (this.photos[photoId] === undefined) {
      this.photos[photoId] = photo;
      this.listPhotoIds.push(photoId);
    }
  }

  removeBaseDir(path) {
    let pathWithoutBaseDir = path.replace(this.baseDir, "");
    return pathWithoutBaseDir;
  }

  getPhotoIds() {
    return this.listPhotoIds;
  }

  getPhoto(photoId) {
    return this.photos[photoId];
  }

  getPhotos() {
    return this.photos;
  }

  getExtension(filename) {
    let splitFile = filename.split('.');
    return "." + splitFile[splitFile.length-1];
  }

  replaceExtension(filename, extension, newExtension) {
    let splitFile = filename.split(extension);
    return splitFile[0] + newExtension;
  }

}

module.exports = PhotoHandler;
