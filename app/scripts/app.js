var APP_KEY = '492mxhrdjmsxqkz';

$('#sidebar').sidebar('attach events', '#sidebar-toggle').sidebar('toggle');
$('#sidebar .item').tab();

$(function () {
  var client = new Dropbox.Client({key: APP_KEY});
  client.authDriver(new Dropbox.AuthDriver.Popup({
      receiverUrl: window.location.origin + '/login.html'
  }));

  // Check to see if we're authenticated already.
  client.authenticate({ interactive: false }, updateAuthenticationStatus);

  // Authenticate when the user clicks the connect button.
  $('#connect').click(function (e) {
      e.preventDefault();
      client.authenticate(updateAuthenticationStatus);
  });

  function updateAuthenticationStatus(err, client) {
    if (!client.isAuthenticated()) {
      // If the user is not authenticated, show the authentication modal
      $('#login').modal('setting', 'closable', false).modal('show');
      return;
    } else {
      // Otherwise hide the modal if visible
      $('#login').modal('hide');
    }

    // Show the user sidebar item
    $('#user').show();

    // Show user's name
    client.getAccountInfo(function (err, info) {
      $('#user').append(info.name);
    });

  }

});
