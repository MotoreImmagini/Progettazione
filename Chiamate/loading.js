function load(){

	$('#navcontainer').empty();
	$('#navcontainer').block({ 
            message: '<img alt="" src="loading/loading.gif" width="40%"/>', 
            fadeIn: 0,
            css: { 
            	width: '10%',
            	heigth: '15%',
            	top: '20%',
            	border: 'none', 
            	padding: '15px', 
            	backgroundColor: '#000', 
            	'-webkit-border-radius': '10px', 
            	'-moz-border-radius': '10px',
            	opacity: 1
            	 
            },
      
   			centerX: true, 
   			centerY: false,
   			timeout: 0,
   			showOverlay: false
	}); 
}