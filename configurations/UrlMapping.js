	module.exports = function (app, pass) {
        var passport = require('passport');
         console.log("--------");
       // console.log(app);
       // console.log();
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
				}
			],

			"/user/:id": [{
					method: "GET",
					action: controllers.userController.getUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				},
				{
					method: "put",
					action: controllers.userController.updateUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				},
				{
					method: "delete",
					action: controllers.userController.deleteUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				}
			],

			"/users": [{
					method: "GET",
					action: controllers.userController.searchUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				}
			],
            "/login": [{
					method: "POST",
                    action:passport.initialize(), 
					middleware: [passport.authenticate(  
                          'local', {
                            session: false
                          }), sec.generateToken, sec.respond],
					views: {
						json: views.jsonView					
                    }
				}
			]

		};
	};