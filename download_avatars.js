var request = require('request');

var token = require('./secrets.js');

//require the file system
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  //options is the header - HTTP headers allow the client and the server to pass additional information with the request or the response. A request header consists of its case-insensitive name followed by a colon ':', then by its value.
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : token
    }
  };

  //from the required request - this is the request option where
  request(options, function(err, res, body) {
    var data = JSON.parse(body); //get the body of the JSON file
    cb(err, data);
  });

}

//https://api.github.com/repos/jquery/jquery/contributors
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

for (var key in result) {
  console.log("Name: " + result[key].login + "Avatar: " + result[key].avatar_url);
}

});


//function to download image
function downloadImageByURL(url, filePath) {
  console.log("Downloading Image...")
  request.get(url)
         .on('error', function (err){
          throw err;
         })
         .on('response', function (response) {
          console.log('Image downloaded!');
         })
         .pipe(fs.createWriteStream(filePath))


}

//test downloading an image
downloadImageByURL('https://avatars1.githubusercontent.com/u/43004?v=4', './downloadedImages/test.jpg');






