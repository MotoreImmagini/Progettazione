$(document).ready(function(){
	
	$.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=998875@N22&lang=en-us&format=json&jsoncallback=?", displayImages);

	function displayImages(data) {
		var iStart = Math.floor(Math.random()*(8));
		var iCount = 0;

	    // Start putting together the HTML string
	    var htmlString = [];

    	// Now start cycling through our array of Flickr photo details
    	$.each(data.items, function(i,item){
    		
    		if (iCount > iStart && iCount < (iStart + 13)) {
       
       	 		// Here's where we piece together the HTML
     	  		htmlString += '<li><a href="' + item.link + '" target="_blank">';
      	  		htmlString += '<img title="' + item.title + '" src="' + item.media.m + '"width="15%"';
      	  		htmlString += '" alt="'; htmlString += item.title + '" />';
      	  		htmlString += '</a></li>';
      	  	}
      	  	iCount++;

   		});
   
    // Pop our HTML in the #images DIV
    $('#lista').html(htmlString);
   
    // Close down the JSON function call
	}
});