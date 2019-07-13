var yPos;
function handleShrink(){
  yPos = window.pageYOffset;
   if(yPos>=50)
  {
    $('header').addClass('scrolled');
  }
  else
  {
    $('header').removeClass('scrolled');
  }

}

function handleMenu(){
  $('.menu').slideToggle();
  $('.menu-button').html($('.menu-button').html() == '<i class="fa fa-bars"></i>' ? '<i class="fa fa-times" style="margin-right:1px;"></i>' : '<i class="fa fa-bars"></i>');
}

$('.menu-button').on('click', handleMenu);
$('.menu').on('click', function(){
  if($('.menu-button').is(':visible')){
    handleMenu();
  }
});


$(document).ready(function () {
		$(document).on("scroll", handleShrink);
    $(document).on("scroll", onScroll);
		//smoothscroll
		$('a[href^="#"]').on('click', function (e) {
				e.preventDefault();
				$(document).off("scroll", onScroll);

				$('a').each(function () {
						$(this).removeClass('active');
				})
				$(this).addClass('active');
				var target = this.hash,
						menu = target;
				$target = $(target);
				$('html, body').stop().animate({
						'scrollTop': $target.offset().top-90
				}, 500, 'swing', function () {
						window.location.hash = target-90;
						history.pushState({}, null, "./"+target);
						$(document).on("scroll", onScroll);
						$(document).on("scroll", handleShrink);
				});
		});
});

function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$('.menu > a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
						$('.menu > a').removeClass("active");
						currLink.addClass("active");
				}
				else{
						currLink.removeClass("active");
				}
		});
}

$('#raised').css('width', raisedMoney+'%');


// Countdown timer
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $('#days').text(days);
  $('#hours').text(hours);
  $('#minutes').text(minutes);
  $('#seconds').text(seconds);

  if (distance < 0) {
    clearInterval(x);
    $('#days').text(0);
    $('#hours').text(0);
    $('#minutes').text(0);
    $('#seconds').text(0);
  }
}, 1000);

$('#notify').on('click', function(){
  $('#notify').fadeOut(500);
});

function newsletter(e, form){
  $(form).children('input[type=submit]').prop('disabled','true');
  fetch('newsletter.php', {
    method: 'post',
    body: new FormData(form)
  }).then( response => {
    return response.text();
  }).then(text => {
    if(text === "success"){
      $(form).children('input').prop('disabled','true');
      $('#notify').html("<h3>Thanks!</h3><p>You've been added to the list.</p>");
    }
    else{
        $(form).children('input').removeAttr('disabled');
      $('#notify').html("<h3>Oops!</h3><p>Something went wrong, try again later.</p>");
    }
    $('#notify').fadeIn(500);
    setTimeout(function(){
      $('#notify').fadeOut(500);
    }, 4000);
  });
}

function airdrop(e, form){
  $('#notice').html("");
  $('#airdropsubmit').prop({'value':'Please wait..', 'disabled':'true'});
  fetch('airdrop.php', {
    method: 'post',
    body: new FormData(form)
  }).then( response => {
    return response.text();
  }).then(text => {
    if(text === "success"){
      $(form).children('input').prop('disabled','true');
      $('#airdropsubmit').prop('value','Thanks');
      $('#notice').html("<p>Your request has been placed.</p>");
    }
    else{
        $('#airdropsubmit').removeAttr('disabled');
        $('#airdropsubmit').prop('value','Try Again');
        $('#notice').html("<p style='color:#ff7d7d;font-size:0.8em'>Oops! Something went wrong, try again later.</p>");
    }
    $('#notify').fadeIn(500);
    setTimeout(function(){
      $('#notify').fadeOut(500);
    }, 4500);
  });
}

$('.faqbox > div').on('click', function(){
  $('.faqbox > div').removeClass('active');
  $(this).addClass('active');
});
