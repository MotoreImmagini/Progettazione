function RicercaTag() {
	droppable=$("#droppable");
	droppable.empty();
	droppable.append('<b id="scritta">Open an image to search by similarity: preview will be placed here.</b>');
	load();
	
	valori = document.getElementById("tags").value;
if (valori.substring(valori.length-2,valori.length)==', ') 
  {
  valori= valori.substring(0,valori.length-2);
  }
  if (valori.substring(valori.length-1,valori.length)==',') 
  {
  valori= valori.substring(0,valori.length-1);
  }
	var parametri= 'tags=' + valori + '&outfmt=JSON';
	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbt?",parametri,displayImages);
}