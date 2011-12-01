$(document).ready(function(){

	$.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=998875@N22&lang=en-us&format=json&jsoncallback=?", displayImages);

	function displayImages(data) {
		var iStart = Math.floor(Math.random()*(8));
		var iCount = 0;
		
		var htmlString = [];
		
		$.each(data.items, function(i,item){
		    
		     if (iCount > iStart && iCount < (iStart + 13)) {
		       
		       htmlString += '<li><a href="' + item.link + '" target="_blank">';
		       htmlString += '<img title="' + item.title + '" src="' + item.media.m + '"height="120px"';
		       htmlString += '" alt="'; htmlString += item.title + '" />';
		       htmlString += '</a></li>';
		       }
		       iCount++;
		
		    });
   
	    $('#lista').html(htmlString);
	    $('#lista li').hide();
		$('#lista li').show(2000);
	}
});