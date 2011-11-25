(function($){
	$.fn.lightBox = function(settings){
		
		settings= jQuery.extend({
			
			overlayBgColor: '#000',
			overlayOpacity: 0.8,
			//da rivedere
			fixedNavigation: false,
			
			imageLoading: 'loading.gif',
			imageBtnClose: 'close.gif',
			imageBlank: 'blank.gif',
			
			//da rivedere
			containerBorderSize: 10,
			containerResizeSpeed: 400,
			
			//da rivedere
			txtImage: 'Image',
			txtOf: 'of',
			
			//da scoprire come uscire con esc invece che con c
			keyToClose: 'c',
			
			//che roba è? dice "NON MODIFICARE"
			imageArray: [],
			activeImage: 0
		}, settings);
		
		//da scoprire °°
		var jQueryMatchedObj = this; // This, in this context, refer to jQuery object
		/**
		 * Initializing the plugin calling the start function
		 *
		 * @return boolean false
		 */
		function _initialize() {
			_start(this,jQueryMatchedObj); // This, in this context, refer to object (link) which the user have clicked
			return false; // Avoid the browser following the link
		};
		
		
		//iniziamo il Plugin jQuery
		function _start(objClicked,jQueryMatchedObj) {
		
		//questa serve a rendere invisibili alcuni elementi html (embed, object, select) che sennò in IE rompon le balle (se vogliamo farla più credibile forse è meglio non metterla)
		$('embed, object, select').css({ 'visibility' : 'hidden' });
		
		//scoprirò poi che cosa fa 'sta funzione
		_set_interface();
		
		//svuota imageArray
		settings.imageArray.length=0;
		//azzera image active
		settings.activeImage=0;
		
		//qui è dove controlla se ci sono immagini e le infila in un Array, mi pare almeno, non mi ci perdo, lo riguardiamo appena sappiamo almeno come prenderle le immagini XP
		
		// We have an image set? Or just an image? Let�s see it.
			if ( jQueryMatchedObj.length == 1 ) {
				settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
			} else {
				// Add an Array (as many as we have), with href and title atributes, inside the Array that storage the images references		
				for ( var i = 0; i < jQueryMatchedObj.length; i++ ) {
					settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));
				}
			}
			while ( settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href') ) {
				settings.activeImage++;
			}
			
			//funzione che prepara le immagini alla visualizzazione
			_set_image_to_view();
		};

/**questo è quello che infilo tra due secondi nella funzione _set_interface(), la cui funzione è inserire tutta questa pappardella nel tag body 
*Praticamente è l'html della "pagina" che facciamo apparire sopra alla pagina.
* PS: faccio copia-incolla perchè è lungo un sacco :D tolgo solo le referenze ai tasti che non ci sevono


		 * Create the jQuery lightBox plugin interface
		 *
		 * The HTML markup will be like that:
			<div id="jquery-overlay"></div>
			<div id="jquery-lightbox">
				<div id="lightbox-container-image-box">
					<div id="lightbox-container-image">
						<img src="../fotos/XX.jpg" id="lightbox-image">
						<div id="lightbox-nav">							
							<a href="#" id="lightbox-nav-btnPrev"></a>
							<a href="#" id="lightbox-nav-btnNext"></a>
						</div>
						<div id="lightbox-loading">
							<a href="#" id="lightbox-loading-link">
								<img src="../images/lightbox-ico-loading.gif">
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
								<img src="../images/lightbox-btn-close.gif">
							</a>
						</div>
					</div>
				</div>
			</div>
		 *
		 */
		
		//passiamo a cose più interessanti, le funzioni usate prima
		
		function _set_interface(){
			//aggiunge il markup html (jquery-overlay lo definisco dopo e mi crea uno stile css)
			$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div></div></div></div>');	
			
			//ottiene la dimensione della pagina
			var arrPageSizes = ___getPageSize();
			
			$('#jquery-overlay').css({
				backgroundColor:	settings.overlayBgColor,
				opacity:			settings.overlayOpacity,
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			
			//page scroll?????
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
		
		
	};
})(jQuery);