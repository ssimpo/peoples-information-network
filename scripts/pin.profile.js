var profile = {
	basePath: "./",
    releaseDir: "release",
	releaseName: "test",
	action: "release",
	
	//layerOptimize: "shrinksafe",
	//optimize: "shrinksafe",
	layerOptimize: "closure",
	optimize: "closure",
	cssOptimize: "comments",
	mini: false,
	insertAbsMids: false,
	
	packages: [
		{ name: "rcbc", location :"rcbc" },
		{ name: "dojo", location :"dojo" },
		{ name: "dijit", location :"dijit" },
		{ name: "dojox", location : "dojox" },
		{ name: "simpo", location : "simpo" }
	],
	
	layers: {
        "rcbc/serviceUpdateForm": {
            include: [
				"dijit/form/Form",
				"dijit/form/Button",
				"dijit/Tooltip",
				"dijit/form/NumberSpinner",
				"rcbc/dijit/Form",
				"rcbc/dijit/TextBox",
				"rcbc/dijit/Textarea",
				"rcbc/dijit/subdocumentSelect",
				"rcbc/dijit/radioGrid",
				"rcbc/dijit/linkedIdList",
				"rcbc/dijit/dialogOkButton",
				"rcbc/dijit/dialogCancelButton",
				"rcbc/dijit/dialog",
				"rcbc/dijit/combo",
				"rcbc/dijit/checkBoxGrid",
				"rcbc/dijit/checkWithGender",
				"rcbc/dijit/checkWithDetails",
				"rcbc/dijit/checkWithCheckboxGrid",
				"rcbc/dijit/checkWithAgeRange",
				"rcbc/dijit/ageRange",
				"rcbc/dijit/addNewVenuButton",
				"rcbc/dijit/subdocumentSelect/contact",
				"rcbc/dijit/subdocumentSelect/serviceHours",
				"rcbc/dijit/subdocumentSelect/venue",
				"rcbc/dijit/linkedIdList/models/listItem",
				"rcbc/dijit/linkedIdList/views/listItem.html",
				"rcbc/dijit/linkedIdList/views/linkedIdList.html",
				"rcbc/dijit/views/ageRange.html",
				"rcbc/dijit/views/checkboxGrid.html",
				"rcbc/dijit/views/checkWithDetails.html",
				"rcbc/dijit/views/radioGrid.html",
				"rcbc/dijit/views/subDocumentSelect.html"
			], exclude : [
				"dojo/dojo",
				"dojo/_base/lang",
				"dojo/_base/array",
				"dojo/_base/declare",
				"dijit/_WidgetBase",
				"dijit/_TemplatedMixin",
				"dijit/_WidgetsInTemplateMixin",
				"dojo/parser",
				"dijit/registry",
				"dojo/i18n",
				"dojo/uacss",
				"dojo/hccss",
				"dojo/html",
				"dojo/dom-attr",
				"dojo/dom-construct",
				"dojo/dom-class",
				"dojo/query",
				"dojo/on"
			]
        },
		"rcbc/domcore": {
            include: [
				"dojo/dom-attr",
				"dojo/dom-construct",
				"dojo/dom-class",
				"dojo/query",
				"dojo/on"
			],
			exclude: [
				"dojo/dojo",
				"dojo/_base/lang",
				"dojo/_base/array",
				"dojo/_base/declare",
				"dijit/_WidgetBase",
				"dijit/_TemplatedMixin",
				"dijit/_WidgetsInTemplateMixin",
				"dojo/parser",
				"dijit/registry",
				"dojo/i18n",
				"dojo/uacss",
				"dojo/hccss",
				"dojo/html"
			]
        },
		"dojo/dojo": {
            include: [
				"dojo/dojo",
				"dojo/_base/lang",
				"dojo/_base/array",
				"dojo/_base/declare",
				"dijit/_WidgetBase",
				"dijit/_TemplatedMixin",
				"dijit/_WidgetsInTemplateMixin",
				"dojo/parser",
				"dijit/registry",
				"dojo/i18n",
				"dojo/uacss",
				"dojo/hccss",
				"dojo/html"
			],
			customBase: true,
            boot: true
        }
    }
}