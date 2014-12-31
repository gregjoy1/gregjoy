(function ($, _) {

	'use strict';

	$(document).ready(function () {
	
		var canvasElement = $('#header-canvas');

		var headerCanvas = new HeaderCanvas(canvasElement[0]);

	});

	var HeaderCanvas = function (canvasElement) {

		var _this = this;

		_this.canvasElement = null;
		_this.canvasContext = null;

		_this.canvasInitialised = false;

		_this.canvasWidth = 0;
		_this.canvasHeight = 0;

		_this.tmpX = 0;
		_this.tmpY = 0;

		_this.circles = [];

		_this.minCircleSize = 50;
		_this.maxCircleSize = 350;

		_this.tickCounter = 1;

		_this.initialise = function (canvasElement) {
			_this.canvasElement = canvasElement;
			_this.canvasContext = _this.canvasElement.getContext('2d');

			_this.initialiseCanvas(_this.getScreenWidth(), _this.getScreenHeight());

			_this.initialiseCircles(70);

			_this.update();
		};

		_this.initialiseCanvas = function (canvasWidth, canvasHeight) {
			if(!_this.canvasInitialised) {
				_this.setOnResizeListener();

				_this.canvasInitialised = true;
			}

			_this.canvasElement.width = _this.canvasWidth = canvasWidth;
			_this.canvasElement.height = _this.canvasHeight = canvasHeight;

		};

		_this.initialiseCircles = function (numberOfCircles) {

			_this.circles = [];

			for(var inc = 0; inc < numberOfCircles; inc++) {

				_this.circles.push(
					new HeaderCanvasCircle(
						_.random(_this.canvasWidth),
						_.random(_this.canvasHeight),
						_.random(_this.minCircleSize, _this.maxCircleSize),
						1,
						'rgb(' + _.random(255) + ', ' + _.random(255) + ', ' + _.random(255) + ')',
						0.6,
						100
					)
				);

			}

		};

		_this.getScreenWidth = function () {
			return $(window).width();
		};

		_this.getScreenHeight = function () {
			return $(window).height();
		};

		_this.setOnResizeListener = function () {
			$(window).on('resize', function () {
				_this.initialiseCanvas(_this.getScreenWidth(), _this.getScreenHeight());
			});
		};

		_this.update = function () {

			_this.render();

			window.requestAnimationFrame(_this.update);

			_this.tickCounter = (_this.tickCounter >= 240 ? 1 : _this.tickCounter + 1);
		};

		_this.render = function () {

			_this.canvasContext.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);

			_(_this.circles).each(function (circle) {

				if(_this.tickCounter === 1) {
					circle.changeLocation(_.random(-(_this.canvasWidth / 2), _this.canvasWidth), _.random(-(_this.canvasHeight / 2), _this.canvasHeight), 5);				
				}

				circle.update(_this.canvasContext);
			});

		};

		_this.initialise(canvasElement);

	};

	var HeaderCanvasCircle = function (x, y, radius, speed, color, alpha, blurRadius) {

		var _this = this;

		_this.circleX = 0;
		_this.circleY = 0;

		_this.circleSpeed = 0;

		_this.circleXSpeed = 0;
		_this.circleYSpeed = 0;
	
		_this.targetXPosition = 0;
		_this.targetYPosition = 0;

		_this.radius = undefined;
		_this.color = undefined;
		_this.alpha = undefined;

		_this.blurRadius = undefined;

		_this.imageData = undefined;

		_this.circleInitialised = false;

		_this.initialiseCircle = function (x, y, radius, speed, color, alpha, blurRadius) {
			_this.circleX = x;
			_this.circleY = y;
		
			_this.radius = radius;
			_this.color = color;
			_this.alpha = alpha;
			_this.circleSpeed = speed;
			_this.blurRadius = blurRadius;

			if(!_this.circleInitialised) {
				_this.circleInitialised = true;

				_this.imageData = _this.getImageData();
			}
		};

		_this.getImageData = function () {
			var circleRenderCanvasSize = (_this.blurRadius * 2) + _this.radius;

			var circleRenderCanvas = document.createElement('canvas');

			circleRenderCanvas.width = circleRenderCanvasSize;
			circleRenderCanvas.height = circleRenderCanvasSize;

			var circleRenderCanvasContext = circleRenderCanvas.getContext('2d');

			circleRenderCanvasContext.beginPath();
			
			circleRenderCanvasContext.arc(
				(_this.circleX + _this.blurRadius), 
				(_this.circleY + _this.blurRadius), 
				_this.radius, 
				0, 
				(2 * Math.PI), 
				false
			);

			circleRenderCanvasContext.fillStyle = _this.color;
			circleRenderCanvasContext.fill();

			stackBlurCanvasRGBA(circleRenderCanvas, 0, 0, circleRenderCanvasSize, circleRenderCanvasSize, _this.blurRadius);

			var image = new Image();

			// image.src = circleRenderCanvasContext.getImageData(0, 0, circleRenderCanvasSize, circleRenderCanvasSize);

			return circleRenderCanvasContext.getImageData(0, 0, circleRenderCanvasSize, circleRenderCanvasSize);

			// return image;
		};

		_this.update = function (canvasContext) {
			_this.moveToLocation();

			_this.render(canvasContext);
		};

		_this.render = function (canvasContext) {
			canvasContext.globalAlpha = _this.alpha;
			canvasContext.fillStyle = _this.color;
			canvasContext.fillRect(
				_this.circleX, 
				_this.circleY,
				_this.radius,
				_this.radius
			);
			// canvasContext.putImageData(_this.imageData, _this.circleX, _this.circleY);
			// canvasContext.drawImage(_this.imageData, _this.circleX, _this.circleY);
		};

		_this.moveToLocation = function () {

			if(_this.circleX > _this.targetXPosition) {
				_this.circleXSpeed = -_this.circleSpeed;
			} else if(_this.circleX < _this.targetXPosition) {
				_this.circleXSpeed = _this.circleSpeed;
			} else {
				_this.circleXSpeed = 0;
			}

			if(_this.circleY > _this.targetYPosition) {
				_this.circleYSpeed = -_this.circleSpeed;
			} else if(_this.circleY < _this.targetYPosition) {
				_this.circleYSpeed = _this.circleSpeed;
			} else {
				_this.circleYSpeed = 0;
			}

			_this.circleX = (_this.circleX + _this.circleXSpeed);
			_this.circleY = (_this.circleY + _this.circleYSpeed);

		};

		_this.changeLocation = function (xPos, yPos, speed) {
			_this.targetXPosition = xPos;
			_this.targetYPosition = yPos;

		};

		_this.initialiseCircle(x, y, radius, speed, color, alpha, blurRadius);

	};

} (window.jQuery, window._));