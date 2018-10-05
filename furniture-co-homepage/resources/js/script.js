var doc = {};
$(document).ready(function() {
  doc.nav = $('.js--main-nav');
  doc.icon = $('.js--nav-icon i');
  doc.mobileBreakpoint = 768;

  // Smooth scrolling
  smoothScrolling();

  // Animate on scroll
  var animateWaypoint = animateOnScroll();

  // Categories showcase hover effect
  $('.js--categories-showcase li').on({
    mouseenter: function() {
      mouseEnterCategory($(this));
    },
    mouseleave: function() {
      mouseLeaveCategory($(this));
    }
  });

  // Display search bar
  $('.js--search-btn').on('click', e => handleSearchBarDisplay(e));

  // Sticky nav
  var stickyNavWaypoint = handleStickyNavDisplay();

  // Mobile nav
  $('.js--nav-icon, .js--main-nav a').on('click', handleMobileNavDisplay);

  // Resize window toggle main nav display
  $(window).resize(handleWindowResize);
});

function scrollbarWidth() {
  var div = $(
    '<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>'
  );
  // Append our div, do our calculation and then remove it
  $('body').append(div);
  var w1 = $('div', div).innerWidth();
  div.css('overflow-y', 'scroll');
  var w2 = $('div', div).innerWidth();
  $(div).remove();
  return w1 - w2;
}

function hasScrollbar() {
  return $(document).height() > $(window).height();
}

function getWindowWidth() {
  w = hasScrollbar() ? $(window).width() + scrollbarWidth() : $(window).width();
  return w;
}

function smoothScrolling() {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
}

function animateOnScroll() {
  return new Waypoint({
    element: $('.js--feature-boxes'),
    handler: function() {
      $('.js--feature-boxes').addClass('animated fadeInUp');
    },
    offset: '70%'
  });
}

function mouseEnterCategory($this) {
  $this
    .find('figcaption')
    .css({
      opacity: 1,
      display: 'none'
    })
    .animate(
      {
        opacity: 0
      },
      500
    );
}
function mouseLeaveCategory($this) {
  $this
    .find('figcaption')
    .css({
      opacity: 0,
      display: 'block'
    })
    .animate(
      {
        opacity: 1
      },
      500
    );
}

function handleSearchBarDisplay(e) {
  e.preventDefault();
  var windowWidth = getWindowWidth();
  $('.js--search-bar')
    .toggleClass('active')
    .focus();
}

function handleStickyNavDisplay() {
  return new Waypoint({
    element: $('.js--section-about'),
    handler: function(direction) {
      direction === 'down'
        ? $('nav').addClass('sticky')
        : $('nav').removeClass('sticky');
    },
    offset: 60
  });
}

function handleMobileNavDisplay() {
  var windowWidth = getWindowWidth();
  if (windowWidth < doc.mobileBreakpoint) {
    if (doc.icon.hasClass('fa-bars')) {
      doc.icon
        .addClass('fa-times')
        .removeClass('fa-bars')
        .css({
          position: 'fixed',
          right: '20px'
        });
      doc.nav.addClass('active activated');
    } else {
      doc.icon
        .addClass('fa-bars')
        .removeClass('fa-times')
        .css({
          position: 'absolute',
          right: '0'
        });
      doc.nav.removeClass('active');
    }
  }
}

function handleWindowResize() {
  var windowWidth = getWindowWidth();
  if (windowWidth < doc.mobileBreakpoint) {
    doc.nav.removeClass('active activated');
    doc.icon.addClass('fa-bars').removeClass('fa-times');
  }
}
