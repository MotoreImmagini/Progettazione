$(document).ready(function() {
  	
  	$.ajax({
		type: "GET",
		dataType: 'xml',
  		url:"http://shrek.micc.unifi.it:8080/daphnis/gettags",
  		success: vettore,
  	});
  	
  	function vettore(data) {
  		var imageTags=[];
  		var i=0;
		$(data).find('name').each(function(){
			imageTags[i]=$(this).text();
		i++;
		}); 
		$("input#autocomplete").autocomplete({
    		source: imageTags
		});
  	}
  });