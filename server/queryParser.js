class QueryParser {

  constructor() {}

  parseQuery(query) {
    let response = this.addSpaces(query);
    return response;
  }

  addSpaces(query) {
    var re = new RegExp(/\+/, 'g');
    let response = query.replace(re, ' ');
    return response;
  }

  convertQueryToList(query) {
    let response = this.addSpaces(query);
    let list = response.split('&');
    return list;
  }
}

module.exports = QueryParser;
