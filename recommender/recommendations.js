// Returns the top matches
function topMatches(prefs, person, n, similarity) {
  var scores = 0;
  var count = 0;
  var mapping = {};
  for (var other in prefs) {
    if (other != person) {
      if (count === n) break;
      scores = similarity(prefs, person, other);
      mapping[other] = scores;
      count++;
    }
  }
  return mapping;
}

// Gets recommendations based on users preference
function getRecommendations(prefs, person, similarity) {
  var totals = {}, simSums = {};
  var sim = 0;
  var mapping = {};
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
    mapping[totals[item] / simSums[item]] = item;
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

// Returns similar items based on users prefs
function calculateSimilarItems(prefs, n, similarity) {
    // Obj of items showing which other items they are most similar to
    var result = {};
    var itemPreferences = transformPrefs(prefs);
    var count = 0, scores;
    console.log("Calculating similar items...");
    for (var item in itemPreferences) {
      count++;
      if (count % 100 === 0) {
        //console.log(count + " " + Object.size(itemPreferences));
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
  var mapping = {};

  // Initialize empty obj for counts
  for (var item in userRatings) {
    for (var i in itemMatch[item]) {
      scores[i] = 0;
      totalSimilarity[i] = 0;
    }
  }

  for (var item in userRatings) {
    for (var sim in itemMatch[item]) {
      if (sim in userRatings)
        continue;
      // Weighted sum of rating times similarity
      scores[sim] += itemMatch[item][sim] * userRatings[item];
      // Sum all the similarites
      totalSimilarity[sim] += itemMatch[item][sim];
    }
  }
  // Divide each total score by total weighting to get an average
  for (var item in scores) {
    if (scores[item] <= 0)
      continue;
    mapping[(scores[item]/totalSimilarity[item])] = item;
  }

  return mapping;
}

function loadMovieLens() {
  var fs = require('fs');
  var path = 'movieLens';
  var movies = {}, prefs = {};
  var countM = 0;

  fs.readFileSync(path+'/u.item', 'utf-8')
    .toString().split('\n')
    .forEach(function(line) {
      var d = line.split('|', 2);
      if (d[0] === '') {
        return;
      }
      movies[d[0]] = d[1];
    });

  // Get only users from file
  var users = getUsers(fs, path);

  // Initialize preferences based on users choice
  for (var i in users) {
    prefs[users[i]] = {};
  }

  // Only want user, movieID and rating
  fs.readFileSync(path+'/u.data', 'utf-8')
   .toString().split('\n')
   .forEach(function(line) {
     var items = line.split('\t');
     var user = items[0];
     var movieID = items[1];
     var rating = items[2];
     try {
        prefs[user][movies[movieID]] = parseFloat(rating);
     } catch (e) {}
   });

  return prefs;
}

function getUsers(fs, path) {
  var users = [];

  fs.readFileSync(path+'/u.data', 'utf-8')
   .toString().split('\n')
   .forEach(function(line) {
     var items = line.split('\t');
     var user = items[0];
     if (user === '') return;
     users.push(user);
   });

  return users;
}



module.exports = {
  getRecommendations: getRecommendations,
  topMatches: topMatches,
  transform: transformPrefs,
  calculateSimilarItems: calculateSimilarItems,
  getRecommendedItems: getRecommendedItems,
  loadMovieLens: loadMovieLens
};
