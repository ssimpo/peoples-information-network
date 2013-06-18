var profile = {
	basePath: "./",
    releaseDir: "release",
	releaseName: "tester",
	action: "release",
	
	layerOptimize: "shrinksafe",
	optimize: "shrinksafe",
	//layerOptimize: "closure",
	//optimize: "closure",
	cssOptimize: "comments",
	mini: false,
	insertAbsMids: false,
	
	staticHasFeatures: {
		"host-node": false,
		"host-rhino": false,
		"host-browser": undefined,
		"dom": undefined,
		"dojo-cdn": false,
		"dojo-sniff": undefined
	},
	
	packages: [
		{ name: "lib", location :"lib" },
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
				"rcbc/dijit/TextArea",
				"rcbc/dijit/subdocumentSelect",
				"rcbc/dijit/radioGrid",
				"rcbc/dijit/linkedIdList",
				"rcbc/dijit/dialogOkButton",
				"rcbc/dijit/dialogCancelButton",
				"rcbc/dijit/dialog",
				"rcbc/dijit/combo",
				"rcbc/dijit/checkboxGrid",
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
				"dojo/on",
				"dojo/has",
				"dojo/sniff"
			]
        },
		"rcbc/pin": {
			include: [
				"rcbc/pin",
				"dojo/hash",
				"dojo/topic",
				"dojo/string",
				"simpo/xhrManager",
				"simpo/typeTest",
				"simpo/interval",
				"dojo/_base/array",
				"rcbc/pin/cacheStore2",
				"rcbc/pin/cacheStore/queryCache",
				"rcbc/pin/shortlist",
				"rcbc/pin/sectionMenu",
				"rcbc/pin/sideMenu",
				"rcbc/pin/serviceDisplayer",
				"rcbc/pin/serviceListDisplayer",
				"rcbc/pin/searchWidget",
				"rcbc/pin/expandingDiv",
				"rcbc/pin/_listItems",
				"rcbc/pin/serviceDisplayer/accessTable",
				"rcbc/pin/serviceDisplayer/activityTimesTable",
				"rcbc/pin/serviceDisplayer/contactsTable",
				"rcbc/pin/serviceDisplayer/contactsTable/_base",
				"rcbc/pin/serviceDisplayer/contactsTable/email",
				"rcbc/pin/serviceDisplayer/contactsTable/emailAddress",
				"rcbc/pin/serviceDisplayer/contactsTable/skype",
				"rcbc/pin/serviceDisplayer/contactsTable/telephone",
				"rcbc/pin/serviceDisplayer/contactsTable/textNumber",
				"rcbc/pin/serviceDisplayer/contactsTable/website",
				"rcbc/pin/serviceDisplayer/costTable",
				"rcbc/pin/serviceDisplayer/serviceHoursTable",
				"rcbc/pin/serviceDisplayer/venuesDisplayer",
				"rcbc/pin/serviceDisplayer/venuesDisplayer/venueDisplayer"
			], exclude : [
				"dojo/dom-attr",
				"dojo/dom-construct",
				"dojo/dom-class",
				"dojo/query",
				"dojo/on",
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
				"dojo/has",
				"dojo/sniff"
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
				"dojo/html",
				"dojo/has",
				"dojo/sniff"
			],
			customBase: true,
            boot: true
        }
    }
}