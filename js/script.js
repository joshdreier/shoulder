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


// Global Accordion
THIV.accordion = (function ($) {

  function init(){

    var $accordionToggle = $('button.accordionnew');

    // unwrap <p> if wrapped
    if ($accordionToggle.parent().is('p') ) {
      $accordionToggle.unwrap();
    }

    // open/close accordion
    $accordionToggle.on('click', function(e) {

      if (!$(this).is('.active')) {
        $(this).addClass('active').attr('aria-expanded', 'true');
        $(this).next('.accordionpanel').slideDown(animationSpeed);
      }
      else {
        $(this).removeClass('active').attr('aria-expanded', 'false');
        $(this).next('.accordionpanel').slideUp(animationSpeed);
      }

    });

  }

  if($('button.accordionnew').length) {
    init();
  }

})(jQuery);


// Libary Accordion
THIV.libraryAccordion = (function ($) {

  function init(){

    var $accordionItem = $('.accordion-item');

    // append toggle button to library accordion items
    $('.library-landing .accordion-item').each(function() {
      $(this).prepend('<button class="toggle" aria-expanded="false">Toggle Menu</button>');
    });

    // wrap TA accordion title in button
    $('.ta-accordion .item-list > h3').wrap('<button class="toggle accordionnew" aria-expanded="false"></button>');

    // open/close accordion
    $(document).on('click', '.toggle', function(){

      if (!$(this).is('.active')) {
        $(this).addClass('active').attr('aria-expanded', 'true');
        $(this).siblings('ul').slideDown(animationSpeed);
      }
      else {
        $(this).removeClass('active').attr('aria-expanded', 'false');
        $(this).siblings('ul').slideUp(animationSpeed);
      }

    // Expand All Button
    }).on('click', '.expand-all', function(){

      if (!$(this).is('.active')) {

        $(this).text('- Collapse all').addClass('active').attr('aria-expanded', 'true');

        $accordionItem.each(function() {
          $(this).find('.toggle').addClass('active').attr('aria-expanded', 'true');
          $(this).find('ul').slideDown(animationSpeed);
        });

      }
      else {

        $(this).text('+ Expand all').removeClass('active').attr('aria-expanded', 'false');

        $accordionItem.each(function() {
          $(this).find('.toggle').removeClass('active').attr('aria-expanded', 'false');
          $(this).find('ul').slideUp(animationSpeed);
        });

      }

    });

  }

  if($('.library-landing, .ta-accordion').length) {
    init();
  }

})(jQuery);



// Calendar scripts
THIV.calendar = (function ($) {

  function init(){

    // hide filter button if empty
    $calContainer = $('.view-calendar');
    $calFilters = $calContainer.find('.view-filters');

    if ($calFilters.find('.element-hidden').length) {
      $calFilters.hide();
    }

   }

  if($('.view-calendar').length) {
    init();
  }

})(jQuery);



// Twitter scripts
THIV.twitter = (function ($) {

  function init(){

    // hide filter button if empty
    $twitterFeed = $('.twitter-feed');

    $twitterFeed.find('.title').append('<div class="more-link"><a href="https://twitter.com/ryanwhitecare" target="_blank">View more</a><div>');

   }

  if($('.twitter-feed').length) {
    init();
  }

})(jQuery);



// Responsive Tables, Use data attribute
THIV.respsonsiveTables = (function ($) {

  function init(){

    var $table = $('.content-main table');

    $table.each(function() {

      var headertext = [];
      var $headers = $(this).find('tr:first-child td, tr:first-child th');
      var $tableRow = $(this).find('tr');

      $headers.each(function(i) {
        headertext.push($(this).text().trim());
      });

      $tableRow.each(function() {
        $(this).find('td').each(function(i) {
          $(this).attr('data-label', headertext[i]);
        });
      });

    });

  }

  if($('.content-main table').length) {
    init();
  }

})(jQuery);


// GoogleMaps, add Alt tags
THIV.leafletMap = (function ($) {

  function init(){

    // find images without ALT attribute, and set to Title Attribute
    $('#leaflet-map').find('img:not([alt])').each(function() {
      $(this).attr('alt', $(this).attr('title'));
    });
  }

  if($('#leaflet-map').length) {

    // delay for API
    setTimeout(function(){
      init();
    }, 1000);

  }

})(jQuery);


// Read More, ARIA
THIV.readMore = (function ($) {

  function init(){

    var $linkField = $('.more-link, .homepage-hero-link');

    $linkField.each(function () {
      // first, try to apply sibling title
      var $headerElement = $(this).siblings('h1, h2, h3, h4, h5, h6');

      // second, try to apply parent's sibling title
      if (!$headerElement.length > 0) {
        $headerElement = $(this).parent().siblings('h1, h2, h3, h4, h5, h6');
      }

      // third, try to apply parent's sibling's child's title
      if (!$headerElement.length > 0) {
        $headerElement = $(this).parent().siblings().find('h1, h2, h3, h4, h5, h6');
      }

      // fourth try to apply panel pane title
      if (!$headerElement.length > 0) {
        $headerElement = $(this).parents('.panel-pane').find('h1, h2, h3, h4, h5, h6');
      }

      // fifth, try to apply sibling's child's title
      if (!$headerElement.length > 0) {
        $headerElement = $(this).siblings().find('h1, h2, h3, h4, h5, h6');
      }

      var $headerText = $headerElement.eq(0).text();
      var $link = $(this).find('a');
      var $linkText = $link.clone().children().remove().end().text();
      var $helperText = ' about ';

      var $ariaText = $linkText + $helperText + $headerText;
      $link.attr('aria-label', $ariaText);
    });

    // if homepage hero image, remove link from keyboards

    if($('.homepage-hero-image').length) {
      $('.homepage-hero-image').find('a').attr({'aria-hidden': 'true', 'tabindex': '-1'});
    }

  }

  if($('.more-link').length) {

    // delay for API
    setTimeout(function(){
      init();
    }, 50);

  }

})(jQuery);

// Program Database, Hide Download button if empty results
THIV.programDB = (function ($) {

  function init(){

    $programDownload = $('.program-db-download');
    $orgsView = $('.view-organizations')

    if($orgsView.find('.view-empty').length) {
      $programDownload.hide();
    }

  }

  if($('.program-db-download').length) {
    init();
  }

})(jQuery);

// Find Empty Buttons, and fill with Text, caused by adding default values
THIV.emptyButtons = (function ($) {

  function init(){

    $buttonText = $('.button-container').find('span').first();

    if($.trim($buttonText.html())=='') {
      $buttonText.html('Visit Website');
    }

  }

  if($('.button-container').length) {
    init();
  }

})(jQuery);


