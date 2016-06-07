
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
var authenticationCallback=function(req,res){
  console.log("inside auth callback");
  // console.log(req);
  responseHandler(res, "login successfull", 200, false, null);
}
return {
  login:login,
  logout:logout,
  authenticationCallback:authenticationCallback
}
})();
