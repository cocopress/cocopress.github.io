// www.verstka.pro

// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

function clearForm(form) {
	if (('jquery' in form) === false) form = $(form);
	$('input, textarea', form).val('').trigger('init');
}

function disableForm(form) {
	if (('jquery' in form) === false) form = $(form);
	form.find('input, button, textarea, select').prop('disabled', true);
}

function enableForm(form) {
	if (('jquery' in form) === false) form = $(form);
	form.find('input, button, textarea, select').prop('disabled', false);
}

function customSelect(context) {

	var select = $('select', context);

	select.selectric({
	    arrowButtonMarkup: '<u></u>'
	});
	if (!select.parents('.select').find('.selectric-wrapper').length) {
		select.parents('.select').addClass('native');
	}
}

var w = $(window),
	d = $(document),
	cl = console.log;

var map, center;

var phoneOffset = 860,
	tabletOffset = 1041,
	is_phone = window.innerWidth <= phoneOffset,
	is_tablet = window.innerWidth > phoneOffset && window.innerWidth <= tabletOffset,
	is_desktop = window.innerWidth > tabletOffset;

w.on('resize', function () {
	is_phone = window.innerWidth <= phoneOffset;
	is_tablet = window.innerWidth > phoneOffset && window.innerWidth <= tabletOffset;
	is_desktop = window.innerWidth > tabletOffset;
});

customSelect(d);

var smallmenu = false;

w.on('scroll resize init', function () {

	if (is_phone) {

		var scrollTop = w.scrollTop();

		if (scrollTop >= 100 && smallmenu === false) {
			$('header').addClass('small');
			smallmenu = true;
		}

		if (scrollTop < 100 && smallmenu === true) {
			$('header').removeClass('small');
			smallmenu = false;
		}

	}

}).trigger('init');

w.on('load', function () {

	var asideTimer = window.setTimeout(function () {
		$('aside .slider').addClass('active');
		clearTimeout(asideTimer);
	}, 500);

});

$('header .handler').on('click', function (e) {

	e.preventDefault();

	$('header .menu').toggleClass('active');
	$('html').toggleClass('no-scroll-phone');

});

$('aside').each(function () {

	function random(owlSelector){
		owlSelector.children().sort(function(){
			return Math.round(Math.random()) - 0.5;
		}).each(function(){
			$(this).appendTo(owlSelector);
		});
	}

	var aside = $(this),
		items = $('.slider .items', aside);

	var is_works = $('.works__page').length;

	$('.swipe', aside).on('swipeleft', function () {
		items.data('owlCarousel').next();
		items.attr('data-direction', 'next');
	});

	$('.swipe', aside).on('swiperight', function () {
		items.data('owlCarousel').prev();
		items.attr('data-direction', 'prev');
	});

	w.on('resize init load', function (e) {
		$('.slider', aside).css({
			'width': window.innerWidth + 'px',
			'margin-left': window.innerWidth * -.5 + 'px'
		});
		if (e.type !== 'init' && items.length) {
			var reinit = window.setTimeout(function () {
				var index = items.data('owlCarousel').currentItem;
				items.data('owlCarousel').reinit();
				items.data('owlCarousel').jumpTo(index);
				clearTimeout(reinit);
			}, 500);
		}
	}).trigger('init');

	items.owlCarousel({
		navigation: true,
		singleItem: true,
		addClassActive: true,
		transitionStyle: 'goDown',
		beforeInit: function (e) {
			if ($('.index__page').length) {
				random(e);
			}
		},
		afterInit: function () {			
			$('.owl-prev', aside).on('mousedown', function () {
				items.attr('data-direction', 'prev');
			});
			$('.owl-next', aside).on('mousedown', function () {
				items.attr('data-direction', 'next');
			});
		},
		afterMove: function (owl) {
			window.location.hash = $('.owl-item.active .item').data().id;
		}
	});

	$('.open', aside).on('click', function () {

		aside.addClass('active');

		$('html').addClass('no-scroll-desktop no-scroll-tablet');

	});

	$('.close', aside).on('click', function () {

		aside.removeClass('active');

		$('html').removeClass('no-scroll no-scroll-desktop no-scroll-tablet no-scroll-mobile');

		if (is_works) {
			window.location.hash = '';
		}

	});

});

var watcher;

