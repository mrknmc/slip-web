var APP_KEY = '492mxhrdjmsxqkz';
var DATASTORE_ID = '.2KpSYCh9COM38q_rChYoME5D83LxNgloKAPxDuVMNNQ';

$('#sidebar').sidebar('attach events', '#sidebar-toggle').sidebar('toggle');
$('#sidebar .item').tab();

$(function () {

var client = new Dropbox.Client({key: APP_KEY});
client.authDriver(new Dropbox.AuthDriver.Popup({
    receiverUrl: window.location.origin + '/login.html'
}));

// Check to see if we're authenticated already.
client.authenticate({interactive: false}, updateAuthenticationStatus);

// Authenticate when the user clicks the connect button.
$('#connect').click(function (e) {
    e.preventDefault();
    client.authenticate(updateAuthenticationStatus);
});

function updateAuthenticationStatus(err, client) {
  console.log('error: ' + err);
  if (!client.isAuthenticated()) {
    // If the user is not authenticated, show the authentication modal and return
    $('#login').modal('setting', 'closable', false).modal('show');
    return;
  } else {
    // Otherwise hide the modal if visible and continue
    $('#login').modal('hide');
  }

  // Show the user sidebar item
  $('#user').show();

  // Show user's name
  client.getAccountInfo(function(err, info) {
    $('#user').append(info.name);
  });

  console.log(client);

  // datastoreManager.openDatastore(DATASTORE_ID, function (err, ds) {
  //   if (err) {
  //       alert('Error opening list. Make sure you have the permission.');
  //       return;
  //   }

  //   // Update the UI with items from this datastore.
  //   var solarData = getSolarData();
  //   var myLineChart = new Chart(ctx).Line(solarData.data, solarData.options);
  // });

  // function getSolarData(argument) {
  //   var labels = [];
  //   var dataset = {
  //     label: "Solar measurements",
  //     fillColor: "rgba(220, 220, 220, 0.2)",
  //     strokeColor: "rgba(220, 220, 220, 1)",
  //     pointColor: "rgba(220, 220, 220, 1)",
  //     pointStrokeColor: "#fff",
  //     pointHighlightFill: "#fff",
  //     pointHighlightStroke: "rgba(220,220,220,1)",
  //     data: []
  //   };

  //   var opts = {
  //     scaleShowGridLines : true,
  //     scaleGridLineColor : "rgba(0,0,0,.05)",
  //     scaleGridLineWidth : 1,
  //     bezierCurve : true,
  //     bezierCurveTension : 0.4,
  //     //Boolean - Whether to show a dot for each point
  //     pointDot : false,
  //     //Number - Radius of each point dot in pixels
  //     pointDotRadius : 4,
  //     //Number - Pixel width of point dot stroke
  //     pointDotStrokeWidth : 1,
  //     //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  //     pointHitDetectionRadius : 20,
  //     //Boolean - Whether to show a stroke for datasets
  //     datasetStroke : true,
  //     //Number - Pixel width of dataset stroke
  //     datasetStrokeWidth : 2,
  //     //Boolean - Whether to fill the dataset with a colour
  //     datasetFill : true,
  //   };

  //   var measurements = datastore.getTable('measurements').query();
  //   _.chain(measurements)
  //   // sort by timestamp
  //   .sortBy(function (record) {
  //     return record.get('timestamp');
  //   })
  //   .each(function(record) {
  //     // convert timestamp to moment obj
  //     var timestamp = moment.unix(record.get('timestamp'));
  //     var lightIntensity = record.get('lightIntensity');
  //     labels.push(timestamp.format('m'));
  //     lightIntensity(dataset.data.push(lightIntensity));
  //   });

  //   return {data: {labels: labels, datasets: [dataset]}, options: opts};
  // }

}

});
