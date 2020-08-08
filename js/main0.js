
//filter round button
$(function() {
  $('.toggle-btn').click(function() {
    $('.filter-btn').toggleClass('open');

  });

  $('.filter-btn a').click(function() {
    $('.filter-btn').removeClass('open');

  });

});

$('#all').click(function() {

  $('ul.tasks li').slideDown(300);

});

$('#one').click(function() {
  $('.tasks li:not(.one)').slideUp(300, function() {
    $('.one').slideDown(300);

  });
});

$('#two').click(function() {
  $('.tasks li:not(.two)').slideUp(300, function() {
    $('.two').slideDown(300);

  });
});
$('#three').click(function() {
  $('.tasks li:not(.three)').slideUp(300, function() {
    $('.three').slideDown(300);

  });
});

// Init fancyBox
$().fancybox({
  selector : '[data-fancybox="filter"]:visible',
  thumbs   : {
    autoStart : true
  }
});

// Show/hide selected links
$('#filter').on('change', function() {
  var $visible, val = this.value;

  if (val) {
    $visible = $('[data-fancybox="filter"]').hide().filter('.' + val);

  } else {
    $visible = $('[data-fancybox="filter"]');
  }

  $visible.show();
});
