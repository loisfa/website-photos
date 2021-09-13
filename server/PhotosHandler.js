let fileSystem = require('fs');
let Photo = require('./models/Photo.js');
require('./utils/PhotoUtils.js');

class PhotosHandler {

  constructor(rootDirName, resourcesPath, photosRelativePath) {
    this.rootDirName = rootDirName;
    this.resourcesPath = resourcesPath;
    this.photosDirAbsPath = resourcesPath + photosRelativePath;
    this.photos = {};
    this.listPhotoIds = [];
    this.fillPhotosAfterScan();
  }

  /*
   * Public methods
   */
  getPhotoIds() {
    return this.listPhotoIds;
  }

  getPhoto(photoId) {
    return this.photos[photoId];
  }

  getPhotos() {
    return this.photos;
  }

  getresourcesPath() {
    return this.resourcesPath;
  }

  getRootDirName() {
    return this.rootDirName;
  }

  /*
   * Private methods
   */
  fillPhotosAfterScan() {
    fileSystem.readdir('.' + this.photosDirAbsPath, (err, files) => {
      console.info("Scanning photos directory: " + this.photosDirAbsPath);

      if (err) {
        console.error(err);

      } else if (files === undefined) {
        console.error("No files found in directory: " + this.directory);

      } else {
        files.forEach(filename => {
          this.buildPhotoFromFilename(filename);
        });
      }
    });
  }

  buildPhotoFromFilename(filename) {
    let fileExtension = this.getExtension(filename);
    if (IMAGE_EXTENSIONS.includes(fileExtension) === true) {
      let imageFullPath = this.photosDirAbsPath + '/' + filename;
      let jsonFileFullPath = this.replaceExtension(
        imageFullPath, fileExtension, JSON_EXTENSION);
      fileSystem.readFile('.' + jsonFileFullPath, 'utf8',  (err, jsonData) => {
        this.buildPhotoPropertiesFromJsonData(err, jsonData, imageFullPath);
      });
    }
  }

  buildPhotoPropertiesFromJsonData(err, jsonData, imageFullPath) {
    if (err) {
      console.warn(err);
    } else {
      let properties = JSON.parse(jsonData);
      this.buildPhoto(imageFullPath, properties);
    }
  }

  buildPhoto(imageFullPath, properties) {
    let photo = new Photo(this.removeResourcesDir(imageFullPath), properties);
    let photoId = photo.getPhotoId();
    if (this.photos[photoId] === undefined) {
      this.photos[photoId] = photo;
      this.listPhotoIds.push(photoId);
    }
  }

  removeResourcesDir(path) {
    console.log("this.resourcesPath: " + this.resourcesPath);
    let pathWithoutResourcesDir = path.replace(this.resourcesPath, "");
    return pathWithoutResourcesDir;
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

module.exports = PhotosHandler;
