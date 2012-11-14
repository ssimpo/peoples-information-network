if (typeof(console) == 'undefined') console = {
	"_logger": Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService),
		
	log: function(){
		for(var i = 0; i<arguments.length; i++){
			var cArg = arguments[i];
				
			if(Object.prototype.toString.call(cArg) === '[object Array]'){
				for(var ii = 0; i<cArg.length; ii++){
					console._logger.logStringMessage(this._convertToString(cArg[ii]));
				}
			}else{
				console._logger.logStringMessage(this._convertToString(arguments[i]));
			}
		}
	},
		
	_convertToString: function(value){
		if(Object.prototype.toString.call(value) === '[object Object]'){
			return JSON.stringify(value);
		}else if(Object.prototype.toString.call(value) === '[object Array]'){
			return JSON.stringify(value);
		}
			
		return value.toString(value);
	},
		
	error: function(){
		for(var i = 0; i<arguments.length; i++){
			console._logger.logStringMessage("ERROR: "+arguments[i]);
		}
	}
}