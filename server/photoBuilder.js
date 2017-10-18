let fs = require('fs');
Photo = require('./photo.js');
const imagesTypes = ['png', 'jpg', 'jpeg'];

class PhotoBuilder {

  constructor(directory) {
    this.directory = directory;
    this.listPhotos = {};
    this.listPhotoNames = [];
  }

  scanFiles() {

    fs.readdir(this.directory, (err, files) => {
      files.forEach(filename => {
        let extension = this.getExtension(filename);
      	if (imagesTypes.indexOf(extension)>=0) {
          let fullPathImage = this.directory+'/'+filename;
          let fullPathFile = this.replaceExtension(fullPathImage, extension, 'json');
      		fs.readFile(fullPathFile, 'utf8',  (err, data) => {
      		  if (err) {
        			if (err.code === 'ENOENT') {
        			  console.error(fullPathFile + ' does not exist');
        			  return;
        			}
      			throw err;
      		  }
            let properties = JSON.parse(data);
      		  this.buildPhoto(fullPathImage, properties);
      		});
      	}
      });
    });

  }

  buildPhoto(fullPathImage, properties) {
    let photo = new Photo(fullPathImage, properties);
    let photoName = photo.getPhotoName();
    if (this.listPhotos[photoName] == undefined) {
      this.listPhotos[photoName] = photo;
      this.listPhotoNames.push(photoName);
    } else {
      console.log(photoName + "is a name used for two different photos: "
        +this.listPhotos[photoName].getImagePath +" and "+fullPathImage);
    }
  }

  getPhotoNames() {
    return this.listPhotoNames;
  }

  getPhoto(photoName) {
    return this.listPhotos[photoName];
  }

  getPhotos() {
    return this.listPhotos;
  }

  getExtension(filename) {
    let splitFile = filename.split('.');
    return splitFile[splitFile.length-1];
  }

  replaceExtension(filename, extension, newExtension) {
    let splitFile = filename.split('.'+extension);
    return splitFile[0]+'.'+newExtension;
  }

}

module.exports = PhotoBuilder;
