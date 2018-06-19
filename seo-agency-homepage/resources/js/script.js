var proj = {};
$(document).ready(function () {
	proj.nav = $('.js--main-nav');
	proj.icon = $('.js--nav-icon i');

	// Testimonials slider
	$('.quotes-slider').slick({
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false,
		dots: true
	});

	// Mobile nav display
	$('.js--nav-icon, .js--logo, .js--main-nav a').click(function (e) {
		var windowWidth = getWindowWidth();
		var $clicked = $(e.target);
		if ($clicked.hasClass('js--logo') && proj.icon.hasClass('fa-bars')) return;

		if (windowWidth < 768) {
			proj.nav.slideToggle(200);

			if (proj.icon.hasClass('fa-bars')) {
				proj.icon.addClass('fa-times');
				proj.icon.removeClass('fa-bars');
			} else {
				proj.icon.addClass('fa-bars');
				proj.icon.removeClass('fa-times');
			}
		}
	});

	// Resize window toggle main nav display
	$(window).resize(function () {
		var windowWidth = getWindowWidth();
		if (windowWidth >= 768) {
			proj.nav.css('display', 'block');
			$('nav').css('background-color', 'transparent');
		} else {
			proj.nav.css('display', 'none')
			proj.icon.addClass('fa-bars');
			proj.icon.removeClass('fa-times');
		}
	});

	// Animations

	// Animate on scroll
	new Waypoint({
		element: $('.js--wp-features'),
		handler: function () {
			$('.js--wp-features').addClass('animated fadeIn');
		},
		offset: '50%'
	});

	// Animate on button hover
	$('.btn').hover(
		function () {
			$(this).addClass('animated pulse');
		},
		function () {
			$(this).removeClass('animated pulse');
		}
	);

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
});

function scrollbarWidth() {
	var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
	// Append our div, do our calculation and then remove it 
	$('body').append(div);
	var w1 = $('div', div).innerWidth();
	div.css('overflow-y', 'scroll');
	var w2 = $('div', div).innerWidth();
	$(div).remove();
	return (w1 - w2);
}

function hasScrollbar() {
	return $(document).height() > $(window).height();
}

function getWindowWidth() {
	w = hasScrollbar() ?
		$(window).width() + scrollbarWidth() :
		$(window).width();
	return w;
}
