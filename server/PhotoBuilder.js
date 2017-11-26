let fs = require('fs');
Photo = require('./photo.js');
const imagesTypes = ['png', 'jpg', 'jpeg'];

class PhotoBuilder {
  constructor(baseDir, directory) {
    this.baseDir = '.'+baseDir;
    this.directory = this.baseDir + directory;
    this.listPhotos = {};
    this.listPhotoNames = [];
    this.scanFiles();
  }

  scanFiles() {

    fs.readdir(this.directory, (err, files) => {
      console.log("scanning directory: "+this.directory);
      if (err) {
        console.log("err:");
        console.error(err);
      } else if (files===undefined) {
        console.log("no files found in "+this.directory);
      }
      else {
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
              console.log("fullPathImage (before replacement of base directory): "+fullPathImage);
        		  this.buildPhoto(fullPathImage, properties);
        		});
        	}
        });
      }
    });
  }

  buildPhoto(fullPathImage, properties) {
    let photo = new Photo(this.removeBaseDir(fullPathImage), properties);
    let photoName = photo.getPhotoName();
    if (this.listPhotos[photoName] == undefined) {
      this.listPhotos[photoName] = photo;
      this.listPhotoNames.push(photoName);
    } else {
      console.log(photoName + "is a name used for two different photos: "
        +this.listPhotos[photoName].getImagePath +" and "+this.removeBaseDir(fullPathImage));
    }
  }

  removeBaseDir(path) {
    let str = path.replace(this.baseDir, "");
    return str;
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
