var http = require("http");
var url = require("url");
//因Request僅能處理一次後即drop, 故分開
//=============postData in formidable=============
function start(route,handle) {
  function onRequest(request,response) {
    var pathname = url.parse(request.url).pathname;
    var ip = request.headers['x-forwarded-for'] || //getting the requesting from
        request.connection.remoteAddress || 
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    console.log("收到通往 " + pathname + " 的要求。來自於 "+ip);
    
    route(handle,pathname,response,request);//return handler content
  }
  http.createServer(onRequest).listen(9527);
  console.log("服務已啟動。");
}
exports.start = start;

// //==========postData in textarea==========
// function start(route,handle) {
//   function onRequest(request, response) {//createServer()    
//     var postData = "";    
//     var pathname = url.parse(request.url).pathname;
//     console.log("A request for "+pathname+"received.");
    
//     request.setEncoding("utf8");//POST資料的格式確立
//     request.addListener("data",function(postDataChunk) {
//       postData += postDataChunk;//postDataChunk資料塊,data為default listener
//       console.log("Received POST data chunk '"+ postDataChunk + "'.");
//       //console.log(typeof(postDataChunk));
//       });
//     request.addListener("end",function() {
//       route(handle,pathname,response,postData);
//     });
    
// //     //======================================================
// //     route(handle,pathname,response);
// //     //服務反饋訊息轉由router處理
// //     response.writeHead(200, {"Content-Type": "text/plain"});
// //     response.write("Greeting, Cette Monde");
// //     var content = route(handle,pathname);
// //     response.write(content);
// //     response.end();
//   }
//   http.createServer(onRequest).listen(8080,'0.0.0.0');
//   console.log("it works.");
// }
// exports.start = start;


// //Default service template
// var http = require("http");

// http.createServer(function(request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }).listen(8080,'0.0.0.0');
// console.log("it works.");