var request = require('request');

var token = require('./secrets.js');

//require the file system
var fs = require('fs');

var owner = process.argv.slice(2);
var repo = process.argv.slice(3);


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(owner, repo, cb) {

  //options is the header - HTTP headers allow the client and the server to pass additional information with the request or the response. A request header consists of its case-insensitive name followed by a colon ':', then by its value.
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
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
getRepoContributors('jquery', 'jquery', function(err, result) { //owner and //repo not working here

  console.log("Errors:", err);

for (var key in result) {
  console.log("Downloading Image! - Name: " + result[key].login + "Avatar: " + result[key].avatar_url);
  downloadImageByURL(result[key].avatar_url, './downloadedImages/' + result[key].login + '.jpg');
  console.log("----------------------------------------------");
}


});


//function to download image
function downloadImageByURL(url, filePath) {
  //console.log("Downloading Image...")
  request.get(url)
         .on('error', function (err){
          throw err;
         })
         .on('response', function (response) {
         // console.log('Image downloaded!');
         })
         .pipe(fs.createWriteStream(filePath))

}




