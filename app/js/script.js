// Namespace
var THIV = THIV || {};

// Global Vars
var animationSpeed = 250;

// Tell the DOM that JS is enabled
document.body.className += ' js-enabled';

// Detect for Mouse vs. Keyboard events for accessibility helpers
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 9) {
    jQuery('html').addClass('keyboard-user');
  }
});

document.addEventListener('mousedown', function (e) {
  jQuery('html').removeClass('keyboard-user');
});


// Desktop Main Menu Hover Subnav
THIV.mainMenu = (function ($) {

  function init(){
    var $topMenu = $('#top-menu');
    var $topLevelLink = $topMenu.find('.menu-block-wrapper > .menu > li:not(:first-child)');

    // desktop hover link
    function submenuToggle() {

      if ( window.matchMedia('(min-width:1024px)').matches ) {
        $topLevelLink.on('mouseenter', function() {
          $(this).find('> .menu').addClass('active');
        });

        $topLevelLink.on('mouseleave', function() {
          $(this).find('> .menu').removeClass('active');
        });
      }

      else {
        $topLevelLink.off('mouseenter mouseleave');
      }

    }

    // accessibility, append toggle buttons
    $topLevelLink.each(function() {
      var $linkName = $(this).find('> a').text();
      $(this).append('<button class="toggle" aria-expanded="false"><span>Display</span> ' + $linkName + ' menu</button>');
    });

    $topLevelLink.find('button').on('click', function() {
      var $subMenu = $(this).siblings('.menu');

      if (!$subMenu.is('.active')) {
        $(this).attr('aria-expanded', 'true').find('span').text('Hide');
        $subMenu.addClass('active').find('> li:first-child > a').focus();
      }

      else {
        $(this).attr('aria-expanded', 'false').find('span').text('Display');
        $subMenu.removeClass('active');
      }

    });

    $(window).on('resize', function() {
      submenuToggle();
    });

    submenuToggle();

  }

  if($('#top-menu').length) {
    init();
  }



})(jQuery);


// Mobile Main Menu (hamburger)
THIV.mobileMainMenu = (function ($) {

  function init(){

    var $mobileToggle = $('.hamburger-menu');

    $mobileToggle.on('click', function(e) {
      e.preventDefault();

      if (!$(this).is('.active')) {
        $(this).addClass('active').attr('aria-expanded', 'true');
        $('body').addClass('mobile-nav-open');

        // close search bar if open
        if ($('body').is('.search-bar-open')) {
          $('.search-toggle').removeClass('active').attr('aria-expanded', 'false');
          $('body').removeClass('search-bar-open');
        }

      }
      else {
        $(this).removeClass('active').attr('aria-expanded', 'false');
        $('body').removeClass('mobile-nav-open');
      }

    });

  }

  if($('.hamburger-menu').length) {
    init();
  }

})(jQuery);


// Mobile Search Menu
THIV.mobileSearchMenu = (function ($) {

  function init(){

    var $searchToggle = $('.search-toggle');
    var $searchBar = $('#block-apachesolr-panels-search-form');
    var $searchInput = $searchBar.find('input[type=text]');

    // Add placeholder to search menu
    $searchInput.attr('placeholder', 'Search');

    $searchToggle.on('click', function(e) {
      e.preventDefault();

      if (!$(this).is('.active')) {
        $(this).addClass('active').attr('aria-expanded', 'true');
        $('body').addClass('search-bar-open');
        $searchInput.focus();
      }
      else {
        $(this).removeClass('active').attr('aria-expanded', 'false');
        $('body').removeClass('search-bar-open');
      }

    });

  }

  if($('.search-toggle').length) {
    init();
  }

})(jQuery);


// Sticky Nav

/**
* Navigation: Fix / Unfix on Scroll
*/
THIV.setStickyNav = (function ($) {

  function init(){

    // If window scroll position exceeds the top position of the header, fix the nav
    if ( $( window ).scrollTop() >= $('header#header #branding').outerHeight() + $('#console').outerHeight() ) {
      $('#top-menu').addClass('fixed');
      $('body').addClass('fixed-nav');
      } else {
      $('#top-menu').removeClass('fixed');
      $('body').removeClass('fixed-nav');
    }

  }

  // desktop only
  if ( window.matchMedia('(min-width:1024px)').matches ) {

    if($('#top-menu').length) {
      init();
    }

    $(window).on('scroll', init);

    $(window).on('resize', function() {
      if (Modernizr.pointerevents) {
        init();
      }
    });

  }

})(jQuery);


