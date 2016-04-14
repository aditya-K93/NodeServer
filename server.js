var http = require('http');

//Lets define a port we want to listen to
const PORT=8000; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	
	var jsonString = ''; 
	var id='';
    if (request.method == 'POST') {

        request.on('data', function (data) {
            jsonString += data;
        });

        request.on('end', function () {
            console.log(JSON.parse(jsonString));
            id=JSON.parse(jsonString).regId;
            var fs = require('fs');
			fs.appendFile('Registration_Id.txt', id+"\n", function (err) {
				if(err) {
        		return console.log(err);
    					}

    		console.log("The file was saved!");


});


            

        });
    
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("FIST"); 
   


    //response.end("Hello World\n");
}

else 
	{	
        
		var fs = require('fs');
		fs.readFile('Registration_Id.txt', function(err, data) {
   		if(err) throw err;
    	var array = data.toString().split("\n");
    	uniqueArray = array.filter(function(elem, pos) {
    	return array.indexOf(elem) == pos;
})
    	for(i in uniqueArray) {
    		if(uniqueArray[i]!=''){
        	console.log(uniqueArray[i]);
        	pushnotif(uniqueArray[i]);
        }
        
    }
});



	
}

}

function pushnotif(id){
var request =require("request");
var config = require('/home/ec2-user/NodeServer/message.json');
console.log(config.Message);
var requestdata={"to":id,
					"data":config};

url="https://gcm-http.googleapis.com/gcm/send";
auth="AIzaSyDgkfSrTH2N4YSM5EeSx6Ba8qVLg-oc6As";
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
    	"Authorization":"key="+"AIzaSyAbsogR7te9MwORiz4sY6qGiuFY2rt4gsY",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestdata) }, function(err,res,body)		{
    	console.log(body);
    });

}
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
