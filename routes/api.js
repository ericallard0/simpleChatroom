/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Eric'
  });
};

exports.getId = function(){
  var i = 0;
  return exports.id = function(req, res){
    res.json({
      id: i++
    });
  };
};