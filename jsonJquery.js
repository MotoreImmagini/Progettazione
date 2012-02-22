$(document).ready(function(){

	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/random?outfmt=JSON", displayImages);

	function displayImages(data) {
		var iStart = Math.floor(Math.random()*(8));
		var iCount = 0;
		
		var htmlString = [];
		
		$.each(data.results, function(i,item){
		    
		     if (iCount > iStart && iCount < (iStart + 13)) {
		       
		       htmlString += '<li><a class="image" href="' + item.thumbURL + '" target="_blank">';
		       htmlString += '<img title="' + item.title + '" src="' + item.link + '" height=35%' ;
		       htmlString += '" alt="'; htmlString += item.title + '" />';
		       htmlString += '</a></li>';
		       }
		       iCount++;
		});
		
	    $('#lista').html(htmlString);
	    $('#lista a').hide();
	    $('ul#lista').easyPaginate({
			step:12
		});
		$('#lista a').show(2000);
	}
});