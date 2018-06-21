$(document).ready(function () {
	// Categories showcase hover effect
	$('.js--categories-showcase li').on({
		mouseenter: function () {
			$(this).find('figcaption').css({
				opacity: 1,
				display: 'none'
			}).animate({
				opacity: 0
			}, 500);
		},
		mouseleave: function () {
			$(this).find('figcaption').css({
				opacity: 0,
				display: 'block'
			}).animate({
				opacity: 1
			}, 500);
		}
	});

	// Display search bar
	$('.js--search-btn').on('click', function (e) {
		e.preventDefault();
		if (!$('.js--search-bar').hasClass('active')) {
			$('.js--search-bar').addClass('active');
			$('.js--search-bar').focus();
		};
	});

	// Smooth scrolling
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000, function () {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
					});
				}
			}
		});

	// Animate on scroll
	new Waypoint({
		element: $('.js--feature-boxes'),
		handler: function () {
			$('.js--feature-boxes').addClass('animated fadeInUp')
		},
		offset: '70%'
	});
});
