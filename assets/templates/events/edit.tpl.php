<?php if ($event->id): ?>
	<?=Util_Cms::getEditLockWarning(null, null, 10 * MINUTES)?>
<?php endif ?>
<?
	//echo json_encode($event->getJSON());
?>
<!doctype html>
<head>
  <meta charset="utf-8">
  <title>BI CMS Lib V2</title>
  <meta name="viewport" content="width=device-width">
  <?=fragment('css', $event)?>  
</head>
<body>
  <a href="/cms/events/edit?id=<?=$event->id?>">Original Editor</a>
  <div id="container">
    <form>
    <h1>Edit Event</h1>

    <h2>Setup and Landing Page</h2>
      <p><label>Event Name</label><input type="text"  data-bind="value: name" /></p>
      <p><label>Url</label><span>businessinsider.com/event/<input type="text" data-bind="value: url" class="url"/></span></p>
      <p><label>Event Tagline</label><input type="text" data-bind="value: tagline" /></p>
      <p><label>Tagline Color</label><input type="text" data-bind="colorpicker: taglineColor,value: taglineColor" /></p>
      <p><label>Register Button Color</label><input type="text" data-bind="colorpicker: register_button_color, value: register_button_color" /></p>
      <p><label>Show Register Buton</label><input type="checkbox" data-bind="checked: register_button" /></p>
      <p><label>Event Logo:</label><input type="text" data-bind="value: logo" /></p>
      <p><label>Eventbright / Ticketleap Url</label><input type="text" data-bind="value: register_url" class="url"/></p>
      <p><label>Landing Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: landing_content"></textarea>
      <p><label>Nav Color</label><input type="text" data-bind="colorpicker: nav_color_picker, value: nav_color_picker" /></p>

    <h2>Agenda</h2>
      <p><label>Agenda Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: agenda_content"></textarea>

    <h2>Speakers</h2>
      <p><label>Header:</label><input type="text" data-bind="value: speakers_header" /></p>
      <div data-bind="sortable: {data: speakers,connectClass: 'speakers'}">
        <div class="speaker">

          <p><label>Photo:</label><input type="text" data-bind="value: photo" /></p>
          <p><label>Name:</label><input type="text" data-bind="value: name" /></p>
          <p><label>Title:</label><input type="text" data-bind="value: title" /></p>
          <p><label>Comapny:</label><input type="text" data-bind="value: company" /></p>
          <p><label>Bio</label><textarea rows="8" cols="80" data-bind="tinymce: bio"></textarea>
          <p><label>Featured on Main Page</label><input type="checkbox" data-bind="checked: featured" /></p>
          <button data-bind="click: $parent.deleteSpeaker">-Delete Speaker</button>
          <hr />          
        </div>
      </div>
      <button data-bind="click: addSpeaker">+Add Speaker</button>

    <h2>Venue</h2>
      <p><label>Venue Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: venue_content"></textarea>

    <h2>Tickets</h2>
      <p><label>Tickets Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: tickets_content"></textarea>

    <h2>Sponsors</h2>
      <p><label>Sponsors Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: sponsor_content"></textarea>

    <h2>Contact</h2>
      <p><label>Contact Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: contact_content"></textarea>

    <h2>Press</h2>
      <p><label>Press Content</label><textarea rows="8" cols="80" data-bind="tinymce: press_content"></textarea>

    <h2>Sponsor Right Rail</h2>
      <div data-bind="sortable: rightRail">
        <div class="sponsor">
          <p><label>Section Header:</label><input type="text" data-bind="value: header" /></p>
          <div data-bind="sortable: {data: logos,connectClass: 'imgs'}">
            <div class="imgs">
              <p><label>Sponsor Logo/Image:</label><input type="text" data-bind="value: img" /></p>
              <p><label>Sponsor Url:</label><input type="text" data-bind="value: url" /></p>
              <button data-bind="click: $root.deleteLogo">-Delete Logo</button>
            </div>
          </div>
          <!-- parent is used, because we are nested 2 levels deep inside the viewModel and the method is on the top level-->
          <button data-bind="click: $parent.addLogo">+Add Another Logo</button>
          <button data-bind="click: $parent.deleteSection">-Delete Section</button>
          <hr />
        </div>
      </div>
      <button data-bind="click: addSection">+Add Another Section</button>

      <button type="submit">Save</button>
    </form>
  </div>

  <!-- JavaScript at the bottom for fast page loading -->
  <?=fragment('js', $event)?>
  <!-- Page Controller -->
  <script type='text/javascript' src='/assets/CMS/assets/js/lib/controllers/events.js'></script>
  <script>
    //set event data so we can use it in JS
	BI.pageData.set('event', (<?=$event_json?>));
	BI.pageData.set('emtpyEvent',{	
		"id":"",
		"name":"",
		"tagline":"",
		"tagline_color":"",
		"register_button_color":"",
		"register_button":true,
		"logo":{"$id":""},
		"nav_color":"",
		"url":"",
		"register_url":"",
		"landing_content":"",
		"live_module":false,
		"agenda_content":"",
		"speakers_header":"",
		"speakers":[{
			"name":"",
			"title":null,
			"company":"",
			"bio":"",
			"featured":true,
			"photo":{
				"$id":""
			}
		}],
		"rails":[{
			"header":"",
			"images":[{
				"$id":""
			}],
			"links":[""]
		}],
		"venue_content":"",
		"tickets_content":"",
		"sponsor_content":"",
		"contact_content":"",
		"press_content":"",
		"create_time":null,
		"create_user":null,
		"modify_time":null,
		"modify_user":null
	})
  </script>
  <!-- End scripts -->
 </body>
</html>