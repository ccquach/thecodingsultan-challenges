var doc = {};
$(document).ready(function () {
	doc.nav = $('.js--main-nav');
	doc.icon = $('.js--nav-icon i');
	doc.mobileBreakpoint = 550;

	// Smooth scrolling
	smoothScrolling();

	// Animate on scroll
	animateOnScroll();

	// Categories showcase hover effect
	handleShowcaseHover();

	// Display search bar
	handleSearchBarDisplay();


	// Mobile nav
	handleMobileNavDisplay();

	// Resize window toggle main nav display
	handleWindowResize();
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

function smoothScrolling() {
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
						}
					});
				}
			}
		});
}

function animateOnScroll() {
	var waypoint = new Waypoint({
		element: $('.js--feature-boxes'),
		handler: function () {
			$('.js--feature-boxes').addClass('animated fadeInUp');
		},
		offset: '70%'
	});
	return waypoint;
}

function handleShowcaseHover() {
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
}

function handleSearchBarDisplay() {
	$('.js--search-btn').on('click', function (e) {
		e.preventDefault();
		var windowWidth = getWindowWidth();
		if (!$('.js--search-bar').hasClass('active')) {
			if (windowWidth <= doc.mobileBreakpoint && doc.nav.css('display') !== 'none') {
				doc.nav.slideToggle(200);
				doc.icon.addClass('fa-bars').removeClass('fa-times');
			}
			$('.js--search-bar').addClass('active').focus();
		}
	});
}

function handleMobileNavDisplay() {
	$('.js--nav-icon, .js--logo, .js--main-nav a').click(function (e) {
		var windowWidth = getWindowWidth();
		var $clicked = $(e.target);

		if ($clicked.hasClass('js--logo') && doc.icon.hasClass('fa-bars')) return;

		if (windowWidth <= doc.mobileBreakpoint) {
			if ($('.search-bar').hasClass('active')) $('.search-bar').removeClass('active');

			doc.nav.slideToggle(200);

			if (doc.icon.hasClass('fa-bars')) {
				doc.icon.addClass('fa-times').removeClass('fa-bars');
			} else {
				doc.icon.addClass('fa-bars').removeClass('fa-times');
			}
		}
	});
}

function handleWindowResize() {
	$(window).resize(function () {
		var windowWidth = getWindowWidth();
		if (windowWidth > doc.mobileBreakpoint) {
			doc.nav.css('display', 'inline-block');
		} else {
			doc.nav.css('display', 'none');
			doc.icon.addClass('fa-bars').removeClass('fa-times');
		}
	});
}
