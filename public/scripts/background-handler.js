(function ($, _) {

	'use strict';

	$(document).ready(function () {
		
		var headerBackgrounds = $('.header-background');

		var backgroundInc = 0;

		function switchBackgrounds (currentBackgroundElement) {
			showBackground(headerBackgrounds[backgroundInc]);

			setTimeout(switchBackgrounds, 20000);
			
			backgroundInc = ((backgroundInc === headerBackgrounds.length - 1) ? 0 : (backgroundInc + 1));
		}

		function showBackground (backgroundElement) {
			headerBackgrounds.removeClass('show');
			$(backgroundElement).addClass('show');
		}

		switchBackgrounds(headerBackgrounds[0]);

	});

} (window.jQuery, window._));