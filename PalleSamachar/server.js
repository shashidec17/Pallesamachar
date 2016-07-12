var express = require('express'),
    httpProxy = require('http-proxy')
;

var path = __dirname.substring(0, __dirname.lastIndexOf("/")) + "/public";
var docroot = path; //isProd ? __dirname + "../build" : path; //__dirname + "./public";
var port = 1111;

var app = express();
app.use(express.cookieParser());
app.use(express.logger());

var routingProxy = new httpProxy.RoutingProxy();

// proxy to soa api, passing along finestra session id
app.use('/app', function (req, res) {

  var options = {
	  host : "localhost",
	  port : parseInt("8080"),
    changeOrigin: true,
    target : {
	   https : false
    }
  };
  var debugUrl = req.protocol + "://" + options.host + (options.port ? ":" + options.port : "") +  req.url;
//  console.log("[soa_request]", options + req.url, req.query);  
   console.log("\n", "[SOA Request]", "\n\tURL ==> ",  debugUrl,  "\n\tQuery object ==> ", req.query, "\n");  
	routingProxy.proxyRequest(req, res, options);
});


app.use(express.bodyParser());

console.log("Docroot >> " +docroot);
// serve main site assets
app.use('/', express.static("public"));



app.listen(port, function() {
  console.log("Listening on port " + port);
});
