$(function() {
  var oldState = $.support.transition;
  $.support.transition = false;
  $('#navbar li.dropdown.open .dropdown-toggle').dropdown('toggle');
  $('#navbar').collapse('hide');
  $.support.transition = oldState;
});
