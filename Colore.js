			function RicercaColore() {
				droppable=$("#droppable");
				droppable.empty();
				droppable.append('<b id="scritta">Open an image to search by similarity: prewiew will be placed here.</b>');
				
				hex= document.getElementById("colore").value;
				d = convertiHEX(hex);
				var parametri= 'color=' + d + '&outfmt=JSON';
				$.getJSON("http://shrek.micc.unifi.it:8080/daphnis/qbc?",parametri,displayImages);
			}
			
			function convertiHEX(hex) {
			 	hex1 = hex;
			  	hex2 = levaprimo(hex1);
				dec = h2d(hex2);
				return dec;
			}
			
			function h2d(h) {return parseInt(h,16);}
			
			function levaprimo(str){
				len = str.length;
	    	    str = str.substring(1,len);
	        	return str;
			}