function submitForm(){
	require([
		"dojo/query",
		"dijit/registry",
		"dojo/request",
		"dijit/Dialog",
		"dojo/on",
		"dijit/form/Button",
		"dojo/_base/array"
	], function(
		$, registry, request, Dialog, on, Button, array
	){
		var form = serviceForm;
		form.startup();
			
		if(form.validate()){
			var value = form.value;
			for(var fieldname in value){
				if(Object.prototype.toString.call(value[fieldname] ) === '[object Object]') {
				value[fieldname] = JSON.stringify(value[fieldname]);
				}
			}
		
			request("/pin.nsf/serviceUpdate?OpenAgent", {
				"method":"POST",
				"data":value,
				"preventCache":true,
				"handleAs": "json"
			}).then(function(data){
				if (data.success){
					var successDialog = showDialog(
						"Success",
						"<b>Service information submitted succesfully.</b>",
						"Feedback"
					);
					on(successDialog, "hide", function(){
						window.location = "http://www.redcarclevelandcyptrust.org.uk/family.nsf/WebFullList/0F9BC4B1437870958025793300366452?OpenDocument";
					});
					successDialog.show();
				}
			}, function(errText){
				var invalidDialog = showDialog(
					"Invalid Entries",
					"<b>Some of the information is invalid or required fields have not been entered.</b>",
					"Error"
				);
			});
		}else{
			var invalidDialog = showDialog(
				"Invalid Entries",
				"<b>Some of the information is invalid or required fields have not been entered.</b>",
				"Error"
			);
		}
		
		function showDialog(title, message, type){
			var dialog = new Dialog({
				"title": "Invalid Entries",
				"content": "<div class=\"dojoRcbcDijitDialog"+type+"\"><p>"+message+"</p><button data-dojo-type=\"dijit/form/Button\">Ok</button></div>",
					"class": "dojoRcbcDijitDialog"
			});
			dialog.show();
			var childWidgets = registry.findWidgets(dialog.domNode);
			array.forEach(childWidgets, function(widget){
				if(widget.constructor == Button){
					on(widget, "click", function(){
						dialog.hide();
					});
				}
			}, this);
			
			return dialog;
		}
	});
}
