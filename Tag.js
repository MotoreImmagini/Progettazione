function RicercaTag() {
	droppable=$("#droppable");
	droppable.empty();
	droppable.append('<b>DROP HERE<b>');	
	
	valori = document.getElementById("autocomplete").value;
	vettore= valori.split(" ");
	tags= vettore.join(",");
	var parametri= 'tags=' + tags + '&outfmt=JSON';
	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbt?",parametri,displayImages);
}