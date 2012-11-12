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
        dojoLoader:{},
        isIE: false,
        scriptPath:false,
        
        _loaded:false,
        _onload:[],
        _loaderFired:false,
        _bowserSniffed:false,
        
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
        
        addOnload: function(func) {
            // summary:
            //      Fire the given function after dojo has loaded.
            // func: function
            //      Function to fire after loading
            
            if (this._loaded) {
                func();
            } else {
                this._onload.push(func);
            }
        },
         
        appendScript: function(constr) {
            // summary:
            //      Insert a script into the DOM at a given point.
            // description:
            //      Load scripts asynchronously cross-browser.  Will insert
            //      a script tag for the given URL at the specified position
            //      in the DOM.  When script is loaded, fire the onload event.
            // constr: object
            //      Parameters object with properties:
            //      node: object XMLNode
            //          The reference node for insertion (eg. insert within
            //          this node or insert after this).
            //      src: string
            //          The URL to load the script from
            //      onload: function
            //          The callback function to fire when script has loaded.
            //      onError: function
            //          The fallback function if loading fails
            //      context: object
            //          The context to run onload/onerror within.
            //      async: boolean
            //          Asynchronous or not?
            //      id: string
            //          The script ID.
            //      position:
            //          The location in insert the node with reference to the
            //          reference node : first, last, after, before.
            //          Defaults to last.
            // returns: XMLNode
            //      The script node being used as a loader.
            
            var done = false;
            var context = ((constr.hasOwnProperty('context'))?constr.context:this);
            var position = ((position==undefined)?'last':position);
    
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = constr.src;
            script.async = ((constr.hasOwnProperty('async'))?constr.async:true);
            if (constr.hasOwnProperty('id')) { script.id = constr.id; }
            
            if (constr.onload) {
                this.addOnloadFunction(script,constr.onload,context);
            }
            if (constr.onerror) {
                script.onerror = constr.onerror.bind(context);
            }
            
            this._placeNode(script,constr.node,position);
            return script;
        },
        
        _placeNode: function(node,refnode,position) {
            position = ((position==undefined)?'last':position);
            switch(position.toLowerCase()) {
                case 'last':
                    refnode.appendChild(node);
                    break;
                case 'before':
                    refnode.parentNode.insertBefore(node,refnode);
                    break;
                case 'first':
                    refnode.parentNode.insertBefore(node, refnode.parentNode.firstChild);
                    break;
                case 'after':
                    refnode.parentNode.insertBefore(node, refnode.nextSibling);
                    break;
            }
        },
        
        addOnloadFunction: function(node,onload,context) {
            var done = false;
            context = ((context==undefined)?this:context);
            
            var boundOnload = onload.bind(context);
            var func = function() {
                if (!done && (!node.readyState || node.readyState=="loaded" || node.readyState=="complete")) {
                    done = true;
                    boundOnload();
                }
            };
            
            if (this._ieVersion()) {
                node.onreadystatechange = func.bind(context);
            } else {
                node.onload = func.bind(context);
            }
        },
        
        insertScriptIntoHead: function(constr) {
            // summary:
            //      Insert a script tag into the page <head>.
            // description:
            //      Insert a script into the page <head> and fire a callback
            //      event once it is loaded.  Used for asynchronous
            //      script loading.
            // constr: object
            //      Parameters object with properties:
            //      src: string
            //          The URL to load the script from
            //      onload: function
            //          The callback function to fire when script has loaded.
            //      onError: function
            //          The fallback function if loading fails
            //      context: object
            //          The context to run onload/onerror within.
            // returns: XMLNode
            //      The script node being used as a loader.
            
            constr.node = document.getElementsByTagName("head")[0];
            return this.appendScript(constr);
        },
        
        _mixin: function(obj1,obj2) {
            // summary:
            //      Mix two objects together
            // obj1: object
            //      Object to mix into.
            // obj2: object
            //      Object to mix in
            // returns: object
            //      Mixed object.
            
            var obj = {};
            for (var key in obj1) {
                obj[key] = obj1[key];
            }
            for (var key in obj2) {
                obj[key] = obj2[key];
            }
            
            return obj;
        },
        
        _ieVersion: function() {
            // summary:
            //      Get the Internet Explorer version (or false if other browser).
            // note:
            //      Code largely taken from dojo._base.sniff.
            // returns: integer
            //      Version number
            
            if (this._bowserSniffed) { return this.isIE; }
            
            var webkit = parseFloat(navigator.userAgent.split("WebKit/")[1]) || undefined;
            if (!webkit) {
                if (navigator.userAgent.indexOf("Opera") == -1) {
                    if(document.all) {
                        this.isIE = parseFloat(navigator.appVersion.split("MSIE ")[1]) || undefined;
                        var mode = document.documentMode;
                        if(mode && mode != 5 && Math.floor(this.isIE) != mode){
                            this.isIE = mode;
                        }
                    }
                }
            }
            
            this.isIE = (((this.isIE == undefined) || (this.isIE == 0)) ? false : this.isIE);
            return this.isIE;
        },
        
        _addConsole: function() {
            // summay:
            //      Add missing console (stop errors from no console).
            
            if (typeof console === "undefined") {
                console = {
                    log: function() { this._generic(arguments); },
                    debug: function() { this._generic(arguments); },
                    info: function() { this._generic(arguments); },
                    warn: function() { this._generic(arguments); },
                    error: function() { this._generic(arguments); },
                    
                    _consoleDiv:false,
                    
                    _addConsoleDiv: function() {
                        // summary:
                        //      Add a console div on the screen.
                        
                        this._consoleDiv = document.createElement('div');
                        this._consoleDiv.setAttribute("id", "console");
                        this._consoleDiv.setAttribute("style", "width:100%;background-color:#ffaaaa;border:2px solid #990000;color:#000000;padding:8px;");
                        var header = document.createElement('h2');
                        header.innerHTML = 'Javascript Console Messages';
                        this._consoleDiv.appendChild(header);
                        document.body.appendChild(this._consoleDiv);
                    },
                    
                    _generic: function(args) {
                        // summary:
                        //      Write messages to the console <div>
                        
                        if (typeof dojoConfig !== "undefined") {
                            if (dojoConfig.isDebug) {
                                if (!this._consoleDiv) {
                                    this._addConsoleDiv();
                                }
                                
                                var message = document.createElement('p');
                                for( var i=0; i<args.length; i++ ) {
                                    message.innerHTML += args[i] + ' ';
                                }
                                this._consoleDiv.appendChild(message);
                            }
                        }
                    }
                };
            }
        },
        
        _addGoogleAnalytics: function(constObj) {
            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', constObj.googleAnalyticsAccount]);
            window._gaq.push(['_trackPageview']);
                
            var url = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            
            this.insertScriptIntoHead({'src':url});
            
            //this.insertScriptIntoHead(url,function(){});
        },
        
        _logger: function(constObj) {
            var construct = {
                'loader':{},
                'trackTimings':true,
                'logTimingsToConsole':true,
                'sendTimingsToGoogleAnalytics':true,
                'trackErrors':true,
                'sendErrorsToGoogleAnalytics':true,
                
                '_logger':[],
                '_errorLogger':[],
                '_overrideHead': false,
                '_overrideBody': false,
                
                constructor: function(constObj) {
                    for (var key in constObj) {
                        this[key] = constObj[key];
                    }
                    
                    if (this.trackTimings) {
                        this._checkAddOverrides();
                    }
                    if (this.trackErrors) {
                        this._addErrorEvent();
                    }
                },
                
                _checkAddOverrides: function() {
                    if ((!this._overrideHead) || (!this._overrideBody)) {
                        this._addNodeInsertEvent(this._logInsertion);
                    }
                },
                
                _addErrorEvent: function() {
                    var boundFunc = this._handleError.bind(this);
                    try {
                        document.addEventListener('error',boundFunc,true);
                    } catch(e) {
                        if (window.addEventListener) {  
                            window.addEventListener('error', boundFunc, true);   
                        } else if (window.attachEvent)  {  
                            window.attachEvent('onerror', boundFunc);  
                        }  
                    }
                },
                
                _handleError: function(error) {
                    if (typeof(input)=='error') {
                        this._errorLogger.push({
                            'uri':arguments[1],
                            'logged':false,
                            'type':arguments[0]
                        });
                    } else {
                        var target = this._getEventTarget(error);
                        this._errorLogger.push({
                            'name':this._getTagName(target),
                            'uri':this._getNodeURI(target),
                            'logged':false,
                            'type':error.type
                        });
                    } 
                },
                
                _getNodeURI: function(node) {
                    if (node.src) { return node.src; }
                    if (node.href) { return node.href; }
                    if (node.source) { return node.source; }
                    if (node.action) { return node.action; }
                    return '';
                },
                
                _logInsertion: function(node) {
                    this._checkAddOverrides();
                
                    if (this._getTagName(node) == 'script') {
                        var logObjId = this._findObjectInLogger(node.src);
                        if (logObjId === false) {
                            this._logger.push({'src':node.src,'start':new Date().getTime(),'end':0,'logged':false});
                        }
                    
                        if (this.loader) {
                            var boundFunc = this._logLoad.bind(this);
                            if (this.loader._ieVersion()) {
                                node.attachEvent('onreadystatechange',boundFunc);
                            } else {
                                node.addEventListener('load',boundFunc,false);
                            }
                        }
                    }
                },
                
                _parseLogger: function() {
                    if (typeof _gaq !== 'undefined') {
                        for (var i=0; i<this._logger.length; i++) {
                            if ((this._logger[i].end > 0) && (!this._logger[i].logged)) {
                                this._trackTiming(i);
                            }
                        }
                        
                        for (var i=0; i<this._errorLogger.length; i++) {
                            if (!this._errorLogger[i].logged) {
                                this._trackErrors(i);
                            }
                        }
                    }
                },
                
                _logLoad: function(e) {
                    var target = this._getEventTarget(e);
                    if (this._getTagName(target) == 'script') {
                    
                        var endTime = new Date().getTime();
                        var logObjId = this._findObjectInLogger(target.src);
                    
                        if (!target.readyState || target.readyState == "loaded" || target.readyState == "complete") {
                            if (logObjId !== false) {
                                if (this._logger[logObjId].end == 0) {
                                    this._logger[logObjId].end = endTime
                                }
                            }
                        }
                        
                        this._parseLogger();
                    }  
                },
                
                _addNodeInsertEvent: function(func) {
                    var boundFunc = func.bind(this);
                    
                    var head = document.getElementsByTagName("head");
                    if ((head.length > 0) && (!this._overrideHead)) {
                        this._overrideHead = true;
                        this._overrideFunction('appendChild',head[0],boundFunc);
                        this._overrideFunction('insertBefore',head[0],boundFunc);
                    }
                
                    var body = document.getElementsByTagName("body");
                    if ((body.length > 0) && (!this._overrideBody)) {
                        this._overrideBody = true;
                        this._overrideFunction('appendChild',body[0],boundFunc);
                        this._overrideFunction('insertBefore',body[0],boundFunc);
                    }
                },
                
                _getTagName: function(node) {
                    var tagName = '';
                    if (node.tagName) { tagName = node.tagName.toLowerCase(); }
                    return tagName;
                },
            
                _getEventTarget: function(event) {
                    if (event.target) { return event.target; }
                    if (event.orginalTarget) { return event.orginalTarget; }
                    if (event.srcElement) { return event.srcElement; }
                    if (event.currentTarget) { return event.currentTarget; }
                
                    return event;
                },
            
                _trackTiming: function (logObjId) {
                    var src = this._logger[logObjId].src;
                    var elapsedTime = this._logger[logObjId].end - this._logger[logObjId].start;
                
                    if (this.sendTimingsToGoogleAnalytics) {
                        _gaq.push(['_trackTiming','Asynchronous Scripts',src,elapsedTime]);
                    }
                    if (this.logTimingsToConsole) {
                        console.info('LOADED ('+elapsedTime+') ',src);
                    }
                    this._logger[logObjId].logged = true;
                },
                
                _trackErrors: function (logObjId) {
                    if (this.sendErrorsToGoogleAnalytics) {
                        _gaq.push(['_trackEvent','Page Errors',this._errorLogger[logObjId].name,this._errorLogger[logObjId].type,this._errorLogger[logObjId].uri]);
                    }
                    this._errorLogger[logObjId].logged = true;
                },
            
                _findObjectInLogger: function(src) {
                    for (var i=0; i<this._logger.length; i++) {
                        if (this._logger[i].src == src) {
                            return i;
                        }
                    }
                
                    return false;
                },
            
                _overrideFunction: function(funcName,object,newFunc) {
                    var oldFunc = object[funcName];
                    object[funcName] = function() {
                        newFunc.apply(object,arguments);
                        oldFunc.apply(object,arguments);
                    };
                }
            };
            
            construct.constructor(constObj);
            return construct;
        },
        
        _getScriptPath: function() {
            if (this.scriptPath == false) {
                var scripts= document.getElementsByTagName('script');
                var path = scripts[scripts.length-1].src.split('?')[0];
                this.scriptPath = path.split('/').slice(0, -1).join('/')+'/'; 
            }
            
            return this.scriptPath;
        },
        
        _addHtml5Shiv: function() {
            var ieVersion = this._ieVersion();
            if ((ieVersion > 0) && (ieVersion < 9)) {
                if (document.doctype == null) {
                    this.insertScriptIntoHead({
                        'src':'http://html5shiv.googlecode.com/svn/trunk/html5.js',
                    });
                } else if (document.doctype) {
                    if ((document.doctype.publicId == '') && (document.doctype.nodeName == 'html')) {
                        this.insertScriptIntoHead({
                            'src':'http://html5shiv.googlecode.com/svn/trunk/html5.js',
                        });
                    }
                }
                
            }
        },
        
        constructor: function(constObj) {
            var scriptPath = this._getScriptPath();
            
            var logger = '';
            if (constObj.logger) {
                var logger = new this._logger(this._mixin(
                    constObj.logger,{'loader':this}
                ));
            } else {
                var logger = new this._logger({'loader':this});
            }
            
            var onload = function() { this._runOnloads(); }
            onload = onload.bind(this);
            
            if (constObj.addConsole) { this._addConsole(); }
            if (constObj.googleAnalytics) { this._addGoogleAnalytics(constObj); }
            if (constObj.addHtml5Shiv) { this._addHtml5Shiv(constObj); }
            
            var dojoLoaderURL = scriptPath + 'dojoLoader.js';
            
            this.insertScriptIntoHead({
                'src':scriptPath + 'dojoLoader.js',
                'onload':function() {
                    this.dojoLoader = new dojoLoader(
                        this._mixin({'onload':onload,'scriptDirectory':scriptPath},constObj)
                    );
                },
                'context':this
            });
        }
    }
    
    construct.constructor(constObj);
    return construct;
}

simpo.loader = new simpo.asyncLoader({
    'isDebug':true,
    'cacheBust':new Date(),
    'useCdn':true,
    'gfxRenderer':'svg,silverlight,vml',
    'googleAnalytics':false,
    'googleAnalyticsAccount':'UA-13024178-8',
    'addConsole':false,
    'addHtml5Shiv':true
});