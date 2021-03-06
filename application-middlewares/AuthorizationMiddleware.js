/*
 * @author Abhimanyu
 * This module is for the authorization process . Called as middleware function to decide whether user have enough authority to access the
 *
 */
var async = require('async')

module.exports.AuthorizationMiddleware = (function () {

   /*
    *  Verify user is authorized to access the functionality or not
    */
    var verifyIsRoleInAccessLevel = function (next, results, res, req, accessLevel) {
        var roleInAccessLevel = configurationHolder.config.accessLevels[accessLevel]
        var authorized = false
        domain.User.findOne({
            _id: results.authorizationTokenObject.user
        }, function (err, userObject) {
            if (roleInAccessLevel.indexOf(userObject.role) > -1) {
                authorized = true
                req.loggedInUser = userObject
                next(results, authorized)
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
            }
        })
    }

    /*
     * find User and its role using authenticationToken.
     */
    var findRoleByAuthToken = function (next, results, req, res, authToken) {
        console.log(authToken)
        domain.AuthenticationToken.findOne({
            authToken: authToken
        }, function (err, authObj) {
            if (err || authObj == null) {
                configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
            } else {
                next(null, authObj)
            }
        })
    }

    /*
     *  call as middleware to decide the accessiblity of the function for the loggedIn user
     *  find user by AuthenticationToken
     *  Decide based on the role of user and accesslevel whether user is authorized or not
     */
    var authority = function (accessLevel) {
        return function (req, res, next) {
            var authToken = req.get("Authorization")
            if (authToken == null && accessLevel == "anonymous") {
                Logger.info("executed in accesslevel ")
                req.loggedInUser = null
                next()
            } else {
                async.auto({
                    authorizationTokenObject: function (next, results) {
                        return findRoleByAuthToken(next, results, req, res, authToken)
                    },
                    isRoleInAccessLevel: ['authorizationTokenObject', function (next, results) {
                        verifyIsRoleInAccessLevel(next, results, res, req, accessLevel)
                                         }]
                }, function (err, results) {
                    if (results.isRoleInAccessLevel == true) {
                        next()
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
                    }
                })
            }
        }
    }



  var serialize = function (req, res, next) {
        domain.User.updateOrCreate(req.user, function(err, user) {
            if (err) {
              return next(err);
            }
            // we store information needed in token in req.user again
            req.user = {
              id: user.id
            };
            next();
          });
        }

        var generateToken = function  (req, res, next) {
          console.log("generateToken");
            var token  = uuid.v1();
            var user = req.user;
            var AuthenticationToken = new domain.AuthenticationToken({
                authToken: token,
                email: user.email,
                user:user
            });
            AuthenticationToken.save(function(err, authenticationToken) {
                if (err) {
                  return next(err);
                }
          });
          req.token = token;
          next();
        }

        var respond =  function (req, res) {
          res.status(200).json({
            user: req.user,
            token: req.token
          });

        }
    //public methods are  return
    return {
        authority: authority, respond:respond, generateToken:generateToken, serialize:serialize
    };
})();
