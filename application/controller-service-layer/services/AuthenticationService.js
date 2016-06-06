module.exports.AuthenticationService = (function() {
  var generateAuthToken = function(userId, email, res) {
    var authenticationToken = new domain.AuthenticationToken({
      'user': userId,
      'email': email,
      'authToken': uuid.v1()
    });
    authenticationToken.save(function(err, responsedata) {
      if (err) {
        responseHandler(res, "failure", 400, true, null);
      } else {
        responseHandler(res, "success", 200, false, responsedata.authToken);
      }
    });
  }
  var matchEncryptedPassword = function(password, user) {
    encryptedPassword = crypto.createHmac('sha1', user.salt).update(password).digest('hex');
    if (user.password == encryptedPassword) {
      return true;
    } else {
      return false;
    }
  }

  var authenticateUser = function(email, password, res) {
    console.log("inside authentication service");
    domain.User.findOne({
      'email': email,
      'isAccountActive': true
    }, function(err, userObj) {

      if (userObj && matchEncryptedPassword(password, userObj)) {
        generateAuthToken(userObj._id, email, res);
      } else {
        responseHandler(res, "user does not exists with given email and password", 400, true, null);
      }
    });
  }
  var logoutUser = function(authToken, res) {
    domain.AuthenticationToken.findOne({
      'authToken': authToken
    }, function(err, authTokenObj) {
      console.log(authTokenObj);
      if (authTokenObj != null) {
        domain.AuthenticationToken.remove({
          'authToken': authToken
        }, function(err, authTokenObj) {
          responseHandler(res, "logout successfull", 200, false, null);
        });
      } else {
        responseHandler(res, "unable to logout", 400, true, null);
      }
    })
  }
  return {
    authenticateUser: authenticateUser,
    logoutUser: logoutUser
  }
})();
