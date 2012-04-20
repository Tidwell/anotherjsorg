<?php if ($event->id): ?>
	<?=Util_Cms::getEditLockWarning(null, null, 10 * MINUTES)?>
<?php endif ?>

<?=CMSfragment('hdr', $event)?>
<a href="/cms/events/edit?id=<?=$event->id?>">Original Editor</a>
<div id="container" class="edit-event">
  <form>
  <h1 class="title">Edit Event</h1>

  <h2>Setup and Landing Page</h2>
    <p><label>Event Name</label><input type="text"  data-bind="value: name" /></p>
    <p><label>Url</label><span>businessinsider.com/event/<input type="text" data-bind="value: url" class="url"/></span></p>
    <p><label>Event Tagline</label><input type="text" data-bind="value: tagline" /></p>
    <p><label>Tagline Color</label><input type="text" data-bind="colorpicker: tagline_color,value: tagline_color" /></p>
    <p><label>Register Button Color</label><input type="text" data-bind="colorpicker: register_button_color, value: register_button_color" /></p>
    <p><label>Show Register Buton</label><input type="checkbox" data-bind="checked: register_button" /></p>
    <p><label>Event Logo:</label><input type="text" data-bind="value: logo.$id" /></p>
    <p><label>Eventbright / Ticketleap Url</label><input type="text" data-bind="value: register_url" class="url"/></p>
    <p><label>Landing Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: landing_content"></textarea>
    <p><label>Nav Color</label><input type="text" data-bind="colorpicker: nav_color, value: nav_color" /></p>

  <h2>Agenda</h2>
    <p><label>Agenda Page Content</label><textarea rows="8" cols="80" data-bind="tinymce: agenda_content"></textarea>

  <h2>Speakers</h2>
    <p><label>Header:</label><input type="text" data-bind="value: speakers_header" /></p>
    <div data-bind="sortable: {data: speakers,connectClass: 'speakers'}">
      <div class="speaker">

        <p><label>Photo:</label><input type="text" data-bind="value: photo.$id" /></p>
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
    <div data-bind="sortable: rails">
      <div class="sponsor">
        <p><label>Section Header:</label><input type="text" data-bind="value: header" /></p>
        
        <div data-bind="sortable: {data: data,connectClass: 'imgs'}">
          <div class="imgs">
            <p><label>Sponsor Logo/Image:</label><input type="text" data-bind="value: image.$id" /></p>
            <p><label>Sponsor Url:</label><input type="text" data-bind="value: link" /></p>
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

    <button data-bind="click: save">Save</button>
  </form>
</div>

<!-- JavaScript at the bottom for fast page loading -->
<!--include the js lib-->
<?=CMSfragment('js', $event)?>

<script>
//set event data so we can use it in JS
//we could also just make an ajax call in the controller to get this
//data from a different route
BI.pageData.set('event', (<?=$event_json?>));
BI.pageData.set('emptyEvent',{	
	"id":"",
	"name":"",
	"tagline":"",
	"tagline_color":"",
	"register_button_color":"",
	"register_button":true,
	"logo":{
    "id":""
  },
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
			"id":""
		}
	}],
	"rails":[{
		"header":"",
		"data":[{
			"image":{"id": ""},
      "link": ""
		}]
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

<!-- Page Controller -->
<script type='text/javascript' src='/assets/CMS/assets/js/lib/controllers/events.js'></script>

<!-- End scripts -->
<?=CMSfragment('ftr', $event)?>