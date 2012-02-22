$(document).ready(function(){

	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/random?outfmt=JSON", displayImages);

	function displayImages(data) {
		var iStart = Math.floor(Math.random()*(8));
		var iCount = 0;
		
		var htmlString = [];
		
		$.each(data.results, function(i,item){
		    
		     
		       
		       htmlString += '<li><a class="fancybox" title="' + item.filename + '" rel="group" href="' + item.link + '" target="_blank">';
		       htmlString += '<img  src="' + item.thumbURL + '" height=37%' ;
		       htmlString += '" alt="'; htmlString += item.title + '" />';
		       htmlString += '</a></li>';
		       
		     
		});
		
	    $('#lista').html(htmlString);
	    $('#lista a').hide();
	    $('ul#lista').easyPaginate({
			step:10
		});
		$('#lista a').show(2000);
	}
});