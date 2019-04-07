(function ($) {
    'use strict';

    var razo_window = $(window);

    // ****************************
    // :: 1.0 Preloader Active Code
    // ****************************

    razo_window.on('load', function () {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });

    // ****************************
    // :: 2.0 ClassyNav Active Code
    // ****************************

    if ($.fn.classyNav) {
        $('#razoNav').classyNav();
    }

    // *********************************
    // :: 3.0 Welcome Slides Active Code
    // *********************************

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            autoplayTimeout: 7000,
            nav: false,
            dots: true
        })
        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    // ******************************
    // :: 4.0 Latest Slides Active Code
    // ******************************
    if ($.fn.owlCarousel) {
        var latestNewsSlide = $('.razo-latest-news-slide');
        latestNewsSlide.owlCarousel({
            items: 2,
            margin: 50,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            center: true,            
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    }

    // *******************************
    // :: 5.0 ImagesLoaded Active Code
    // *******************************
    if ($.fn.imagesLoaded) {
        $('.razo-blog-masonary').imagesLoaded(function () {
            // init Isotope
            var $grid = $('.razo-blog-masonary').isotope({
                itemSelector: '.razo-blog-masonary-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.razo-blog-masonary-item'
                }
            });
        });
    }

    // *********************************
    // :: 6.0 Magnific Popup Active Code
    // *********************************
    if ($.fn.magnificPopup) {
        $('.video-play-btn').magnificPopup({
            type: 'iframe'
        });
    }

    // ***************************
    // :: 7.0 Tooltip Active Code
    // ***************************
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // ***********************
    // :: 8.0 WOW Active Code
    // ***********************
    if (razo_window.width() > 767) {
        new WOW().init();
    }

    // ****************************
    // :: 9.0 Jarallax Active Code
    // ****************************
    if ($.fn.jarallax) {
        $('.jarallax').jarallax({
            speed: 0.2
        });
    }

    // ****************************
    // :: 10.0 Scrollup Active Code
    // ****************************
    if ($.fn.scrollUp) {
        razo_window.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="arrow_up"</i>'
        });
    }

    // **************************
    // :: 11.0 Sticky Active Code
    // **************************
    razo_window.on('scroll', function () {
        if (razo_window.scrollTop() > 0) {
            $('.main-header-area').addClass('sticky');
        } else {
            $('.main-header-area').removeClass('sticky');
        }
    });

    // ********************************
    // :: 12.0 CounterUp Active Code
    // ********************************
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 15,
            time: 1500
        });
    }

    // *********************************
    // :: 13.0 Prevent Default 'a' Click
    // *********************************
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // *********************************
    // :: 14.0 Social Share Active Code
    // *********************************
    $(".social-share-icon").on('click', function () {
        $(this).toggleClass('active');
        $(".razo-social-share-area").toggleClass('active');
    });
    $(".ss-close-btn").on('click', function () {
        $(".razo-social-share-area").removeClass('active');
    });

    // *********************************
    // :: 15.0 audioPlayer Active Code
    // *********************************
    if ($.fn.audioPlayer) {
        $('audio').audioPlayer();
    }

    // *********************************
    // :: 16.0 Countdown Active Code
    // *********************************
    if ($.fn.countdown) {
        $("#clock").countdown("2020/11/10", function (event) {
            $(this).html(event.strftime("<div>%D <span>Days</span></div> <div>%H <span>Hours</span></div> <div>%M <span>Minutes</span></div> <div>%S <span>Seconds</span></div>"));
        });
    }

})(jQuery);