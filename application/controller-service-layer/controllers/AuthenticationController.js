
var AuthenticationService=require('../services/AuthenticationService.js').AuthenticationService;
module.exports=(function(){
var login=function(req,res){
  console.log("inside login controller");
  AuthenticationService.authenticateUser(req.body.email,req.body.password,res);
}
var logout=function(req,res){
    console.log("inside logout controller");
    AuthenticationService.logoutUser(req.get("Authorization"),res);
}
return {
  login:login,
  logout:logout
}
})();
