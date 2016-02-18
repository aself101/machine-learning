
// Returns the top matches
function topMatches(prefs, person, n, similarity) {
  var scores = 0;
  var count = 0;
  var mapping = new Map();
  for (var other in prefs) {
    if (other != person) {
      if (count === n) break;
      scores = similarity(prefs, person, other);
      mapping.set(other, scores);
      count++;
    }
  }
  return mapping;
}

// Gets recommendations based on users preference
function getRecommendations(prefs, person, similarity) {
  var totals = {}, simSums = {};
  var sim = 0;
  var mapping = new Map();
  // Initialize objs for counts
  for (var other in prefs) {
    for (var item in prefs[other]) {
      totals[item] = 0;
      simSums[item] = 0;
    }
  }
  for (var other in prefs) {
    // Don't compare the user to themselves
    if (other === person)
      continue;
    sim = similarity(prefs, person, other);

    // Ignore scores of zero or lower
    if (sim <= 0)
      continue;

    for (var item in prefs[other]) {
      // Only score movies that the user has not seen
      if (!(item in prefs[person]) || prefs[person][item] === 0) {
        // similarity * score
        totals[item] += prefs[other][item] * sim;
        // sum of similarities
        simSums[item] += sim;
      }
    }
  }

  for (var item in totals) {
    if (isNaN(totals[item] / simSums[item])) continue;
    mapping.set((totals[item] / simSums[item]), item);
  }

  return mapping;
}

// Swaps the movie:score with critics:score
function transformPrefs(prefs) {
  var result = {};
  // Initialize obj
  for (var person in prefs) {
    for (var item in prefs[person]) {
      result[item] = {};
    }
  }
  // Transform to movies : critics:score
  for (var person in prefs) {
    for (var item in prefs[person]) {
      result[item][person] = prefs[person][item];
    }
  }

  return result;
}

function calculateSimilarItems(prefs, n, similarity) {
    // Obj of items showing which other items they are most similar to
    var result = {};
    var itemPreferences = transformPrefs(prefs);
    var count = 0, scores;

    for (var item in itemPreferences) {
      count++;
      if (count % 100 === 0) {
        console.log(c + " " + Object.size(itemPreferences));
      }
      // Find the most similar items to this one
      scores = topMatches(itemPreferences, item, n, similarity);
      result[item] = scores;
    }
    return result;
}

// Give recommendations using the item similarity obj
function getRecommendedItems(prefs, itemMatch, user) {
  var userRatings = prefs[user];
  var scores = {}, totalSimilarity = {};
  var mapping = new Map();

  for (var item in userRatings) {
    //console.log(item + ' ' + userRatings[item]);
    console.log(itemMatch[item]);

  }



}







module.exports = {
  getRecommendations: getRecommendations,
  topMatches: topMatches,
  transform: transformPrefs,
  calculateSimilarItems: calculateSimilarItems,
  getRecommendedItems: getRecommendedItems
};
