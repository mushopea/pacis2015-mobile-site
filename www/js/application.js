/*
 jQuery Mobile Boilerplate
 application.js
 */

// Handler for navigating to the next page 
function navnext(next) {
  $(":mobile-pagecontainer").pagecontainer("change", "#" + next, {
    transition: "slide"
  });
}

// Handler for navigating to the previous page
function navprev(prev) {
  $(":mobile-pagecontainer").pagecontainer("change", "#" + prev, {
    transition: "slide",
    reverse: true
  });
}


$(document).ready(function() {
  $(".panzoom").panzoom();

  $(".goto").click(function(){
    $("body").attr("go-to", $(this).attr("href"));
  });

  $(".go-to").on('click', function(e){
    e.preventDefault();
    $(this).removeClass('ui-btn-active');
    var goTo = $("body").attr("go-to") || "#programs";
    window.location.href = window.location.pathname + goTo;
  });

  // Close the menu when click outisde
  $(document).click(function(event) {
    var div =  $('.nav > ul');
    if(!$(event.target).closest('.nav').length) {
      if($(div).is(":visible")) {
        $(div).hide()
      }
    }
  });

  // toggle the menu with the button
  $(".nav").on('click', function() {
    var div =  $('.nav > ul');
    div.fadeToggle();
  });


});


$(document).on("pagecreate", function() {
  // animate accordion
  $(".accordion-section .ui-collapsible-heading-toggle").on("click", function(e) {
    var current = $(this).closest(".ui-collapsible");
    if (current.hasClass("ui-collapsible-collapsed")) {
      //collapse all others and then expand this one (disable collapse temporarily)
      console.log("expanding and animating accordion");
      //$(".ui-collapsible").not(".ui-collapsible-collapsed").find(".ui-collapsible-heading-toggle").click();
      $(".ui-collapsible-content", current).slideDown(300);
    } else {
      $(".ui-collapsible-content", current).slideUp(300);
    }
  });

  $(document).on("collapsibleexpand", "[data-role=collapsible]", function () {
    var position = $(this).offset().top;
    console.log("Accordion scoll to " + position);
    $.mobile.silentScroll(position);
  });

});

// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$(document).one("pagecreate", "body", function() {
  // Navigate to the next page on swipeleft
  $(document).on("swipeleft", ".ui-page", function(event) {
    var next = $(this).jqmData("next");
    navnext(next);
  });

  // Navigate to the next page on swiperight
  $(document).on("swiperight", ".ui-page", function(event) {
    var prev = $(this).jqmData("prev");
    navprev(prev);
  });
});

$(document).on("pageshow", ".demo-page", function() {
  var thePage = $(this),
    title = thePage.jqmData("title"),
    next = thePage.jqmData("next"),
    prev = thePage.jqmData("prev");
  // Point the "Trivia" button to the popup for the current page.
  $("#trivia-button").attr("href", "#" + thePage.find(".trivia").attr("id"));
  // We use the same header on each page
  // so we have to update the title
  $("#header h1").text(title);
  // Prefetch the next page
  // We added data-dom-cache="true" to the page so it won't be deleted
  // so there is no need to prefetch it
  if (next) {
    $(":mobile-pagecontainer").pagecontainer("load", next + ".html");
  }
  // We disable the next or previous buttons in the footer
  // if there is no next or previous page
  // We use the same footer on each page
  // so first we remove the disabled class if it is there
  $(".next.ui-state-disabled, .prev.ui-state-disabled").removeClass("ui-state-disabled");
  if (!next) {
    $(".next").addClass("ui-state-disabled");
  }
  if (!prev) {
    $(".prev").addClass("ui-state-disabled");
  }
});

