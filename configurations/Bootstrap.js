/*
 * @author Abhimanyu
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start

var initApp = function () {
    Logger.info("config" + configurationHolder.config.accessLevels["anonymous"]);
    createSuperAdmin()
}


function createSuperAdmin() {
    var saltString = uuid.v1()
    var password = crypto.createHmac('sha1', saltString).update("univisor@admin").digest('hex')
    domain.User.findOne({
        firstName: 'SuperAdmin'
    }, function (err, doc) {
        Logger.info("document === " + doc);
        if (!doc) {
            var superAdminUser = new domain.User({
                firstName: 'Admin',
                lastName: 'admin',
                email: 'rama.shankar@oodlestechnologies.com',
                salt: saltString,
                password: password,
                role: 'ROLE_ADMIN',
                accountLocked: false,
                isAccountActive: true
            });

            superAdminUser.save(function (err, user) {
                if (err && err.code != 11000) {
                    Logger.error(err)
                } else {
                    bootApplication()
                    Logger.info(user)
                }
            })
        } else {
            bootApplication()
        }
        /* Logger.error(err)
         if(!doc){
         
         }*/
    });


}

// code to start the server
function bootApplication() {
    app.listen(configurationHolder.config.port, function () {
        console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
    });
}

module.exports.initApp = initApp