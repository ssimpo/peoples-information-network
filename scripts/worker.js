var global = this;
importScripts("/scripts/simpo/worker/console.js");

self.postMessage({
	"type": "warn",
	"message": {"TEST":"hello"}
});


self.addEventListener('message', function(e) {
	/*self.postMessage({
		"type": "warn",
		"message": e.data+"!!"
	});*/
	
	
	console.log(e.data);
}, false);

