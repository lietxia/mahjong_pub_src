$(window).scroll(function () {
    if (window.scrollY <= 60) {
        return $('#my_nav').removeClass('nav_bg');
    } else {
        return $('#my_nav').addClass('nav_bg');
    }
});

