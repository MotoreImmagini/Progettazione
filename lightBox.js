(function($){
	$.fn.lightBox = function(settings){
		
		settings= jQuery.extend({
			
			overlayBgColor: '#000',
			overlayOpacity: 0.8,
			
			imageLoading: 'loading.gif',
			imageBtnClose: 'close.gif',
			imageBlank: 'blank.gif',
			
			containerBorderSize: 10,	//bordo bianco intorno all'immagine
			containerResizeSpeed: 400,	//il tempo che ci mette il riquadro contenente l'immagine ad assumere le dimensioni per contenere l'immagine
			
			//serve per immagazzinare le info delle immagini
			imageArray: [],
			activeImage: 0	//è un indice inizializzato a 0
		}, settings);
		
		//jQueryMatchedObj è in generale l'oggetto su cui viene invocato il plugin, in particolare noi dobbiamo invocarlo sulla galleria (che lui credo veda come un array)
		var jQueryMatchedObj = this; // This, in this context, refer to jQuery object  the plugin was invoked on
		/**
		 * Initializing the plugin calling the start function
		 * @return boolean false
		 */
		function _initialize() {
			_start(this,jQueryMatchedObj); // This, in this context, refer to object (link) which the user have clicked
			return false; // Avoid the browser following the link
		};
		
		
		//iniziamo il Plugin jQuery
		function _start(objClicked,jQueryMatchedObj) {
		
		//questa serve a rendere invisibili alcuni elementi html (embed, object, select) che sennò in IE rompon le balle 
		$('embed, object, select').css({ 'visibility' : 'hidden' });
		
		//crea praticamente la pagina in cui è mostrata l'immagine
		_set_interface();
		
		//svuota imageArray
		settings.imageArray.length=0;
		//azzera activeImage
		settings.activeImage=0;
		
		/**controlla se jQueryMatchedObj è composto da una sola immagine o da più immagini. 
		* con una sola immagine prende l'indirizzo e il titolo e li mette in imageArray
		* con più di una immagine scandisce tutto il jQueryMatchedObj e via via mette indirizzo e titolo di ogni immagine in imageArray
		*/
		
		// We have an image set? Or just an image? Let�s see it.
			if ( jQueryMatchedObj.length == 1 ) {
				settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
			} else {
				// Add an Array (as many as we have), with href and title atributes, inside the Array that storage the images references		
				for ( var i = 0; i < jQueryMatchedObj.length; i++ ) {
					settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));
				}
			}
			//per ogni coppia di elementi in imageArray controlla il primo elemento (l'indirizzo) e guarda se è uguale all'indirizzo dell'oggetto cliccato. Se è diverso passa all'elemento seguente
			//praticamente cerca, in imageArray, l'immagine selezionata
			while ( settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href') ) {
				settings.activeImage++;
			}
			
			//funzione che prepara le immagini alla visualizzazione
			_set_image_to_view();
		};

/**questo è quello che infilo tra due secondi nella funzione _set_interface(), la cui funzione è inserire tutta questa pappardella nel tag body 
*Praticamente è l'html della "pagina" che facciamo apparire sopra alla pagina.
* PS: l'ho lasciato tutto, tanto è un commento, è giusto per avere un'idea


		 * Create the jQuery lightBox plugin interface
		 *
		 * The HTML markup will be like that:
<div id="jquery-overlay"></div>
<div id="jquery-lightbox">
	<div id="lightbox-container-image-box">
		<div id="lightbox-container-image">
			<img id="lightbox-image">
			<div style="" id="lightbox-nav">
				<a href="#" id="lightbox-nav-btnPrev"></a>
				<a href="#" id="lightbox-nav-btnNext"></a>
			</div>
			<div id="lightbox-loading">
				<a href="#" id="lightbox-loading-link">
					<img src="' + settings.imageLoading + '">
				</a>
			</div>
		</div>
	</div>
	<div id="lightbox-container-image-data-box">
		<div id="lightbox-container-image-data">
			<div id="lightbox-image-details">
				<span id="lightbox-image-details-caption"></span>
				<span id="lightbox-image-details-currentNumber"></span>
			</div>
			<div id="lightbox-secNav">
				<a href="#" id="lightbox-secNav-btnClose">
					<img src="' + settings.imageBtnClose + '">
				</a>
			</div>
		</div>
	</div>
</div>
		 *
		 */
		
		//passiamo a cose più interessanti, le funzioni usate prima
		
		
		//in lightbox-image-details ci dovremo mettere i tag e la geolocalizzazione, quindi l'ho lasciato anche se per ora è vuoto
		function _set_interface(){
			//aggiunge il markup html (jquery-overlay lo vediamo dopo e mi crea uno stile css)
			$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div></div></div></div>');	
			
			//ottiene la dimensione della pagina
			var arrPageSizes = ___getPageSize();
			
			$('#jquery-overlay').css({
				backgroundColor:	settings.overlayBgColor,
				opacity:			settings.overlayOpacity,
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			
			//in virtù del fatto che non abbiamo scroll, presumo che non serva, ma eventualmente lo cancellerò più avanti
			var arrPageScroll = ___getPageScroll();
			
			//questa serve a centrare l'immagine da aprire
			$('#jquery-lightbox').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			}).show();
			
			//questo invece è per far chiudere l'immagine ingrandita se clicchi fuori dall'immagine
			$('#jquery-overlay,#jquery-lightbox').click(function() {
				_finish();
			});
			
			//questa è per chiudere anche se clicchi sull'immagine di loading o sul tasto close
			$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
				_finish();
				return false;
			});
			
			//nel caso che venga ridimensionata la pagina mentre è aperto l'immagine bisogna ridimensionare di nuovo tutto come prima
			$(window).resize(function() {
				// Get page sizes
				var arrPageSizes = ___getPageSize();
				// Style overlay and show it
				$('#jquery-overlay').css({
					width:		arrPageSizes[0],
					height:		arrPageSizes[1]
				});
				// Get page scroll
				var arrPageScroll = ___getPageScroll();
				// Calculate top and left offset for the jquery-lightbox div object and show it
				$('#jquery-lightbox').css({
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				});
			});
		}		
		
		//prepariamo l'esibizione dell'immagine	
		function _set_image_to_view() {
			$('#lightbox-loading').show();
			$('#lightbox-image,#lightbox-container-image-data-box').hide();
			
			
			//creo un oggetto immagine, gli assegno l'indirizzo dell'immagine da aprire e faccio il ridimenzionamento del boc che la conterrà
			var objImagePreloader = new Image();
			
			jQuery(objImagePreloader).bind("load", function(){
				$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);
				// Perfomance an effect in the image container resizing it
				_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
				//	clear onLoad, IE behaves irratically with animated gifs otherwise
				jQuery(objImagePreloader).bind("load", function(){});
			});
			objImagePreloader.src = settings.imageArray[settings.activeImage][0];
		};
		
		//Questo pezzo ci fa la "fighissima" animazione di ridimensionamento quando apri l'immagine
		function _resize_container_image_box(intImageWidth,intImageHeight) {
			// Get current width and height
			var intCurrentWidth = $('#lightbox-container-image-box').width();
			var intCurrentHeight = $('#lightbox-container-image-box').height();
			// Get the width and height of the selected image plus the padding
			var intWidth = (intImageWidth + (settings.containerBorderSize * 2)); // Plus the image�s width and the left and right padding value
			var intHeight = (intImageHeight + (settings.containerBorderSize * 2)); // Plus the image�s height and the left and right padding value
			// Diferences
			var intDiffW = intCurrentWidth - intWidth;
			var intDiffH = intCurrentHeight - intHeight;
			// Perfomance the effect
			$('#lightbox-container-image-box').animate({ width: intWidth, height: intHeight },settings.containerResizeSpeed,function() { _show_image(); });
			if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
				if ( $.browser.msie ) {
					___pause(250);
				} else {
					___pause(100);	
				}
			} 
			$('#lightbox-container-image-data-box').css({ width: intImageWidth });
		};
		
		//Mostra l'immagine 
		function _show_image() {
			$('#lightbox-loading').hide();
			$('#lightbox-image').fadeIn(function() {
				_show_image_data();
				_enable_keyboard_navigation();
			});
			
		};
		
		//Mostrerà i tag 
		function _show_image_data() {
			$('#lightbox-container-image-data-box').slideDown('fast');
				
		}
		
		//la funzione per abilitare la navigazione da tastiera
		function _enable_keyboard_navigation() {
			$(document).keydown(function(objEvent) {
				_keyboard_action(objEvent);
			});
		}
		
		//disabilita la navigazione da tastiera
		function _disable_keyboard_navigation() {
			$(document).unbind();
		}
		
		//definizione di _keyboard_action che ci dice cosa fanno i tasti (la prima parte mi è abbastanza oscura in reatà)
		function _keyboard_action(objEvent) {
			// To ie
			if ( objEvent == null ) {
				keycode = event.keyCode;
				escapeKey = 27;
			// To Mozilla
			} else {
				keycode = objEvent.keyCode;
				escapeKey = objEvent.DOM_VK_ESCAPE;
			}
			// Get the key in lower case form
			key = String.fromCharCode(keycode).toLowerCase();
			// Verify the keys to close the ligthBox
			if ( keycode == 27  ) {
				_finish();
			}
			
		}
		
		//fa chiudere il plugin eliminando quindi il markup html
		function _finish() {
			$('#jquery-lightbox').remove();
			$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
			// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'visible' });
		}
		
		//funzione per ottenere la dimensione della pagina
		function ___getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				if(document.documentElement.clientWidth){
					windowWidth = document.documentElement.clientWidth; 
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			// for small pages with total height less then height of the viewport
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < windowWidth){	
				pageWidth = xScroll;		
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
			return arrayPageSize;
		};
		
		//pagescroll (??)
		function ___getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;	
			}
			arrayPageScroll = new Array(xScroll,yScroll);
			return arrayPageScroll;
		};
		
		//funzione pausa, anche se non mi è chiara l'utilità
		function ___pause(ms) {
			var date = new Date(); 
			curDate = null;
			do { var curDate = new Date(); }
			while ( curDate - date < ms);
		 };
		 
		 //questa è un po' una finezza, ma è buona norma far così con i plugin
		 // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
		return this.unbind('click').click(_initialize);
	};
})(jQuery);