	module.exports = function(app, pass) {
	  var passport = require('passport');
	  console.log("--------");
	  // console.log(app);
	  // console.log();
		app.use(expressSession({ secret: 'SECRET' }));
		app.use(passport.initialize());
		app.get('/auth/facebook/callback',
		  passport.authenticate('facebook', { failureRedirect: '/login' }),
		  function(req, res) {
				// console.log(req);
				console.log("callback url");
		    // Successful authentication, redirect home.
		    res.redirect('/');
		  });

	  var controllers = app.controllers,
	    views = app.views;
	  var sec = configurationHolder.security;
	  return {
	    "/user": [{
	      method: "POST",
	      action: controllers.userController.createUser,
	      middleware: ["hello"],
	      views: {
	        json: views.jsonView
	      }
	    }],

	    "/user/:id": [{
	      method: "GET",
	      action: controllers.userController.getUser,
	      middleware: ["hello"],
	      views: {
	        json: views.jsonView
	      }
	    }, {
	      method: "put",
	      action: controllers.userController.updateUser,
	      middleware: ["hello"],
	      views: {
	        json: views.jsonView
	      }
	    }, {
	      method: "delete",
	      action: controllers.userController.deleteUser,
	      middleware: ["hello"],
	      views: {
	        json: views.jsonView
	      }
	    }],

	    "/users": [{
	      method: "GET",
	      action: controllers.userController.searchUser,
	      middleware: ["hello"],
	      views: {
	        json: views.jsonView
	      }
	    }],
	    "/auth/login": [{
	      method: "POST",
	      action: controllers.authenticationController.login,
	      views: {
	        json: views.jsonView
	      }
	    }],
	    "/logout": [{
	      method: "DELETE",
	      action: controllers.authenticationController.logout,
	      views: {
	        json: views.jsonView
	      }
	    }],
	    "/login": [{
	      method: "POST",
	      action: passport.initialize(),
	      middleware: [passport.authenticate('local', {
	          session: false
	        }), sec.generateToken, sec.respond],
	      views: {
	        json: views.jsonView
	      }
	    }],
			"/auth/google":[{
					method:"GET",
					action:passport.initialize(),
					middleware:[passport.authenticate('google',{
						 failureRedirect: '/login',
						 scope : 'email'
					}),sec.generateToken,sec.respond],
					views:{
						json:views.jsonView
					}
			}],

			"/auth/twitter":[{
					method:"GET",
					action:passport.initialize(),
					middleware:[passport.authenticate('twitter',{
						 failureRedirect: '/login',
						 session: false
					}),sec.generateToken,sec.respond],
					views:{
						json:views.jsonView
					}
			}],
			"/auth/facebook": [{
					method:"GET",
					action:passport.initialize(),
					middleware:[passport.authenticate('facebook',{
						 failureRedirect: '/login',
						 session: false
					}),sec.generateToken,sec.respond],
					views:{
						json:views.jsonView
					}
			}]

			// "/auth/facebook/callback":[{
			// 	method:"GET",
			// 	action:controllers.authenticationController.authenticationCallback,
			// 	views:{
			// 		json:views.jsonView
			// 	}
			// }]

	};
}
