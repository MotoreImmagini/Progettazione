(function($){
	$.fn.caricaImm = function(){
		var dimensioni= [];
		
		$('#gallery, #Navcontainer').find('img').each(function() {
				
		  
		});
		
		//devo iterare e mettere w e h per ogni immagine in un array
		var intCurrentWidth = $('#contenitore').width();
		var intCurrentHeight = $('#contenitore').height();
		
		var intDiffW = intCurrentWidth - intWidth;
		var intDiffH = intCurrentHeight - intHeight;
		
		//da iterare per ogni immagine
		$('#contenitore').animate({ width: intWidth, height: intHeight },function() { $('#imageBox').fadeIn(); });
			if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
				if ( $.browser.msie ) {
					_pause(250);
				} else {
					_pause(100);	
				}
			} 
			
		};
		
		function _pause(ms) {
			var date = new Date(); 
			curDate = null;
			do { var curDate = new Date(); }
			while ( curDate - date < ms);
		 };
	};
})(jQuery);