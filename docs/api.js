YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BI",
        "BI.location.cmsPath",
        "BI.location.querystring",
        "BI.mvvm",
        "BI.pageData",
        "BI.template"
    ],
    "modules": [
        "cmsPath",
        "mvvm",
        "pageData",
        "template"
    ],
    "allModules": [
        {
            "displayName": "cmsPath",
            "name": "cmsPath",
            "description": "Used to store and retrieve data about the server path to the library\n(for including scripts, css, relative links, etc)"
        },
        {
            "displayName": "mvvm",
            "name": "mvvm",
            "description": "Custom helper functions for doing basic tasks with data sets and knockout\nAbstracted as MVVM should we ever need to replace knockout"
        },
        {
            "displayName": "pageData",
            "name": "pageData",
            "description": "Used to store and retrieve data\nabout the current page (called often via php)"
        },
        {
            "displayName": "template",
            "name": "template",
            "description": "Provides lazy-loaded templating"
        }
    ]
} };
});