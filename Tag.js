function RicercaTag() {
	valori = document.getElementById("autocomplete").value;
	vettore= valori.split(" ");
	tags= vettore.join(",");
	var parametri= 'tags=' + tags + '&outfmt=JSON';
	$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbt?",parametri,displayImages);
}