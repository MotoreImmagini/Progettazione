function similaritySearch(event, uri, link){
	var droppable = document.getElementById("droppable"); 
	droppable.ondragover = function(event) {
    	return false;
	}
	droppable.ondrop=function(event){
		event.preventDefault();
		droppable=$("#droppable");
		droppable.empty();
		
		//dimensioni rettangolo drop
		height=droppable.height();
		width=droppable.width();
		
		var img=new Image();
		img.src=link;
		
		if(img.height>=img.width){
			droppable.append('<img class="dropped" src="'+link+'" height="'+height+'"/>');
		} else {
			droppable.append('<img class="dropped" src="'+link+'" width="'+width+'"/>');
		}
		var parametri= 'imageURI=' + uri + '&outfmt=JSON';
		$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbn?",parametri,displayImages);	
	}
	
}

