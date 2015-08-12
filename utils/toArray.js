
// Convert an array-like object into an array
function toArray(arrayLike) {
  return Array.protoype.slice.call(arrayLike, 0);
}

module.exports = toArray;