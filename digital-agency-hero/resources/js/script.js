$(document).ready(function() {
  // Visual number counter
  $('.counter').counterUp({
    time: 1000
  });

  // Menu icon click handler
  $('.js--nav-icon, .js--logo, .js--main-nav a').click(function(e) {
    var $nav = $('.js--main-nav');
    var $icon = $('.js--nav-icon i');
    var $clicked = $(e.target);

    // Exit function if logo clicked and menu closed
    if ($clicked.hasClass('js--logo') && $icon.hasClass('fa-bars')) return;

    if ($(window).width() < 768) {
      // Toggle menu open and close
      $nav.slideToggle(200);

      // Set icon state
      if ($icon.hasClass('fa-bars')) {
        $icon.addClass('fa-times');
        $icon.removeClass('fa-bars');
        $icon.css('color', '#fff');
        $('nav').css('background-color', 'rgba(48, 52, 63, 0.7)');
      } else {
        $icon.addClass('fa-bars');
        $icon.removeClass('fa-times');
        $icon.css('color', '#30343f');
        $('nav').css('background-color', 'transparent');
      }
    }
  });

  // Resize window handler
  $(window).resize(function() {
    var $nav = $('.js--main-nav');
    var $icon = $('.js--nav-icon i');
    if ($(window).width() > 767) {
      $nav.css('display', 'block');
      $('nav').css('background-color', 'transparent');
    } else {
      $nav.css('display', 'none');
      $icon.addClass('fa-bars');
      $icon.removeClass('fa-times');
      $icon.css('color', '#30343f');
    }
  });
});
