
// process raw profile response from instagram
function processInstagramProfile(profileResponse) {
  var profile = JSON.parse(profileResponse._raw);

  console.log("parsed profile:", profile);
  return profile.data;
}

module.exports = processInstagramProfile;