function similaritySearch(event){
	var uri=event.data.uri;
	var url=event.data.url;
	$.fancybox.close( true );
	
	load();
	
	
	var parametri= 'imageURI=' + uri + '&outfmt=JSON';
	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbn?",parametri,displayImages);	
	
	
	droppable=$("#droppable");
	droppable.empty();
		
	//dimensioni rettangolo drop
	height=droppable.height();
	width=droppable.width();
		
	var img=new Image();
	img.src=url;
		
	if(img.height>=img.width){
		droppable.append('<img class="dropped" src="'+url+'" height="'+height+'"/>');
	} else {
		droppable.append('<img class="dropped" src="'+url+'" width="'+width+'"/>');
	}
}