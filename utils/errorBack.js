
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