$('.phone-mask').mask('+7 999 999 99 99');

$('.number-mask').number(true, 0, '', '')

$('.input').find('input, textarea').on('blur focus keydown keyup keypress change init click', function (e) {

	var input = $(this),
		filled = (input.val() === '') ? 'removeClass' : 'addClass';

	input.parents('.input')[filled]('filled');

	if (e.type === 'blur' || e.type === 'focus') {
		var focused = (e.type === 'focus') ? 'addClass' : 'removeClass';
		input.parents('.input')[focused]('focused');
	}

	if (e.type === 'focus') {
		input.parents('.input.error-shown').removeClass('error-shown');
	}

    if (e.type === 'focus' && input.hasClass('phone-mask') && input.val() === '') {
        input.parents('.input').addClass('filled');
    }

	if (e.type === 'focus') {
		watcher = window.setInterval(function () {
			if (input.val() !== '') {
				input.trigger('init');
				clearInterval(watcher);
			}
		}, 250);
	}
	if (e.type === 'blur') {
		clearInterval(watcher);
	}

}).trigger('init');

if ($('.auto-open').length) {

	var id = $('.auto-open').attr('id');

	$('body').append('<a href="#'+id+'" class="auto-open-handler"></a>');

	w.on('load', function () {

		$('.auto-open-handler').trigger('click').remove();

	});

}

d.on('click', 'a[href^="#"]', function (e) {

	var id = $(this).attr('href'),
		$id = $(id);

	if ($id.is('.text__popup')) {
		$('header .menu').removeClass('active');
		$('html').addClass('no-scroll');
		$id.addClass('active');
	}

});

if ($('.text__popup').length) {
	$('.topbar-action').html(function (i, val) {
		return '<a href="#'+$('.text__popup:first').attr('id')+'">'+val+'</a>';
	});
}

$('.tabs__widget[data-for]').each(function () {

	var self = $(this),
		target = $(self.data().for),
		active = $('.active', self).index();

	if (!target.length) return false;

	$('a', self).on('click', function (e) {

		var index = $(this).parents('li:not(".active")').index();

		if (index === -1) return false;

		var current = $('.tabs-item', target)
			.removeClass('active')
			.filter(':eq('+index+')').addClass('active');

		$('li', self)
			.removeClass('active')
			.filter(':eq('+index+')').addClass('active');

	});

	$('.tabs-item', target)
		.removeClass('active')
		.filter(':eq('+active+')').addClass('active');

	$('a[href="'+window.location.hash+'"]', self).trigger('click');

});

$('form:not([target])').on('submit', function (e) {

	e.preventDefault();

	var form = $(this),
		data = form.serializeArray();

	form.addClass('loading');

	disableForm(form);

	$('.input', form).removeClass('error error-shown').find('.error').html('');

	$.post(form.attr('action'), data, function (data) {

		if (data.error === true) {
			$.each(data.messages, function (k, v) {
				$('[name="'+k+'"]', form).siblings('.error').html(v).parents('.input').addClass('error error-shown');
			});
		} else {
			if ('fail' in data) {
				form.addClass('sent fail');
			} else {
				clearForm(form);
				form.addClass('sent');
			}
		}

	}, 'json')
	.fail(function () {
		form.addClass('sent fail');
	})
	.always(function () {
		enableForm(form);
		form.removeClass('loading');
	});

});

d.on('click', '.form-sent .back', function (e) {

	e.preventDefault();

	$(e.target).parents('form').removeClass('sent fail success');

});

d.on('click', function (e) {

	if ($(e.target).is('.text__popup .close')) {

		e.preventDefault();

		$('.text__popup').removeClass('active');
		$('html').removeClass('no-scroll');

	}

})

$('.text__popup .scrollable').perfectScrollbar({
	suppressScrollX: true
});

w.on('resize', function () {
	$('.text__popup .scrollable').perfectScrollbar('update');
});

$('.index__page').each(function () {

	var page = $(this);

	$('.examples a[data-slide]', page).on('click', function (e) {

		e.preventDefault();

		if (is_phone) return false;

		$('aside .slider .items').data('owlCarousel').jumpTo($(this).data().slide);

		$('aside').addClass('active');

		$('html').addClass('no-scroll');

	});

});

