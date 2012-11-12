if ( !Function.prototype.bind ) {
    "use strict";
    
    Function.prototype.bind = function( obj ) {
        var slice = [].slice,
        args = slice.call(arguments, 1),
        self = this,
        nop = function () {},
        bound = function () {
            return self.apply( this instanceof nop ? this : ( obj || {} ),
                args.concat( slice.call(arguments) ) );
        };
        nop.prototype = self.prototype;
        bound.prototype = new nop();
        return bound;
    };
}

if (typeof simpo === "undefined") { simpo = {}; }

simpo.asyncLoader = function(constObj) {
    "use strict";
	
	var construct = {
		_runOnloads: function() {
            // summary:
            //      Run the onload functions
            
            this._loaded = true;
            var func = this._onload.pop();
            while (func != undefined) {
                func();
                func = this._onload.pop();
            }
        },
		
		_getScriptPath: function() {
            if (this.scriptPath == false) {
                var scripts= document.getElementsByTagName('script');
                var path = scripts[scripts.length-1].src.split('?')[0];
                this.scriptPath = path.split('/').slice(0, -1).join('/')+'/'; 
            }
            
            return this.scriptPath;
        },
		
		constructor: function(constObj) {
			var scriptPath = this._getScriptPath();
			
			var onload = function() { this._runOnloads(); }
            onload = onload.bind(this);
			
			if (constObj.addHtml5Shiv) { this._addHtml5Shiv(constObj); }
		}
	};
	
	construct.constructor(constObj);
    return construct;
};