(function($){
	$.fn.lightBox = function(opzioni){
		
		opzioni=jQuery.extend({
		
			coloreOverlay: '#000',
			opacitaOverlay: 0.8,
		
			immagineCaricamento: 'loading.gif',
			immagineChiusura: 'close.gif',
			immagineBianca: 'blank.gif',
		
			bordoContenitore: 10,
			velocitaRidimensionamento: 400,		
			
			indirizzo: null,
			
		}, opzioni);
		
		function _inizializza(){
			
			_start(this);
			return false;
		};
		
		function _start(oggettoCliccato){
			
			//crea la pagina in cui è mostrata l'immagine
			_crea_interfaccia();
			
			opzioni.indirizzo=null;
			opzioni.indirizzo = oggettoCliccato.getAttribute('href');
			
			//prepara l'immagine alla visualizzazione
			_prepara_immagine();
		};
		
		/**adesso dobbiamo aggiungere l'html necessario alla creazione dell'interfaccia:
		
		<div id="overlay"></div>
		<div id="lightbox">
			<div id="scatola-contenitore-immagine">
				<div id="contenitore-immagine">
					<img id="immagine">
					<div id="caricamento">
						<a href="#" id="immagine-caricamento">
							<img src="' + opzioni.immagineCaricamento + '">
						</a>
					</div>
				</div>
			</div>
			<div id="scatola-contenitore-dati">
				<div id="contenitore-dati">
					<div id="funzioni">
		
					</div>
					<div id="contenitore-chiusura">
						<a href="#" id="chiusura">
							<img src="' + opzioni.immagineChiusura + '">
						</a>
					</div>
				</div>
			</div>
		</div>
		 */
		
		function _crea_interfaccia(){
			$('body').append('<div id="overlay"></div><div id="lightbox"><div id="scatola-contenitore-immagine"><div id="contenitore-immagine"><img id="immagine"><div id="caricamento"><a href="#" id="immagine-caricamento"><img src="' + opzioni.immagineCaricamento + '"></a></div></div></div><div id="scatola-contenitore-dati"><div id="contenitore-dati"><div id="funzioni"></div><div id="contenitore-chiusura"><a href="#" id="chiusura"><img src="' + opzioni.immagineChiusura + '"></a></div></div></div></div>');

			var arrDimensionePagina = _getDimensionePagina();
			
			$('#overlay').css({
				backgroundColor: 	opzioni.coloreOverlay,
				opacity:			opzioni.opacitaOverlay,
				width:				arrDimensionePagina[0],
				height:				arrDimensionePagina[1]
			}).fadeIn();
			
			
			
			$('#lightbox').css({
				top:	arrDimensionePagina[1] / 10,
			}).show();
			
			$('#overlay,#lightbox').click(function() {
				_fine();
			});
			$('#chiusura').click(function() {
				_fine();
				return false;
			});
			
			//se viene ridimensionata la finestra
			$(window).resize(function() {
				// Get page sizes
				var arrDimensionePagina = _getDimensionePagina();
				// Style overlay and show it
				$('#overlay').css({
					width:		arrDimensionePagina[0],
					height:		arrDimensionePagina[1]
				});
				// Get page scroll
				
				// Calculate top and left offset for the jquery-lightbox div object and show it
				$('#lightbox').css({
					top:	arrDimensionePagina[1] / 10
				});
			});
			
		};
		
		function _prepara_immagine(){
			
			$('#immagine,#scatola-contenitore-dati').hide();
			
			var futuraImmagine = new Image();
			
			jQuery(futuraImmagine).bind('load', function() {
				$('#immagine').attr('src',opzioni.indirizzo);
				_ridimensiona_scatola_contenitore_immagine(futuraImmagine.width, futuraImmagine.height);
				
			});
			
			futuraImmagine.src = opzioni.indirizzo;
		};
		
		function _ridimensiona_scatola_contenitore_immagine(larghezza, altezza){
			
			var larghezzaFinale = (larghezza + (opzioni.bordoContenitore * 2));
			var altezzaFinale = (altezza + (opzioni.bordoContenitore * 2));
		
			$('#scatola-contenitore-immagine').animate({width: larghezzaFinale, height: altezzaFinale}, opzioni.velocitaRidimensionamento, function(){_mostra_immagine();});
			$('#scatola-contenitore-dati').css({width: larghezza});
		};
		
		function _mostra_immagine(){
			$('#caricamento').hide();
			
			$('#immagine').fadeIn(function(){
				$('#scatola-contenitore-dati').slideDown('fast');
			});
		};
		
		function _fine(){
			$('#lightbox').remove();
			$('#overlay').fadeOut(function(){$('#overlay').remove();});
		};	
	
		function _getDimensionePagina() {
			
			var xScroll = document.body.scrollWidth;
			var yScroll = document.body.scrollHeight;
			
			var	larghezzaFinestra = window.innerWidth;
			var	altezzaFinestra = window.innerHeight;
			
			if(yScroll < altezzaFinestra){
				altezzaPagina = altezzaFinestra;
			} else { 
				altezzaPagina = yScroll;
			}
			if(xScroll < larghezzaFinestra){	
				larghezzaPagina = xScroll;		
			} else {
				larghezzaPagina = larghezzaFinestra;
			}
			

			arrayDimensionePagina = new Array(larghezzaPagina, altezzaPagina);
			return arrayDimensionePagina;
		};
		
		
		return this.unbind('click').click(_inizializza);
	};
})(jQuery);
