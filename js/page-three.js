$('.pathways-list-item-img').hover(function(){
  $('.cursor').toggleClass('bfpm-img');
})
// cursor animation
$(document).on("mousemove",function(e){
  $('.cursor').css({
    left:(e.pageX - 1) +"px",
    top:(e.pageY - 20) +'px'
  })
})