function dojoLoader(constObj) {
    "use strict";
    
    var construct = {
        
        'dojoRequire': [],
        'isDebug':false,
        'loadJquery':false,
        'runParser':true,
        'dojoVersion':'1.8.0',
        'jqueryVersion':'1.7.1',
        'checkForLess':true,
        'localPackages':['lib','simpo'],
        'scriptDirectory':'scripts18/',
        'useCdn':true,
        'onload':function() {},
    
        _getRequireArray: function() {
            // summary:
            //      Get the list of requires for current page and return.
            // returns: String[]
        
            var requires = new Array();
        
            this._pushArrayToArray(requires,arguments);
            this._pushArrayToArray(requires,this.dojoRequire);
            
            return requires;
        },
    
        _loadRequires: function() {
            // summary:
            //      Load the requires for the current page, load and run the parser
            //      and fire the onload events.
            
            require.on("error", function(error) {
                if (console) {
                    console.error("Script Loading error: ",error);
                } else {
                    alert("ERROR");
                }
            });
            
            var requires = this._getRequireArray("dojo/parser");
            
            this._requireReady(requires,function() {
                
                if (this.loadJquery) {
                    define.amd.jQuery = true;
                }
                
                if (this.runParser) {
                    this._runDOMParser();
                }
                
                this.onload();
            });
        },
    
        _runDOMParser: function() {
            // summary:
            //      Run the Dojo Dom Parser on the current page
            
            var requires = this._getRequireArray("dojo/parser");
            
            this._requireReady(requires,function() {
                arguments[0][1].parse();
            });
        },
        
        _requireReady: function(requires,func) {
            // summary:
            //      Fire the given function when the DOM is ready and all
            //      requires loaded.
            // requires: array
            //      The dojo requires to load
            // func: function
            //      The function to fire when done and ready.
            // note:
            //      Will bind func to the current context.
            
            this._pushToArray(requires,"dojo/ready",true);
            
            require(requires,function(ready) {
                dojo.hitch(this,ready(dojo.hitch(this,func,arguments)));
            }.bind(this)).bind(this);
        },
    
        _pushArrayToArray: function(array1,array2,dounshift) {
            // summary:
            //      Push the contents of one array onto the end of another.
            // description:
            //      Push the contents of one array onto the end of another.
            //      Will only push items not already present.
            // array1: array
            //      The array to push onto.
            // array2: array
            //      The array to push
            // dounshift: boolean|undefined
            //      If set will perform an unshift instead of a push.
            
            dounshift = ((dounshift==undefined)?false:dounshift);
            for (var i=0; i<array2.length; i++)  {
                this._pushToArray(array1,array2[i],dounshift);
            }
        },
    
        _pushToArray: function(arrayObj, searcher,dounshift) {
            // summary:
            //      Push the a string onto an array if not already present.
            // arrayObj: array
            //      The array to push onto.
            // searcher: string
            //      The item to push
            // dounshift: boolean|undefined
            //      If set will perform an unshift instead of a push.
            
            dounshift = ((dounshift==undefined)?false:dounshift);
            var found = false;
        
            for (var i=0; i<arrayObj.length; i++) {
                if (arrayObj[i] == searcher) {
                    found = true;
                    break;
                }
            }
        
            if (!found) {
                if (dounshift) {
                    arrayObj.unshift(searcher);
                } else {
                    arrayObj.push(searcher);
                }
            }
        },
        
        _getJqueryCdn: function(version) {
            // summary:
            //      Get the Google CDN URL for the given version of jQuery.
            // description:
            //      Get the Google CDN URL for the given version of jQuery.  It
            //      will assign a local URL if the useCdn flag is set to true.
            // version: string
            //      The version number to get.
            // returns: string
            //      The CDN URL
            
            var url = '';
            if (this.useCdn) {
                version = ((version==undefined)?this.jqueryVersion:version);
                url = 'http://ajax.googleapis.com/ajax/libs/jquery/'+version;
            } else {
                url = this._getLocalCdnUrl('jquery');
            }
            
            return url;
        },
    
        _getDojoCdn: function(version) {
            // summary:
            //      Get the Google CDN URL for the given version of Dojo.
            // description:
            //      Get the Google CDN URL for the given version of Dojo.  It
            //      will assign a local URL if the useCdn flag is set to true.
            // version: string
            //      The version number to get.
            // returns: string
            //      The CDN URL
            
            var url = '';
            if (this.useCdn) {
                version = ((version==undefined)?this.dojoVersion:version);
                url = 'http://ajax.googleapis.com/ajax/libs/dojo/'+version+'/dojo/dojo.js';
            } else {
                url = this._getLocalCdnUrl('dojo');
            }
            
            return url;
        },
        
        _getLocalCdnUrl: function(libName) {
            // summary:
            //      Get a local URL for the given library.
            // libname: string
            //      The name of the library to get the URL of.
            // returns: string
            //      The library URL
            
            var url = '';
            if (libName.toLowerCase() == 'dojo') {
                url = this._getScriptPath() + 'dojo/dojo.js';
            } else if (libName.toLowerCase() == 'jquery') {
                url = this._getScriptPath() + 'jquery';
            }
            
            return url;
        },
        
        _getScriptPath: function() {
            // summary:
            //      Get the local script path.
            // returns: string
            //      Script path URL.
            
            var dojoPath = '';
            if ((this.scriptDirectory.indexOf('http://') == 0) || (this.scriptDirectory.indexOf('https://') == 0)) {
                return this.scriptDirectory;
            }
    
            try {
                var dojoPath = location.pathname.replace(/\/[^/]+$/, "");
                dojoPath = location.protocol + '//' + location.hostname + dojoPath + '/' + this.scriptDirectory;
            } catch(e) {
                console.error('Error calculating script path')
            }
    
            return dojoPath;
        },
        
        _addJqueryPackage: function(packages) {
            // summary:
            //      Add jQuery to the list of packages to load
            // returns: object[]
            //      The array of packages to load with jQuery now added.
            
            packages.push({
                'name':'jquery',
                'location':this._getJqueryCdn(this.jqueryVersion),
                'main':'jquery'
            });
            
            return packages;
        },
        
        _getPackages: function() {
            // summary:
            //      Get list of packages to load.
            // description:
            //      Get list of packages to load in a format that can be
            //      handled by the dojo loader.
            // returns: object[]
            //      The array of packages to load/
            
            var scriptPath = this._getScriptPath();
            var packages = new Array();
            
            for (var i=0; i<this.localPackages.length; i++) {
                packages.push({
                    'name':this.localPackages[i],
                    'location':scriptPath+this.localPackages[i]
                });
            }
            if (this.loadJquery) {
                this._addJqueryPackage(packages);
            }
            
            return packages;
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
        
        _getDojoConfig: function(obj) {
            // summary:
            //      Get the the calculated dojoConfig object to set.
            // returns: object
            //      The dojoConfig style object.
            
            return this._mixin({
                'async':true, 'parseOnLoad':false,
                'isDebug':this.isDebug,
                'packages':this._getPackages()
            },obj);
        },
        
        _checkForLesscss: function() {
            // summary:
            //      Check for any linked LessCSS stylesheets and add parser if required.
            // todo:
            //      Add check to see if already loaded.
            
            var head = document.getElementsByTagName("head")[0];
            var link = head.getElementsByTagName("link");
            for (var i=0; i<link.length; i++) {
                if (link[i].rel.indexOf("stylesheet/less") != -1) {
                    this.dojoRequire.push("lib/less");
                }
            }
        },
        
        _switchJqueryToLocal: function() {
            for (var i=0; i<window.dojoConfig.packages.length; i++) {
                // Load jquery locally as well
                            
                var dojoPackage = window.dojoConfig.packages[i];
                if (dojoPackage.name == 'jquery') {
                    window.dojoConfig.packages[i].location = this._getJqueryCdn(this.jqueryVersion);
                }
            }
        },
        
        _init: function(constObj) {
            window.dojoConfig = this._getDojoConfig(constObj);
            
            if (this.loadJquery) { this.dojoRequire.push("jquery"); }
            if (this.checkForLess) { this._checkForLesscss(); }
            
            simpo.loader.insertScriptIntoHead({
                'src':this._getDojoCdn(this.dojoVersion),
                'onload':this._loadRequires,
                'onerror':function() {
                    if (this.useCdn) {
                        console.info('Failed to load from CDN will try local version');
                        this.useCdn = false;
                        this._switchJqueryToLocal();
                        simpo.loader.insertScriptIntoHead({
                            'src':this._getLocalCdnUrl('dojo'),
                            'onload':this._loadRequires,
                            'context':this
                        });
                    }
                },
                'context':this
            });
        },
        
        _thisMixin: function(constObj) {
            // summary:
            //      Mix the supplied object into the current context.
            // constObj: object
            //      Object to mixin
            // todo:
            //      Test on old browser, not sure of this[key] methodology in old IE
            
            for (var key in constObj) {
                this[key] = constObj[key];
            }
        },
        
        constructor: function(constObj) {
            this._thisMixin(constObj);
            this._init(constObj);
        }
    };
    
    construct.constructor(constObj);
    return construct;
};