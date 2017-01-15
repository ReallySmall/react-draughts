var messages = {
  enableJavaScript: 'Please enable JavaScript to view this content',
  flickrFetching: 'Asking Flickr...',
  flickrFailed: 'Failed to get images. Refresh the page or try again later'
};

var truncate = function(string, truncateAt) {
  if(!string || !truncateAt){
    return;
  }
  string = string.trim();
  if(string.length < truncateAt){
    return string;
  } else {
    let truncatedString = string.substring(0, truncateAt);
    truncatedString += ' ...';
    return truncatedString;
  }
};

var toDateString = function(dateString){
  if(!dateString){
    return '';
  }
  var dateObj = new Date(dateString);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var formattedDate = dateObj.getDate()+" "+months[dateObj.getMonth()]+" "+dateObj.getFullYear();
  return formattedDate;
};

var toHttps = function(url){
  if(!url){
    return '';
  }
  url = url.trim();
  var secureUrl = url.replace('http://', 'https://');
  return secureUrl;
}

export { messages, truncate, toDateString, toHttps };

