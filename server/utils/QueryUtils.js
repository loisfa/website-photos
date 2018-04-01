global.parseQuery = function(query) {
  let response = this.addSpaces(query);
  return response;
};

global.addSpaces = function(query) {
  var re = new RegExp(/\+/, 'g');
  let response = query.replace(re, ' ');
  return response;
};

global.convertQueryToList = function(query) {
  let response = this.addSpaces(query);
  let list = response.split('&');
  return list;
}
