
module.exports = function simPearson(prefs, p1, p2) {

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var si = {};
  var sum1 = 0, sum2 = 0;
  var sum1Square = 0, sum2Square = 0;
  var productSum = 0, num = 0, den = 0, score = 0;
  // Get a list of mutually related items
  for (var item in prefs[p1]) {
    if (item in prefs[p2]) {
      si[item] = 1;
    }
  }
  // Get the number of elements
  var size = Object.size(si);

  // If there are no ratings in common, return
  if (size === 0)
    return 0;

  // Add up all preferences
  for (var item in prefs[p1]) {
    if (item in si) {
      sum1 += prefs[p1][item];
    }
  }
  for (var item in prefs[p2]) {
    if (item in si) {
      sum2 += prefs[p2][item];
    }
  }

  // Sum the squares
  for (var item in prefs[p1]) {
      if (item in si) {
        sum1Square += Math.pow(prefs[p1][item], 2);
      }
  }

  for (var item in prefs[p2]) {
      if (item in si) {
        sum2Square += Math.pow(prefs[p2][item], 2);
      }
  }

  // Sum the products
  for (var item in si) {
    if (item in prefs[p1] && item in prefs[p2]) {
      productSum += prefs[p1][item] * prefs[p2][item];
    }
  }

  // Calculate pearson score
  num = productSum - (sum1 * sum2 / size);
  den = Math.sqrt( (sum1Square - Math.pow(sum1, 2) / size) *
    (sum2Square - Math.pow(sum2, 2) / size) );
  if (den === 0)
      return 0;

  var score = num / den;
  return score;
}// end Pearson()
