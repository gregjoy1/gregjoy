(function ($) {

	'use strict';

	$(document).ready(function () {

		// = = = = = =   = = = = = =   = = = = = = = = = =		
		// H A N D L E   H E A D E R   B A C K G R O U N D		
		// = = = = = =   = = = = = =   = = = = = = = = = =		
		
		var headerBackgrounds = $('.header-background');

		var backgroundInc = 0;

		function switchBackgrounds (timeoutOverride) {
			showBackground(headerBackgrounds[backgroundInc]);

			timeoutOverride = (timeoutOverride !== undefined ? timeoutOverride : 10000);

			setTimeout(switchBackgrounds, timeoutOverride);
			
			backgroundInc = ((backgroundInc === headerBackgrounds.length - 1) ? 0 : (backgroundInc + 1));
		}

		function showBackground (backgroundElement) {
			headerBackgrounds.removeClass('show');
			$(backgroundElement).addClass('show');
		}

		switchBackgrounds(0);

		// = = = = = =   = = = =   = = = =
		// H A N D L E   M A I L   L I N K
		// = = = = = =   = = = =   = = = =

		// [ ᕤ ಠ (oo) ಠ ]ᕤ ︵ ¡ʇoq ɯɐds
		$('a.link.icon-mail').on('click', function (event) {
			this.href = this.href.replace(new RegExp('at', 'g'), '@').replace(new RegExp('dot', 'g'), '.');
		});

	});

} (window.jQuery));