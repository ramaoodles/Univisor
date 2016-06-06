
var responseHandler=function(res,message,status,error,data){
  res.status(status).send({
    'message':message,
    'error':error,
    'data':data
  });
}
module.exports.responseHandler=responseHandler;
