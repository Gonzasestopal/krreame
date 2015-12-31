$(document).ready(function() {

  // Initialize Masonry
  $('#content').masonry({
    columnWidth: 320,
    itemSelector: '.item',
    isFitWidth: true,
    isAnimated: !Modernizr.csstransitions
  }).imagesLoaded(function() {
    $(this).masonry('reload');
  });
  if (window.location.hash == '#_=_'){
    history.replaceState 
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
  };
  $('#1a').one('click', function() {
    FB.XFBML.parse(document.getElementById('1'))
  });
  $('#2a').one('click', function() {
    FB.XFBML.parse(document.getElementById('2'))
  });
  $('#3a').one('click', function() {
    FB.XFBML.parse(document.getElementById('3'))
  });
  $('#4a').one('click', function() {
    FB.XFBML.parse(document.getElementById('4'))
  });
  $('#5a').one('click', function() {
    FB.XFBML.parse(document.getElementById('5'))
  });
  $('#6a').one('click', function() {
    FB.XFBML.parse(document.getElementById('6'))
  });
  $('#7a').one('click', function() {
    FB.XFBML.parse(document.getElementById('7'))
  });
  $('#8a').one('click', function() {
    FB.XFBML.parse(document.getElementById('8'))
  });
  $('#9a').one('click', function() {
    FB.XFBML.parse(document.getElementById('9'))
  });
  $('#10a').one('click', function() {
    FB.XFBML.parse(document.getElementById('10'))
  });
});