$('.about__page').each(function () {

	var page = $(this);

	$('.tips-inner', page).owlCarousel({
		navigation: false,
		singleItem: true,
		addClassActive: true,
		autoHeight: true,
		transitionStyle: 'fade'
	});

	$('.possibilities li', page).on('click', function (e) {

		var target = $(this),
			index = $('.possibilities li', page).index(target);

		$('.tips-inner', page).data('owlCarousel').goTo(index);
		$('.possibilities li.active', page).removeClass('active');
		target.addClass('active');
		$('.tips', page).addClass('active');

	});

	$('.possibilities', page).on('mouseleave', function () {
		$('.tips, .possibilities > ul .active', page).removeClass('active');
	});

});

$('.contacts__page').each(function () {

	var page = $(this);

	google.maps.event.addDomListener(window, 'load', init);

	function init() {

		center = new google.maps.LatLng(59.9360059, 30.386223);

		var mapOptions = {
			zoom: 15,
			center: center,
			disableDefaultUI: true,
			styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
		};

		var mapElement = document.getElementById('map');

		map = new google.maps.Map(mapElement, mapOptions);

		var icon = new google.maps.MarkerImage($('#map').data().marker, null, null, null, new google.maps.Size(39, 57));

		var marker = new google.maps.Marker({
			position: center,
			map: map,
			icon: icon,
			flat: true
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			google.maps.event.trigger(map, "resize");
		    map.setCenter(center);
		});

	}

	if (window.location.hash === '#map') {
		$('aside').addClass('active');
	}

	$('footer .address a').on('click', function () {
		$('aside').addClass('active');
	});

	$('.brahches a', page).on('click init', function (e) {

		e.preventDefault();

		var link = $(this),
			target = link.data().city;

		if (link.parent('li').is('.active') && e.type !== 'init') return false;

		$('.brahches li', page).removeClass('active');
		link.parent('li').addClass('active');

		$('.city', page).hide(0).filter('.'+target).show(0);

	});

	$('.brahches li.active a', page).trigger('init');

	w.on('ready load resize', function () {

		var baseHeight = $('.contents .office', page).height(),
			targetHeight = $('.contents form', page).height(),
			diff = baseHeight - targetHeight;

		if (diff !== 0) {
			$('.textarea', page).height(function (i, val) {
				return val + diff;
			});
		}

	});

});

$('.price__page').each(function () {

	var page = $(this);

	$('tbody td').on('mouseover', function () {

		var td = $(this);

		td.parent('tr').addClass('active').parent('tbody').find('td').each(function () {
			if ($(this).index() === td.index()) {
				$(this).addClass('active');
			}
		});

	}).on('mouseout', function () {

		$('tr, td').removeClass('active');

	});

});

$('.works__page').each(function () {

	var page = $(this),
		tpl = $('#aside-template').html().trim(),
		slides = '';

	$('.portfolio .item:not(.cases)', page).each(function () {

		var item = $(this),
			slide = tpl;

		slide = slide.replace('%title%', $('.title', item).html());
		slide = slide.replace('%image%', item.data().image);
		slide = slide.replace('%desc%', item.data().desc);
		slide = slide.replace('%id%', item.data().id);

		slides += slide;

	});

	$('aside .slider .items').data('owlCarousel').addItem(slides);

	var isotope = $('.portfolio', page).isotope({
		itemSelector: '.item',
		masonry: {
			columnWidth: '.grid',
			gutter: '.gutter'
		}
	});

	$('.tabs__widget a', page).on('click', function () {

		var link = $(this);

		if (link.parent('li.active').length) return false;

		$('.tabs__widget .active', page).removeClass('active');

		link.parent('li').addClass('active');

		$('.portfolio', page).isotope({
			filter: link.attr('href').replace('#', '.')
		});

	});

	$('a[href="'+window.location.hash+'"]', page).trigger('click');

	$('.portfolio .item:not(.cases) .image', page).on('click', function () {

		var item = $(this).parent('.item');

		$('aside .slider .items').data('owlCarousel').jumpTo($('.portfolio .item:not(.cases)', page).index(item));

		$('aside').addClass('active');

		$('html').addClass('no-scroll');

		window.location.hash = item.data().id;

	});

	w.on('ready load resize scroll', function (e) {

		var scrollTop = w.scrollTop();

		$('.portfolio .item:not(.visible)', page).each(function () {

			var item = $(this);

			if (e.type === 'ready' || e.type === 'load') {
				if (item.offset().top < scrollTop + w.height()) {
					item.addClass('no-animation visible');
				}
			} else {
				if (item.offset().top < scrollTop + w.height() * 0.85) {
					item.addClass('visible');
				}
			}

		});

	});

	$('.portfolio .item[data-id="'+window.location.hash.replace('#', '')+'"] .image', page).trigger('click');

});

