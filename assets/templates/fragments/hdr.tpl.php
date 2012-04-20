<? global $document, $vertical, $subvertical, $settings, $user, $homepage, $breadcrumb; ?>
<!doctype html>
<head>
  <meta charset="utf-8">
  <title><?=$document->title?></title>
  <meta name="viewport" content="width=device-width">
  <?=CMSfragment('css')?>
</head>
<body>
    <?=Util_Ad::getWallpaperDiv()?>

    <a name="top"></a>

	<div id="doc3" class="yui-t6 vertical-main">
        <div id="hd">
            <div id="hd-top">
                <div id="hd-top-right" class="float-right">
                    <div class="user">
                        Logged in as <?=href('/account', $user->getName())?>.
                        <?=href('/logout?redirect='.u($_SERVER['REQUEST_URI']), 'Logout', array('onclick' => 'return fb_logout()'))?>
                        |
                        <?=href(isset($_COOKIE['frontend_uri']) ? $_COOKIE['frontend_uri'] : '/', $user->hasPermission('contributor') ? 'View the Site' : 'Frontend')?>
                    </div>
                </div>

                <?php if (!Util_Site::clientIsMobile()): ?>
                    <div class="date">
                        <?=strftime('%B %e, %Y', time())?>

                        <?php if (ENV != 'www' && isset($_SERVER['TBI_GITBRANCH'])): ?>
                            - <?=$_SERVER['TBI_GITBRANCH']?>
                        <?php endif ?>
                    </div>
                    <div class="container">
                        <div class="logo-home float-left">
                            <a href="/"><img src="<?=Util_Site::getStaticLink('/assets/images/logos/logo-tbi.gif')?>" width="200" height="90" alt="Business Insider" /></a>
                        </div>
                        <div class="heading">
                            <h1>Content Management System</h1>
                        </div>
                    </div>
                <?php endif ?>
            </div>
        </div>

    <?php if (Util_Site::clientIsMobile()): ?>
        <div>
            <a href="/cms/posts">Posts</a>
            <a href="/cms/pages">Pages</a>
        </div>
    <?php elseif (!$user->hasPermission('admin')): ?>
        <ul class="nav">
            <li><a href="/cms/posts/edit">New Post</a></li>
            <li><a href="/cms/contributor/posts">Posts</a></li>
            <li><a href="/cms/contributor/drafts">Drafts</a></li>
            <li><a href="/cms/contributor/profile">Profile</a></li>
            <li><a href="/cms/autotweet">Autotweet</a></li>
            <li><a href="/account">Account Settings</a></li>
            <li><a href="/cms/contributor/faq">Help</a>
                <ul>
                    <li><a href="/cms/contributor/faq">FAQ</a></li>
                    <li><a href="/cms/contributor/guidelines">Editorial Guidelines</a></li>
                </ul>
            </li>
        </ul>
    <?php else: ?>
        <ul class="nav">
            <li>
                <a href="/cms/posts">Content</a>
                <ul>
                    <li><a href="/cms/posts/edit">New Post</a></li>
                    <li><a href="/cms/posts">Posts</a></li>
                    <li><a href="/cms/pages">Pages</a></li>
                    <li><a href="/cms/drafts">Drafts</a></li>
					<li><a href="/cms/events">Events</a></li>
					<li><a href="/cms/content/brief">Create Brief</a></li>
                    <li><a href="/cms/content/tweet">Tweet To River</a></li>
                    <li><a href="/cms/newsletters">Newsletters</a></li>
                    <!--li><a href="/cms/resourcecenter">Resource Center</a></li-->
                    <li><a href="/cms/sweepstakes">Sweepstakes</a></li>
                    <li><a href="/cms/pipeline/deals">Pipeline Deals</a></li>
                    <li><a href="/cms/missingpages">Missing Pages</a></li>
                    <li><a href="/cms/chart/list">Charts</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Layout</a>
                <ul>
                    <li><a href="/cms/sidebar">Editorial Sidebar</a></li>
                    <li><a href="/cms/breaking">Breaking News</a></li>
                    <li><a href="/cms/countdown">Countdown Timers</a></li>
                    <li><a href="/cms/thehive">The Hive</a></li>
					<li><a href="/cms/live">BI Live</a></li>
                </ul>
            </li>
            <li>
                <a href="/cms/ads/regions">Ads</a>
                <ul>
                    <li><a href="/cms/ads/regions">Regions</a></li>
                    <li><a href="/cms/ads/tags">Tags</a></li>
                    <li><a href="/cms/ads/sharing">Sharing</a></li>
                    <li><a href="/cms/ads/wallpaper">Wallpaper</a></li>
                </ul>
            </li>
            <li>
                <a href="/cms/homepages">Homepage</a>
                <ul>
                    <li><a href="/cms/homepages">Scheduled</a></li>
                    <li><a href="/cms/homepages?action=edit">Main</a></li>
                    <?php foreach (Util_Site::getVerticals(true, false, true) as $v): ?>
                        <li><a href="/cms/homepages?action=edit&vertical=<?=$v->name?>"><?=h($v->label)?></a></li>
                    <?php endforeach ?>
                </ul>
            </li>
            <li>
                <a href="/cms/readme">Read Me</a>
                <ul>
                    <li><a href="/cms/readme">Main</a></li>
                    <?php foreach (Util_Site::getVerticals(true, false, true) as $v): ?>
                        <li><a href="/cms/readme?vertical=<?=$v->name?>"><?=h($v->label)?></a></li>
                    <?php endforeach ?>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0)">Settings</a>
                <ul>
					<li><a href="/cms/terminal">Terminal</a></li>
                    <li><a href="/cms/autotweet">Autotweet</a></li>
                    <li><a href="/cms/authors">Authors</a></li>
                    <li><a href="/cms/publications">Publications</a></li>
                    <li><a href="/cms/categories">Categories</a></li>
                    <li><a href="/cms/users">Users</a></li>
                    <li><a href="/cms/subscriptions">Subscriptions</a></li>
                    <li><a href="/cms/promocodes">Promo Codes</a></li>
                    <li><a href="/cms/tapefeeds">Tape Feeds</a></li>
                    <li><a href="/cms/tape">The Tape</a></li>
                    <li><a href="/cms/files">Files</a></li>
                    <li><a href="/cms/contributor/add">Add Contributor</a></li>
                    <li><a href="/cms/alerts">Alerts</a></li>
                    <li><a href="/cms/analytics/authors_unique_setup">Setup Per-Author Uniques</a></li>
					<li><a href="/cms/customfeeds">Custom RSS Feeds</a></li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0)">Moderation</a>
                <ul>
                    <li><a href="/cms/comments">Comments</a></li>
                    <li><a href="/cms/comments?type=offensive">Offensive Comments</a></li>
                    <li><a href="/cms/comments?type=spam">Spam Comments</a></li>
                    <li><a href="/cms/questions">Questions</a></li>
                    <li><a href="/cms/answers">Answers</a></li>
                </ul>
            </li>
            <li>
                <a href="/cms/analytics/rolling">Analytics</a>
                <ul>
                    <li><a href="/cms/analytics/fivemin">Last Three Hours</a></li>
                    <li><a href="/cms/analytics/rolling">Rolling Hourly Pageviews</a></li>
                    <li><a href="/cms/analytics/hourly">Hourly Pageviews &amp; Uniques</a></li>
                    <li><a href="/cms/analytics/daily">Daily Pageviews &amp; Uniques</a></li>
                    <li><a href="/cms/analytics/daily?contributors=1">Daily Pageviews &amp; Uniques (Contrib)</a></li>
                    <li><a href="/cms/analytics/weekly">Weekly Pageviews</a></li>
                    <li><a href="/cms/analytics/weekly?contributors=1">Weekly Pageviews (Contrib)</a></li>
                    <li><a href="/cms/analytics/monthly">Monthly Pageviews &amp; Uniques</a></li>
                    <li><a href="/cms/analytics/monthly?contributors=1">Monthly Pageviews &amp; Uniques (Contrib)</a></li>
                    <li><a href="/cms/analytics/pages?hours=1">Top Pages (This Hour)</a></li>
                    <li><a href="/cms/analytics/pages?today=1">Top Pages (Today)</a></li>
                    <li><a href="/cms/analytics/pages?hours=1&blackboard=1">Top Blackboard Pages (This Hour)</a></li>
                    <li><a href="/cms/analytics/pages?today=1&blackboard=1">Top Blackboard Pages (Today)</a></li>
                    <li><a href="/cms/analytics/pages?hours=1&questions=1">Top Questions (This Hour)</a></li>
                    <li><a href="/cms/analytics/pages?today=1&questions=1">Top Questions (Today)</a></li>
                    <li><a href="/cms/analytics/referers?hours=1">Referrers (This Hour)</a></li>
                    <li><a href="/cms/analytics/referers?today=1">Referrers (Today)</a></li>
                    <li><a href="/cms/analytics/comments?mode=day">Comments (Daily)</a></li>
                    <li><a href="/cms/analytics/comments?mode=month">Comments (Monthly)</a></li>
                    <li><a href="/cms/analytics/search?hours=1">Searches (This Hour)</a></li>
                    <li><a href="/cms/analytics/search?hours=24">Searches (Last 24 Hours)</a></li>
                    <li><a href="/cms/analytics/posts">Top Posts</a></li>
                    <li><a href="/cms/analytics/authors_current">Author Stats (Current)</a></li>
                    <li><a href="/cms/analytics/authors">Author Stats (All Posts)</a></li>
                    <li><a href="/cms/analytics/editors_current">Editor Stats (Current)</a></li>
                    <li><a href="/cms/analytics/authors_unique">Per-Author Uniques</a></li>
                    <li><a href="/cms/analytics/embeds">Embeds (Today)</a></li>
                    <li><a href="/cms/analytics/tags?mode=all">Category Stats</a></li>
                    <li><a href="/cms/analytics/email_unsubscribes">Email Unsubscribes (Daily)</a></li>
                    <li><a href="/cms/analytics/email_unsubscribes?mode=month">Email Unsubscribes (Monthly)</a></li>
                    <li><a href="/cms/contributor/stats">Contributor Stats</a></li>
					<li><a href="/cms/analytics/api?mode=day">Api/iPhone Stats (Daily)</a></li>
					<li><a href="/cms/analytics/api?mode=month">Api/iPhone Stats (Monthly)</a></li>
					<li><a href="/cms/analytics/intelligence_marketing">Intelligence Marketing</a></li>
                </ul>
            </li>
			<li>
				  <a href="/questions/profile?id=<?= $user->id ?>">Questions</a>
			<li>
            <li>
                <a href="/cms/ticket">Support</a>
                <ul>
                    <li><a href="/cms/ticket">Submit Bug / Feature Request</a></li>
                    <li><a href="http://wiki.businessinsider.com" target="_blank">Wiki</a></li>
                </ul>
            </li>
            <?php if ($user->isSuperAdmin()): ?>
                <li>
                    <a href="javascript:void(0)">Tools</a>
                    <ul>
                        <li><a href="/cms/tools/apc">APC Stats</a></li>
                        <li><a href="/cms/tools/charts">Charts</a></li>
                        <li><a href="/cms/tools/charts_builder">Charts Builder</a></li>
                        <li><a href="/cms/tools/memcached">Memcached Stats</a></li>
                        <li><a href="/cms/tools/mongo_profiler">Mongo Profiler</a></li>
                        <li><a href="/cms/tools/servers">Servers</a></li>
						<li><a href="/cms/tools/apphealth">Application Health</a></li>
                    </ul>
                </li>
            <?php endif ?>
        </ul>
    <?php endif ?>

    <div id="bd" style="background-color:white">
        <!-- Review posts bar -->
        <?=fragment('cms/review_posts_bar')?>
        <!-- / Review posts bar -->

        <!-- Bread Crumb -->
        <?php if (isset($breadcrumb)): ?>
            <div class="breadcrumb">
                <?=$breadcrumb?>
            </div>
        <?php endif ?>
        <!-- / Bread Crumb -->