(function ($) {

  'use strict';

  $(document).ready(function () {

    // = = = = = =   = = = = = =   = = = = = = = = = =
    // H A N D L E   H E A D E R   B A C K G R O U N D
    // = = = = = =   = = = = = =   = = = = = = = = = =

    var headerBackgrounds = $('.header-background');
    var backgroundInc = 0;

    // Fade in the background once all the background images
    // have been loaded and cached.
    whenBackgroundImagesLoaded(headerBackgrounds, function () {
      switchBackgrounds(0);
    });

    // Recursive function for iterating over the header background elements
    // and showing them.
    function switchBackgrounds (timeoutOverride) {
      showBackground(headerBackgrounds[backgroundInc]);

      timeoutOverride = (timeoutOverride !== undefined ? timeoutOverride : 10000);

      setTimeout(switchBackgrounds, timeoutOverride);

      backgroundInc = ((backgroundInc === headerBackgrounds.length - 1) ? 0 : (backgroundInc + 1));
    }

    // Function for showing a new background image
    function showBackground (backgroundElement) {
      headerBackgrounds.removeClass('show');
      $(backgroundElement).addClass('show');
    }

    // Function for extracting the background image urls, and triggerring
    // a callback once all the images are loaded. This is to stop ugly
    // header background image loading.
    function whenBackgroundImagesLoaded(headerBackgrounds, callback) {
      var loadedImages = [];

      headerBackgrounds.map(function (inc, headerBackground) {
        // Create image element with the background-image url of all
        // the header background images. Once they have all loaded, 
        // call the provided callback function.
        var tmpImage = new Image();
        tmpImage.src = $(headerBackground).css('background-image').replace('url("', '').replace('")', '');

        $(tmpImage).ready(function () {
          loadedImages.push(this);

          // Checks if all the images have been loaded.
          if(loadedImages.length === headerBackgrounds.length) {
            callback();
          }
        });

      });
    }

    // = = = = = =   = = = =   = = = =
    // H A N D L E   M A I L   L I N K
    // = = = = = =   = = = =   = = = =

    // [ ᕤ ಠ (oo) ಠ ]ᕤ ︵ ¡ʇoq ɯɐds
    $('a.link.icon-mail').on('click', function () {
      this.href = this.href.replace(new RegExp('at', 'g'), '@').replace(new RegExp('dot', 'g'), '.');
    });

  });

} (window.jQuery));
