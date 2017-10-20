class Photo {
  constructor(imagePath, properties) {
    this.imagePath = imagePath;
    this.properties =
    {
      "name":undefined,
      "dimensions":undefined,
      "keywords":undefined,
      "price":undefined
    };
    this.setProperties(properties);
	this.setProperty("uri", imagePath);
  }

  setProperties(properties) {
    for (let property in this.properties) {
      if (properties[property]!=undefined) {
        this.properties[property] = properties[property];
      } else {
        console.log(this.imagePath + " has no property " + property);
      }
    }
  }
  
  setProperty(propertyKey, propertyValue) {
	this.properties[propertyKey] = propertyValue;
  }

  getProperties() {
    return this.properties;
  }

  getPhotoName() {
    return this.properties.name;
  }

  getImagePath() {
    return this.imagePath;
  }
}

module.exports = Photo;
