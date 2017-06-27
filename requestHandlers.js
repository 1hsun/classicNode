var exec = require("child_process").exec;
var querystring = require("querystring"),
		fs = require("fs"),
		formidable = require("formidable");

function img(response,postData) {
	var timestamp = function(){};
	timestamp.toString = ()=> "於"+(new Date).toLocaleTimeString();	
	console.log("導向img頁面完成"+timestamp);
	var body = '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" '+
			'content="text/html; charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/upload" enctype="multipart/form-data" '+
			'method="post">'+
			'<input type="file" name="upload"><br>'+
			'<input type="submit" value="Upload file" />'+
			'</form>'+
			'</body>'+
			'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}
function show(response,postData) {
	var timestamp = function(){};
	timestamp.toString = ()=> "於"+(new Date).toLocaleTimeString();	
	console.log("導向show頁面完成"+timestamp);
	fs.readFile("/tmp/test.png","binary",function(error,file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}
function start(response,postData) {
	var timestamp = function(){};
	timestamp.toString = ()=> "於"+(new Date).toLocaleTimeString();	
  console.log("導向start頁面完成"+timestamp);
	var body = '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/upload" method="post">'+
			'<textarea name="text" rows="20" cols="60"></textarea>'+
			'<input type="submit" value="Submit text" />'+
			'</form>'+
			'</body>'+
			'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
// 	//執行一個需要長時間的程序
//   exec("ls -lah",
// 			 { timeout: 10000, maxBuffer: 20000*1024 },
// 			 function (error, stdout, stderr) {
//     response.writeHead(200,{"Content-Type":"text/plain"})
// 		 response.write(stdout);
//     response.end();
//   });
}
function upload(response,request) {
  var timestamp = function(){};
	timestamp.toString = ()=> "於"+(new Date).toLocaleTimeString();	
	console.log("導向upload頁面完成"+timestamp);
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request,function(error,fields,files) {
		console.log("parsing done");
		fs.renameSync(files.upload.path,"/tmp/test.png");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
// 	response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Message sent : "+querystring.parse(postData).text);//獲取純text部段
//   response.end();
}
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.img = img;