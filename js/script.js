/* ===== Aos-Animatin ===== */
$(document).ready(function () {
    // Aos plugin

    AOS.init();

});

/* ====== Event-slider ======= */
$('.slider-for').slick({
    autoplay: true,
    autoplaySpeed: 10000,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-nav',
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
});
$('.slider-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
});

/* ===== Datepicker ===== */
$(function() {
   $('[data-toggle="datepicker"]').datepicker({
     autoHide: true,
     zIndex: 2048,
   });
 });

 /* ====== Mega-menu-hover-showing ===== */
 $(document).ready(function(){
  $(".dropdown").hover(function(){
      var dropdownMenu = $(this).children(".dropdown-menu");
      if(dropdownMenu.is(":visible")){
          dropdownMenu.parent().toggleClass("open");
      }
  });
}); 

// ======= Featured-slider =======
$('.featured-active').slick({
  dots: false,
  infinite: false,
  speed: 300,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      }
    },
  ]
});