$('.payment__page').each(function () {

	var page = $(this),
		filled = true;

	page.on('update', function (e) {

		filled = true;

		$('input.required', page).each(function () {

			if ($(this).val() === '') {
				filled = false;
			}

		});

		if ($('input[type="checkbox"]', page).prop('checked') === false) {
			filled = false;
		}

		var state = (filled) ? 'removeClass' : 'addClass';

		$('.button input', page).prop('disabled', !filled).parent()[state]('disabled');

	});

	$('input.required, input[type="checkbox"]', page).on('blur focus keydown keyup keypress change init click', function () {
		page.trigger('update');
	});

});

$('.cards__page').each(function () {

	var page = $(this),
		cardBody = $('.card-body', page),
		contacts = $('.contacts', page),
		full = true,
		filled = false;

	$('.radios input', page).on('change', function () {

		var input = $(this);

		cardBody.attr('data-'+input.data().property, input.data().preview);

		full = (input.data().preview !== 'minimal');

		contacts.trigger('update');

	});

	contacts.each(function () {

		contacts.on('update', function (e) {

			var filled = true,
				collection = full ? 'input' : 'input[name="name"], input[name="email"]';

			if (!full) {
				$('input', contacts).prop('disabled', true).parent('.input').addClass('disabled');
			} else {
				$('input', contacts).prop('disabled', false).parent('.input').removeClass('disabled');
			}

			$(collection, contacts).each(function () {
				if (!full) {
					$(this).prop('disabled', false).parent('.input').removeClass('disabled');
				}
				if ($(this).val() === '') {
					filled = false
				}
			});

			var state = (filled) ? 'removeClass' : 'addClass';

			$('.button', contacts)[state]('disabled');
			$('.button input', page).prop('disabled', !filled).parent()[state]('disabled');

		});

		$('input', contacts).on('change paste keyup', function (e) {
			contacts.trigger('update');
		});

		$('.button', contacts).on('click', function (e) {

			e.preventDefault();

			var button = $(this);

			if (button.is('.disabled')) return false;

			$('input', contacts).each(function () {

				var input = $(this);

				$('.'+input.attr('name'), cardBody).html(input.val());

			});

			if (is_phone) {
				$('html, body').animate({scrollTop: $('.constructor', page).offset().top - 50}, 400);
			}

		});
		
	});

	$('.order input[type="checkbox"]', page).on('change', function (e) {

		var checked = $(this).prop('checked'),
			state = checked ? 'removeClass' : 'addClass';

		$('.button input', page).prop('disabled', !checked).parent()[state]('disabled');

	});

	var parallax = null,
		start = 680,
		reset = true;

	w.on('ready load resize', function (e) {

		// parallax

		if (w.height() >= (730 + 109) && w.width() >= 1042) {

			parallax = skrollr.init({
				smoothScrolling: false,
				mobileDeceleration: 0.004
			});

		} else {

			if (parallax !== null) {
				parallax.destroy();
				destroy = null;
			}

		}

		// card scale

		if (w.width() <= start) {

			var scale = w.width() / start;

			$('.constructor', page).css('height', 350 * scale);

			$('.card', page).css({
				'-webkit-transform': 'scale('+scale+') translateX(-41%)',
				'-moz-transform': 'scale('+scale+') translateX(-41%)',
				'-ms-transform': 'scale('+scale+') translateX(-41%)',
				'-o-transform': 'scale('+scale+') translateX(-41%)',
				'transform': 'scale('+scale+') translateX(-41%)'
			});

			reset = false;

		} else {

			if (!reset) {

				$('.constructor', page).removeAttr('style');
				$('.card', page).removeAttr('style');

				reset = true;

			}

		}

	});

	$('.slide .link a', page).on('click', function (e) {

		e.preventDefault();

		var target = $(this).parents('.section').next();

		if (parallax === null) {

			var gap = 0,
				offset = target.offset().top;

			if (is_tablet) {
				gap = 109;
			}
			if (is_phone) {
				gap = (offset > 100) ? 45 : 86;
			}

			if (offset >= 100 && smallmenu === false) {
				$('header').addClass('small');
				smallmenu = true;
			}

			if (offset < 100 && smallmenu === true) {
				$('header').removeClass('small');
				smallmenu = false;
			}

		    $('html, body').animate({scrollTop: offset - gap}, 400);

		} else {

			parallax.animateTo(w.height() * target.index() + 109);

		}

	});

});

