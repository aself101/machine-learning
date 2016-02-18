
module.exports = function simDistance(prefs, p1, p2) {

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  // Get preferences
  var si = {};
  for (var item in prefs[p1]) {
    if (item in prefs[p2]) {
      si[item] = 1;
    }
  }
  // Get the size of preferences
  var size = Object.size(si);
  if (size === 0)
    return 0;

  var sum_of_squares = 0;

  for (var item in prefs[p1]) {
    if (item in prefs[p2]) {
      sum_of_squares += Math.pow(prefs[p1][item] - prefs[p2][item], 2);
    }
  }

  return 1 / (1 + sum_of_squares);
}// end Euclidian()
