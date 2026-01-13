
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

var map = L.map('map').setView([55.875536, 37.724681], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);
var marker = L.marker([55.875536, 37.724681]).addTo(map);
marker.bindPopup("<b>Типография COCOPRESS</b><p>Москва, ул.Проходчиков, 10к2</p>").openPopup();

function isIOS() {
            return [
              'iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
if (isIOS()) {
    const coco = document.getElementById('coco');
    coco.style.cssText = 'top: 69%;';    
} 

(function ($) {
    "use strict";

    $('.navbar').fadeIn('slow').css('display', 'flex');
    $('.back-to-top').fadeOut('fast');
    
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();   
    
    new WOW().init();    

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('#navbarCollapse').removeClass('show');
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });   
    
    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Skills
   /* $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});*/

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('.portfolio-container').imagesLoaded().progress( function() {
        $('.portfolio-container').isotope('layout');
      });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active'); $(this).addClass('active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });
    
})(jQuery);