jQuery.extend(jQuery.easing, {
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});

$('.scrolltop').on('click', function (e) {

	e.preventDefault();

    $('html, body').animate({scrollTop: 0}, 750, 'easeInOutCubic');

});

$('.seo__widget').each(function () {

	var widget = $(this);

	$('.expand a', widget).on('click', function (e) {

		e.preventDefault();

		widget.attr('aria-expanded', function (i, val) {
			return !$.parseJSON(val);
		}).find('.hidden').slideToggle(200);

	});

});

$('.technology__page').each(function () {

	var page = $(this),
		dragstart = null,
		scrollable = $('.scrollable', page);

	d.on('mousedown', scrollable, function (e) {
		dragstart = e.clientX;
	}).on('mousemove', function (e) {
		if (dragstart !== null) {
			scrollable.scrollLeft(scrollable.scrollLeft() + dragstart - e.clientX);
			dragstart = e.clientX;
		}
	}).on('mouseup', function () {
		dragstart = null;
	});

	w.on('ready load resize', function () {
		scrollable.trigger('update');
	});

    scrollable.on('scroll update touchstart touchend touchmove touchcancel', function (e) {

        var scrollLeft = scrollable.scrollLeft(),
            fader_width = 100,
            fader = [{
                el: scrollable.prev('.fader'),
                base: scrollLeft
            }, {
                el: scrollable.next('.fader'),
                base: scrollable[0].scrollWidth - scrollable.width() - scrollLeft
            }];

        for (var i = 0; i < 2; i++) {

            var opacity = Math.min(Math.abs(fader[i]['base'] / fader_width).toFixed(2), 1),
                hider = (opacity <= .05) ? 'addClass' : 'removeClass';

            fader[i]['el'].css('opacity', opacity)[hider]('hidden');

        }

    });

});

$('.case__page').each(function () {

	var page = $(this);

	var items = $('.slider .images').owlCarousel({
		navigation: true,
		pagination: true,
		singleItem: true,
		addClassActive: true,
		transitionStyle: 'goDown',
		dotsContainer: '.navigator-slider',
		afterInit: function () {			
			$('.owl-prev', page).on('mousedown', function () {
				items.attr('data-direction', 'prev');
			});
			$('.owl-next', page).on('mousedown', function () {
				items.attr('data-direction', 'next');
			});
			$('.owl-page', page).on('mousedown', function () {

				var link = $(this),
					index = link.index(),
					active = $('.owl-page.active', page).index();

				if (index === 4 && active === 0) {
					items.attr('data-direction', 'prev');
				} else if (index === 0 && active === 4) {
					items.attr('data-direction', 'next');
				} else if (active > index) {
					items.attr('data-direction', 'prev');
				} else {
					items.attr('data-direction', 'next');
				}
			});
		}
	});

});

d.on('change rebuild', '.select > select', function (e) {

	var select = $(this);

	select.siblings('span.fallback').html($(':selected', select).html());

});

$('.select > select').trigger('rebuild');

