(function ($) {

	'use strict';

	$(document).ready(function () {
		
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

	});

} (window.jQuery));