

exports.all = function(req, res) {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens)
  })
};
