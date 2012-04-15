YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BI",
        "BI.location.querystring",
        "BI.mvvm"
    ],
    "modules": [
        "base",
        "mvvm",
        "querystring"
    ],
    "allModules": [
        {
            "displayName": "base",
            "name": "base",
            "description": "Define our global BI variable (and organization methods)\nThis is a singleton defined using the Revealing Module Pattern"
        },
        {
            "displayName": "mvvm",
            "name": "mvvm",
            "description": "Custom helper functions for doing basic tasks with data sets and knockout\nAbstracted as MVVM should we ever need to replace knockout"
        },
        {
            "displayName": "querystring",
            "name": "querystring"
        }
    ]
} };
});