jQuery(document).ready(function ($) {
  
	var slideCount = $('#slidshow .slider__tape li').length;
	var slideWidth = $('#slidshow .slider__tape li').width();
	var slideHeight = $('#slidshow .slider__tape li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slidshow').css({ width: slideWidth, height: slideHeight });
	
	$('#slidshow .slider__tape').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slidshow .slider__tape li:last-child').prependTo('#slidshow .slider__tape');

    function moveLeft() {
        $('#slidshow .slider__tape').animate({
            left: + slideWidth
        }, function () {
            $('#slidshow .slider__tape li:last-child').prependTo('#slidshow .slider__tape');
            $('#slidshow .slider__tape').css('left', '');
        });
    };

    function moveRight() {
        $('#slidshow .slider__tape').animate({
            left: - slideWidth
        }, function () {
            $('#slidshow .slider__tape li:first-child').appendTo('#slidshow .slider__tape');
            $('#slidshow .slider__tape').css('left', '');
        });
    };

    $('.slider__prev').click(function () {
        moveLeft();
    });

    $('.slider__next').click(function () {
        moveRight();
    });

});    
