
// makes a function that responds to an error argument
function errorBack(success, failure) {
  return function(err) {
    if (err) {
      failure(err);
    }
    else {
      success();
    }
  }
}

module.exports = errorBack;