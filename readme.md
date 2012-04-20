#Install
Requires: node, npm
`./ refers to repository root`

Docs use YUIDoc (node version)  
To Install:  
	`npm -g install yuidocjs`  
	http://davglass.github.com/yuidocjs/


To build docs, in ./ run  
  `yuidoc -o ./docs ./assets/js/lib/BI/`

Docs will need to be opened locally (open ./docs/index.html)


#Integrate

1. Checkout tbi branch ko_integration
2. Checkout/cp this repo into tbi root


###Existing Model

1.  Add getJSON method to model
	`public function getJSON() 
    {
    	return json_encode(get_object_vars($this));
    }`

3. Controller still needs to be created in the TBI repo in
	tbi/businessinsider/htdocs/cms/*

	Sample:
	`<?php
		//different config than usual
		require($_SERVER['TBI_CONFIG'] . 'frontendCMSv2.php');
		$id = get_request_var('id');
		if ($id) {
			$event = Event::findOne($id);
			
			if (!$event)
			{
				Util_Site::setFlashMessage('Unable to find event with id=' . $id);
				Util_Http::redirect('/cms/events');
			}
		}
		else {
			$event = new Event();
		}

		$document->addVars(array(
			'env'		=> ENV,
			'domain'	=> SITE_DOMAIN
		));
		//call the new method we added
		$event_json = $event->getJSON();
		//everything gets protected in the view, so we have to pass the json in
		CMShtmlview('events/edit', array('event' => $event,'event_json' => $event_json));
	`

4. Templates are created in
	./assets/templates/*

	Sample:
		./assets/templates/events/edit.tpl.php



#Todo

###General
1.  Figure out a way to document controllers & plugin adapters under separate catagories
2.  Choose testing framework

###Widget Conversions
1.  Images
2.  Data-source 
3.  Catagories