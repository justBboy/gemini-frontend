// hero img animation
$(window).scroll(function(){
  var offset=$('.hero-img').offset().top; ;
  var height = $('.hero-img').height();
  if($(window).scrollTop()< offset){$('.hero-img img').css('transform','scale(1)');}
  if($(window).scrollTop()> offset + (height/10)){$('.hero-img img').css('transform','scale(1.12)');}
  if($(window).scrollTop()> offset + (height/8)){$('.hero-img img').css('transform','scale(1.14)');}
  if($(window).scrollTop()> offset + (height/6)){$('.hero-img img').css('transform','scale(1.16)');}
  if($(window).scrollTop()> offset + (height/4)){$('.hero-img img').css('transform','scale(1.18)');}
  if($(window).scrollTop()> offset + (height/2)){$('.hero-img img').css('transform','scale(1.2)');}
})

// pillar scroller section
$(".fw-scroller-pillar").hover(function(){
  $(this).toggleClass('active');
  $(this).siblings().toggleClass('blur');
  $('.cursor').toggleClass('cursor-large');
  var idValue = $(this).attr('data-id');
  $('.fw-background-image#'+idValue).toggleClass('active');
})

// video cursor animation
$('.fow-media-video').hover(function(){
  $('.cursor').toggleClass('media-cursor');
  $('.cursor.media-cursor .cursor-circle').toggleClass('play-now');
  $('.play-now').html('<span>PLAY</span>');
})
// ready to begain cursor animation
$('.ready-to-begain-content').hover(function(){
  $('.cursor').toggleClass('rtb');
})
$(document).on("mousemove",function(e){
  $('.cursor').css({
    left:(e.pageX - 1) +"px",
    top:(e.pageY - 20) +'px'
  })
})

// fow img moves up and down animation
$(window).scroll(function(){
  var fow_con_offset = $('.fow-btm-content').offset().top;
  var fow_con_height = $('.fow-btm-content').height();
  if($(window).scrollTop() < fow_con_offset){
    $('.fow-content-img-1').css('transform','translateY(-2vmax)');
    $('.fow-content-img-2').css('transform','translateY(-0.4vmax)');
  }
  if($(window).scrollTop() > fow_con_offset + (fow_con_height / 10)){
    $('.fow-content-img-1').css('transform','translateY(-1vmax)');
    $('.fow-content-img-2').css('transform','translateY(-1vmax)');
  }
  if($(window).scrollTop() > fow_con_offset+(fow_con_height / 8)){
    $('.fow-content-img-1').css('transform','translateY(-0vmax)');
    $('.fow-content-img-2').css('transform','translateY(-1.5vmax)');
  }
  if($(window).scrollTop() > fow_con_offset+(fow_con_height / 6)){
    $('.fow-content-img-1').css('transform','translateY(1vmax)');
    $('.fow-content-img-2').css('transform','translateY(-2vmax)');
  }
  if($(window).scrollTop() > fow_con_offset+(fow_con_height / 4)){
    $('.fow-content-img-1').css('transform','translateY(1.5vmax)');
    $('.fow-content-img-2').css('transform','translateY(-2.3vmax)');
  }
  if($(window).scrollTop() > fow_con_offset+(fow_con_height / 3)){
    $('.fow-content-img-1').css('transform','translateY(2vmax)');
    $('.fow-content-img-2').css('transform','translateY(-2.7vmax)');
  }
  if($(window).scrollTop() > fow_con_offset+(fow_con_height / 2)){
    $('.fow-content-img-1').css('transform','translateY(2.5vmax)');
    $('.fow-content-img-2').css('transform','translateY(-3vmax)');
  }

})
