
// Convert an array-like object into an array
function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

module.exports = toArray;