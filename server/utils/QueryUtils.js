const convertQueryToList = query => {
  let response = addSpaces(query);
  let list = response.split('&');
  return list;
}

const addSpaces = query => {
  var re = new RegExp(/\+/, 'g');
  let response = query.replace(re, ' ');
  return response;
};

module.exports = convertQueryToList;