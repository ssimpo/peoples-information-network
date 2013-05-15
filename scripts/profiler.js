var profiler = {
	"timer": new Date().getTime(),
	"_lastTimer": new Date().getTime(),
	"reset": function(){
		profiler.timer = new Date().getTime();
		profiler._lastTimer = profiler.timer;
	},
	"log": function(title){
		var now = new Date().getTime();
		var ms = now-profiler.timer;
		var lastMs = now-profiler._lastTimer;
		console.info(title+": "+ms.toString()+"ms ("+lastMs.toString()+"ms)");
		profiler._lastTimer = now;
	},
	"create": function(){
		function isProperty(value, propName){
			return ((Object.prototype.hasOwnProperty.call(value, propName)) || (propName in value));
		}
		
		var timer = new Date().getTime();
		var lastTimer = new Date().getTime();
		var timers = new Object();
		var timersAvg = new Object();
		
		var construct = {
			"reset": function(id){
				if(id === undefined){
					timer = new Date().getTime();
					lastTimer = timer;
				}else{
					timers[id] = new Date().getTime();
				}
			},
			"log": function(title){
				var now = new Date().getTime();
				var ms = now-timer;
				var lastMs = now-lastTimer;
				console.info(title+": "+ms.toString()+"ms ("+lastMs.toString()+"ms)");
				lastTimer = now;
			},
			"creatTimer": function(id){
				if(!isProperty(timers, id)){
					timers[id] = new Date().getTime();
					timersAvg[id] = 0;
				}
			},
			"recordAverage": function(id){
				if(isProperty(timers, id) && isProperty(timersAvg, id)){
					var now = new Date().getTime();
					var ms = now-timers[id];
					
					if(timersAvg[id] === 0){
						timersAvg[id] = ms;
					}else{
						timersAvg[id] = ((ms+timersAvg[id])/2);
					}
				}
			},
			"getAverage": function(id){
				if(isProperty(timers, id) && isProperty(timersAvg, id)){
					return timersAvg[id].toString()+"ms"
				}else{
					return "";
				}
			}
		};
		
		return construct;
	}
}