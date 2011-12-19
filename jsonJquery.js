$(document).ready(function(){

	$.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=998875@N22&lang=en-us&format=json&jsoncallback=?", displayImages);

	function displayImages(data) {
		var iStart = Math.floor(Math.random()*(8));
		var iCount = 0;
		
		var htmlString = [];
		var htmlString2 = [];
		var htmlString3 = [];
		
		$.each(data.items, function(i,item){
		    
		     if (iCount > iStart && iCount < (iStart + 13)) {
		       
		       htmlString += '<li><a href="' + item.media.m + '" target="_blank">';
		       htmlString += '<img title="' + item.title + '" src="' + item.media.m + '" height=33% width=14%' ;
		       htmlString += '" alt="'; htmlString += item.title + '" />';
		       htmlString += '</a></li>';
		       }
		       iCount++;
		});
		
		htmlString2 = '<div class="panel"><form><input type="text"></form></div><p class="flip">Search by tag</p>';
		htmlString3 = '<div class="panel2"><form><input class="color" value="66ff00"></form></div><p class="flip2">Search by color</p></div>';
		
	    $('#lista').html(htmlString);
	    $('#tag-container').html(htmlString2);
	    $('#color-container').html(htmlString3);
	    $('#tag-container, #lista li, #color-container').hide();
		$('#lista li, #tag-container, #color-container').show(2000);
		
		$(".flip").click(function(){
			$(".panel").slideToggle("slow");
		});
		$(".flip2").click(function(){
			$(".panel2").slideToggle("slow");
		});
	}
});