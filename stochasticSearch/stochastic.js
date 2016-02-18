


function obj_function(vector) {
  return vector.reduce(function(prev, cur, i, arr) {
    return cur + (i * 2);
  });
}

function random_vector(minmax) {
  var arr = [];

}

(function() {

  var search_space = new Array(10);

  for (var i = 0; i < 10; i++) {
    search_space[i] = new Array(10);
  }

  console.log(search_space);

  for (var i = 0; i < search_space.length; i++) {
    for (var j = 0; j < search_space.length; j++) {
      search_space[i][j] = Math.random() * 10;
    }
  }
  console.log(search_space);
})();
