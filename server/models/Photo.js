const URI_KEY = "uri";
const ID_KEY = "id";
const PROPERTY_KEY_LIST =
    ["name", "dimensions", "keywords", "price", URI_KEY, ID_KEY];
const SLASH = "/";
require("../utils/StringUtils.js");
PhotoUtils = require("../utils/PhotoUtils.js");

class Photo {

  constructor(imagePath, properties) {
    this.properties = this.getUndefinedProperties();
    this.setProperties(properties);
  	this.setProperty(URI_KEY, imagePath);
    this.setProperty(ID_KEY, this.getIdFromPath(imagePath));
    console.log(this.properties);
  }

  /*
   * Public methods
   */
  getProperties() {
    return this.properties;
  }

  getPhotoId() {
    return this.properties.id;
  }

  getImagePath() {
    return this.properties.uri;
  }

  /*
   * Private methods
   */
  getUndefinedProperties() {
    let undefinedProperties = {};
    PROPERTY_KEY_LIST.forEach(function(propertyKey) {
      undefinedProperties[propertyKey] = undefined;
    });
    return undefinedProperties;
  }

  setProperties(properties) {
    for (let propertyKey in properties) {
      if (properties[propertyKey] != undefined) {
        this.properties[propertyKey] = properties[propertyKey];
      } else {
        console.log(this.imagePath + " has no property key " + propertyKey);
      }
    }
  }

  // returns my_image from my_path/**/my_image.png
  getIdFromPath(imagePath) {
    let imagePathSplit = imagePath.split(SLASH);
    let filename = imagePathSplit[imagePathSplit.length-1];
    let filenameSplit;
    IMAGE_EXTENSIONS.forEach(function(imageExtension) {
      if (filename.indexOf(imageExtension) >= 0) {
        filenameSplit = filename.split(imageExtension);
      }
    });
    let id = filenameSplit[0];
    if (containsSpace(id)) {
      log.error("The filename cannot contain space. Filename: " + filename);
    }
    return id;
  }


  setProperty(propertyKey, propertyValue) {
    if (this.isAProperty(propertyKey)) {
      this.properties[propertyKey] = propertyValue;
    } else {
      log.warn(propertyKey + " does not belong to the property key list.");
    }
  }

  isAProperty(propertyKey) {
    return PROPERTY_KEY_LIST.includes(propertyKey);
  }
}

module.exports = Photo;
