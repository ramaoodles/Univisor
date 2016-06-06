//add Roles in the system
var roles = ['ROLE_USER', 'ROLE_ADMIN','ROLE_SUPERADMIN']

// Add different accessLevels 
var accessLevels = {
    'anonymous': ['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN'],
    'user': ['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN'],
    'admin': ['ROLE_ADMIN','ROLE_SUPERADMIN'],
    'superadmin':['ROLE_SUPERADMIN']
}


var configVariables = function () {
    switch (process.env.NODE_ENV) {
    case 'development':
        var config = {
            port:3000,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'abhimanyu.singh@oodlestechnologies.com',
            emailPassword:'!abhimanyu@oodles',
            verificationEmailSubject:'Welcome To OodlesStudio !'
            
        }
        config.roles = roles
        config.accessLevels = accessLevels
        return config;

            
    case 'staging':
        var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'abhimanyu.singh@oodlestechnologies.com',
            emailPassword:'!abhimanyu@oodles',
            verificationEmailSubject:'Welcome To OodlesStudio !'
            
        }
        config.roles = roles
        config.accessLevels = accessLevels
        return config;

    case 'production':
       var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'abhimanyu.singh@oodlestechnologies.com',
            emailPassword:'!abhimanyu@oodles',
            verificationEmailSubject:'Welcome To OodlesStudio !'
            
        }

        config.roles = roles
        config.accessLevels = accessLevels
        return config;
            
    case 'test':
        var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'abhimanyu.singh@oodlestechnologies.com',
            emailPassword:'!abhimanyu@oodles',
            verificationEmailSubject:'Welcome To OodlesStudio !'
            
        }

        config.roles = roles
        config.accessLevels = accessLevels
        return config;            


    }
}


module.exports.configVariables = configVariables;