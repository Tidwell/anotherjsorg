#Install
Requires: node, npm

To install, in ./ run  
	`npm install`

#Docs

Docs use YUIDoc (node version)  
To Install:  
	`npm -g install yuidocjs`  
	http://davglass.github.com/yuidocjs/


To build, in ./ run  
  `yuidoc -o ./docs ./assets/js/lib/BI/`

Docs will need to be opened locally (open ./docs/index.html)


#Static Server

In ./ run  
  `node server.js &`

View at: http://localhost:8080/sample


#Todo

###General
3.  Figure out a way to document controllers & plugin adapters under separate catagories
4.  Choose testing framework

###Widget Conversions
1.  Images
2.  Data-source 
3.  Catagories