//figure out which set of config to return
if(process.env.Node_ENV === 'production'){
    //we are in production env -- giving the prod keys
    module.exports = require('./prod')
}else{
    //we are in dev env -- giving dev 
    module.exports = require('./dev');
};