$('.calculation__page').each(function () {

	var page = $(this),
		place = $('.products-place');

	d.on('change', '[name="deliveryNeeded"]', function (e) {

		$('.order .data fieldset .submit', page).toggleClass('address-active');

		$(e.target).parents('.address').toggleClass('active').find('textarea').prop('disabled', function (i, val) {
			return !val;
		});

	});

	d.on('click', '.side .toggler .add-link', function (e) {

		e.preventDefault();

		$(e.target).parents('.side')
			.prev('.heading').addClass('active')
			.end()
			.find('.toggler').slideUp()
			.end()
			.find('.params').slideDown(function () {
				$(this).removeAttr('style').parent().addClass('active').parents('.product').trigger('update');
			});

	});

	d.on('click', '.field-more a', function (e) {
		e.preventDefault();
		$(e.target).parent().siblings('.active').next('.field').addClass('active').parents('.product').trigger('update');
	});

	d.on('click', '.selects .field .remove', function (e) {
		e.preventDefault();
		$(e.target).parents('.field').removeClass('active').parents('.product').trigger('update');
	});

	d.on('click', '[data-remove]', function (e) {

		e.preventDefault();

		var link = $(e.target),
			type = link.data().remove;

		if (type === 'side') {
			link
				.parents('.heading').removeClass('active')
				.next('.side')
					.find('.toggler').slideDown()
					.end()
					.find('.params').slideUp(function () {
						$(this).removeAttr('style').parent().removeClass('active');
						$('.product:first', page).trigger('update');
					});
		}

		if (type === 'product') {
			link.parents('.product').slideUp(function () {
				$(this).remove();
				$('.product:first', page).trigger('update');
			});
		}

	});

	d.on('click', '.add-product .add-link', function (e) {

		e.preventDefault();

		createProduct().slideDown(function () {
			$(this).addClass('active').removeAttr('style');
		});

	});

	d.on('click', '[data-add]', function (e) {

		e.preventDefault();

		var link = $(this),
			input = link.parents('.method').find('input:checkbox'),
			el = link.parents('.colors'),
			settings = el.data();

		settings.current = input.val();
		settings.current = Math.max(((parseInt(settings.current) || settings.min) + parseInt(link.data().add)), 0);

		if (settings.current < settings.min) {
			settings.current = settings.min;
			input.prop('checked', false);
		}
		if (settings.current > settings.max) {
			settings.current = settings.max;
		}

		var cases = [2, 0, 1, 1, 1, 2],
			titles = ['цвет', 'цвета', 'цветов'];

		$('.count', el)
			.find('b').html(settings.current)
			.end()
			.find('span').html(titles[(settings.current % 100 > 4 && settings.current % 100 < 20) ? 2 : cases[(settings.current % 10 < 5) ? settings.current % 10 : 5]]);

		input.val(settings.current).trigger('change');

	});

	d.on('change update', 'select, input:checkbox, .product', function () {

		var html = '',
			totalItems = 0;

		$('.product', page).each(function () {

			totalItems++;

			var product = $(this),
				params = {};

			html += '<dl><dt><br>'+$('[name="product-type"] :selected', product).html()+'<br></dt><dd>';

			$('input:checkbox:checked', product).each(function () {
				params[$.trim($(this).siblings('.title').data().value)] = [0, 0];
			});

			$('input:checkbox:checked', product).each(function () {

				var input = $(this),
					index = $('[name="'+input.attr('name')+'"]', product).index(input),
					inputData = params[$.trim(input.siblings('.title').data().value)];

				inputData[index] = input.val();

			});

			$.each(params, function (k, v) {
				html += k + ' ' + v.join('+') + '<br>';
			});

			var runs = [];

			html += 'Сторона А: ' + $('.side:first [name="paper"] :selected', product).html() + '<br>';
			if ($('.side:last.active', product).length) {
				html += 'Сторона Б: ' + $('.side:last [name="paper"] :selected', product).html() + '<br>';
			}
			html += $('[name="product-size"] :selected', product).html() + '<br>';
			html += 'Тираж ';
			$('[name="product-run"] :selected', product).each(function () {
				if ($(this).parents('.field').hasClass('active')) {
					runs.push($(this).html());
				}
			});
			html += runs.join(' шт, ') + ' шт<br>';
			if ($('[name="postproduction"]', product).val() !== 'none') {
				html += $('[name="postproduction"] :selected', product).html() + '<br>';
			}
			html += '</dd></dl>';

		});

		$('.order .selected', page)[totalItems >= 3 ? 'addClass' : 'removeClass']('many').html(html);

		$('[name="details"]', page).val($.trim($(html.replace(/\<br\>/gi, '\r\n')).text()));

	});

	var createProduct = function () {

		var template = $('#product').html(),
			side = $('#side').html();

		template = template.replace('%side%', side);
		template = template.replace('%side%', side);

		var newProduct = $($.parseHTML($.trim(template))).css('display', 'none');

		place.append(newProduct);

		newProduct.data({
			title: '',
			info: {}
		});

		$('.side:first', newProduct).addClass('active');

		$('[name="product-type"]', newProduct)
			.on('change', function () {

				var selected = $(':selected', this);

				$('[name="product-size"]', newProduct)
					.find('option')
						.prop('disabled', true)
						.filter('[data-type="'+selected.data().size+'"]')
							.prop('disabled', false)
							.end()
						.filter(':not(:disabled):first')
							.prop('selected', true)
							.end()
						.end()
					.trigger('change').selectric('refresh');

				$('[name="product-run"]', newProduct)
					.find('option')
						.prop('disabled', true)
						.filter('[data-type="'+selected.data().run+'"]')
							.prop('disabled', false)
							.end()
						.filter(':not(:disabled):first')
							.prop('selected', true)
							.end()
						.end()
					.trigger('change').selectric('refresh');

				$('.product-main .field-tip', newProduct).html(selected.data().tip || '');

			})
			.find('option:first').prop('selected', true)
			.end()
			.trigger('change');

		$('[name="paper"]', newProduct).on('change', function () {
			$('.paper .field-tip', newProduct).html($(':selected', this).data().tip || '');
		}).trigger('change');

		$('[name="postproduction"]', newProduct).on('change', function () {
			$('.postproduction .field-tip', newProduct).html($(':selected', this).data().tip || '');
		}).trigger('change');

		$('[name="methodHotstamping"]', newProduct).on('change', function () {

			var input = $(this),
				index = $('[name="methodHotstamping"]', newProduct).index(input);

			if (input.prop('checked') === true) {
				$('[name="methodHotstamping"]:eq('+(index === 0 ? 1 : 0)+')', newProduct).prop('checked', false);
			}

		});

		customSelect(newProduct);

		return newProduct;


	};

	createProduct().show(0);

	var uploader = new Dropzone('.calculation__page form', {
		url: '/ajax/upload.php',
        addRemoveLinks: true,
        parallelUploads: 1,
        dictCancelUpload: '',
        dictCancelUploadConfirmation: 'Отменить загрузку файла?',
        dictRemoveFile: '',
        dictInvalidFileType: 'Загрузка файлов этого типа запрещена.',
        dictFileTooBig: 'Файл слишком большой.',
        dictResponseError: 'Ошибка {{statusCode}}',
        dictMaxFilesExceeded: 'Вы можете загрузить только один файл',
        clickable: '.select-file',
        previewsContainer: '.dropzone-previews',
        previewTemplate: ''+
            '<div class="dz-preview dz-file-preview">'+
                '<div class="dz-details">'+
                    '<div class="dz-filename"><span data-dz-name></span></div>'+
                    '<div class="dz-error-message"><span data-dz-errormessage></span></div>'+
                '</div>'+
                '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'+
            '</div>',
        uploadMultiple: false,
        method: 'post',
        maxFilesize: 15,
        maxFiles: 1,
        acceptedFiles: 'application/x-compressed,application/x-zip-compressed,application/zip',
        init: function () {

        	this.on('processing', function () {
        		$('form', page).find('.submit .button').addClass('disabled').find('input').prop('disabld', true);
        	});
        	this.on('queuecomplete', function () {
        		$('form', page).find('.submit .button').removeClass('disabled').find('input').prop('disabld', false);
        		$('input[name="filename"]').val('http://funkypress.ru/uploads/' + this.files[0].xhr.responseText);
        	});
        	this.on('removedfile', function () {
        		$('input[name="filename"]').val('');
        	});

        }
	});

});


/* dev */

(function() {

    if (window.location.search != '?less') return false;

    //$('title').html(window.location.pathname.match(/\/(.*)\//)[1] + ': ' + decodeURI(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1))); // FUCK YEAH :D

    $.getScript('http://csr.vp/pixelperfect/pixelperfect.js');

    $.getScript('js/less.min.js', function () {

        if (!window.less) {
            alert('LESS.JS не загружен.');
            return false;
        }

        var stylesheet = $('<link rel="stylesheet/less" type="text/css" href="css/style.less">');

        $('head').append(stylesheet);

        less.sheets.push(stylesheet[0]);
        less.refresh();

        $('link[rel="stylesheet"][href="/css/style.css"]').prop('disabled', true);

    });

}());