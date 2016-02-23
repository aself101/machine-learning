var critics = require('./data');
var simPearson = require('./pearsonCorrelation');
var simDistance = require('./euclideanDistance');
var functs = require('./recommendations');



(function() {

  //console.log("Pearson Correlation: " + simPearson(critics, 'Lisa Rose', 'Gene Seymour'));
  //console.log("Eucldian Distance: " + simDistance(critics, 'Lisa Rose', 'Gene Seymour'));
  //console.log(functs.topMatches(critics, 'Toby', 3, simPearson));
  //console.log(functs.getRecommendations(critics, 'Toby',simDistance));
  //var movies = functs.transform(critics);
  //console.log(functs.topMatches(movies, 'Superman Returns', 5, simPearson));
  //var itemSim = functs.calculateSimilarItems(critics, 10, simDistance);
  //console.log(functs.getRecommendedItems(critics, itemSim, 'Toby'));
  //console.log(functs.loadMovieLens());
  var prefs = functs.loadMovieLens();
  //console.log(prefs['87']);
  var itemSim = functs.calculateSimilarItems(prefs, 50, simDistance);
  console.log(functs.getRecommendedItems(prefs, itemSim, '87'));
  //console.log(functs.getRecommendations(prefs, '934', simDistance));



})();
