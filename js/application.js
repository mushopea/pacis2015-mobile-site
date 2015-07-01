/*
 jQuery Mobile Boilerplate
 application.js
 */


$(document).ready(function() {
  $(".panzoom").panzoom();

  $('.programsdate').on('change', function(){
    if (this.selectedIndex !== 0) {
      var goTo = "#" + $(this).val();
      $("body").attr("go-to", goTo);
      window.location.href = window.location.pathname + goTo;
      $("." +  $(this).val()).attr('selected', 'selected');
    }
  });

  $(".go-to").on('click', function(e){
    e.preventDefault();
    $(this).removeClass('ui-btn-active');
    var goTo = $("body").attr("go-to") || "#programs";
    window.location.href = window.location.pathname + goTo;
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
