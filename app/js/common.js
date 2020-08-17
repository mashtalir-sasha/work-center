$(function() {

	// Скролинг по якорям
	$('.anchor').bind("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.data('id')).offset().top-95 // отступ от меню
		}, 500);
	e.preventDefault();
	});

	// Клик по гамбургеру на моб версии
	$('.mob-menu__link').click(function() {
		$('.mob-menu').toggleClass('show');
		$('.hidden').toggleClass('show');
	});
	$('.nav-list__item').click(function() {
		$('.mob-menu').removeClass('show');
		$('.hidden').removeClass('show');
	});

	$('.hidden').click(function() {
		$('.mob-menu').removeClass('show');
		$('.hidden').removeClass('show');
	});

	// Отправка формы
	$('form').submit(function() {
		var data = $(this).serialize();
		data += '&ajax-request=true';
		$.ajax({
			type: 'POST',
			url: '/mail.php',
			dataType: 'json',
			data: data,
			success: (function() {
				$.fancybox.close();
				$.fancybox.open({src:'#thn'});
			})()
		});
		return false;
	});

	// Инит фансибокса
	$('.fancybox').fancybox({
		margin: 0,
		padding: 0
	});

	// Функция для анимации
	$(".scroll").each(function () {
		var block = $(this);
		$(window).scroll(function() {
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				var top = block.offset().top-400;
			} else {
				var top = block.offset().top+400;
			}
			var bottom = block.height()+top;
			top = top - $(window).height();
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top) && (scroll_top < bottom)) {
				if (!block.hasClass("animated")) {
					block.addClass("animated");
					block.trigger('animatedIn');
				}
			}
		});
	});

	// Инит слайдера Slick
	$('.slider1, .slider2, .slider3, .slider4').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		centerMode: true,
		centerPadding: '100px',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					centerMode: false,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				}
			}
		]
	});

	$('.news-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		centerMode: true,
		centerPadding: '100px',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					centerMode: false,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				}
			}
		]
	});

	$('.about-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
		centerMode: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	});

	$('.reviews-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		centerMode: true,
		centerPadding: '150px',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					centerMode: false
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					centerMode: false
				}
			}
		]
	});

	let bg = document.querySelector('.mouse');
	window.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;  
		bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
	});

	let bg1 = document.querySelector('.mouse2');
	window.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;  
		bg1.style.transform = 'translate(-' + x * 60 + 'px, -' + y * 60 + 'px)';
	});

	let bg2 = document.querySelector('.mouse3');
	window.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;  
		bg2.style.transform = 'translate(+' + x * 75 + 'px, +' + y * 75 + 'px)';
	});

});
