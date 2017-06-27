function route(handle,pathname,response,request) {//postData 轉 request內容
  console.log("預備導向至 " + pathname);
  
	if (typeof handle[pathname] === 'function') {
    return handle[pathname](response,request);
  }else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 Not found");
    response.end();
  }    
}
exports.route = route;