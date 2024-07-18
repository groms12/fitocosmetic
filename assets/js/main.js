window.onscroll = (function() {
    var lastScrollTop = 0;
    return function() {
        if (window.screen.width > 768) {
            var st = window.scrollY || document.documentElement.scrollTop;
            if (st > lastScrollTop) { // скролл вниз
                document.querySelector('.header__menu').style.display = 'none';
            } else if (st < lastScrollTop) { // скролл вверх
                document.querySelector('.header__menu').style.animation = 'ani 0.5s forwards';
                document.querySelector('.header__menu').style.display = 'flex';
            }
            lastScrollTop = st;
        }
    }
})();

// работа с куками
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function checkCookies() {
    let cookieNote = document.querySelector('.modal--cookie');
    let cookieBtnAccept = cookieNote.querySelector('.modal--cookie .btn');

    // Если куки cookies_policy нет или она просрочена, то показываем уведомление
    if (!getCookie('cookies_policy')) {
        cookieNote.classList.add('modal--active');
    }

    // При клике на кнопку устанавливаем куку cookies_policy на один год
    cookieBtnAccept.addEventListener('click', function() {
        setCookie('cookies_policy', 'true', 365);
        cookieNote.classList.remove('modal--active');
    });
}

// конец работы с куками

$(document).ready(function() {
    checkCookies();

    /*setTimeout(function() {
        // TODO когда готова доставка с выбором городов
        $('.modal--moscow').addClass('modal--active');
    }, 2000);*/

    // $('.modal--cookie').addClass('modal--active');
});
$('.media__filters').click(function() {
    $('.filters-all').addClass('filters--active');
    $('html').addClass('body-no-scroll');
});
$('.link-brands').click(function() {
    $('.filters').removeClass('filters--active');
    $('.filters-brands').addClass('filters--active');
});
$('.link-type').click(function() {
    $('.filters').removeClass('filters--active');
    $('.filters-type').addClass('filters--active');
});
$('.filters-back').click(function() {
    $('.filters').removeClass('filters--active');
    $('html').removeClass('body-no-scroll');
});
$('.filters-back-1').click(function() {
    $('.filters').removeClass('filters--active');
    $('.filters-all').addClass('filters--active');
});
$('.filters .btn').click(function() {
    $('.filters').removeClass('filters--active');
    $('html').removeClass('body-no-scroll');
});
$('.media__sort').click(function() {
    $('.modal--sort').addClass('modal--active');
});
$('.filter-brand__item').click(function() {
    $(this).toggleClass('filter-brand__item--active');
});
$('.footer__link--active').click(function(e) {
    e.preventDefault();
    $(this).parent('li').parent('.footer__links').toggleClass('footer__links--active');
});
$('.modal__close').click(function() {
    $('.modal').removeClass('modal--active');
    $('html').removeClass('body-no-scroll');
    $('body').removeClass('body-modal');
});
$('.modal--city .modal__close').click(function() {
    $('html').removeClass('body-no-scroll');
    setTimeout(function() {
        $('.modal--sale').addClass('modal--active');
        $('html').addClass('body-no-scroll');
    }, 3000);
});
$('.modal__li').click(function() {
    $('.modal__li').removeClass('modal__li--active');
    $(this).addClass('modal__li--active');
    $('.modal--city').removeClass('modal--active');
    var city = $(this).text();
    $('.header__city span').text(city);
    $('html').removeClass('body-no-scroll');
});
$('.modal__btns .btn').click(function() {
    $('.modal').removeClass('modal--active');
    setTimeout(function() {
        $('.modal--sale').addClass('modal--active');
    }, 2000);
});
$('.order-type__item').click(function() {
    $('.order-type__item').removeClass('order-type__item--active');
    $(this).addClass('order-type__item--active');
    $(this).children('input').prop('checked', true);

    var type = $('.order-type__item--active>.order-type__name').text();
    switch (type) {
        case 'Курьер':
            if ($('.order__type').find('.order-post').length !== 0) {
                $('.order-post').css('display', 'none');
                $('.order-delivery').css('display', 'block');
            } else {
                $('.modal--add-address').addClass('modal--active');
            }
            break;
        case 'Пункт выдачи':
            $('.modal--map').addClass('modal--active');
            break;
    }
});
$('.take').click(function() {
    $('.modal--map').removeClass('modal--active');
    $('.order-post').css('display', 'block');
    $('.order-delivery').css('display', 'none');
    // изменять данные доставки
    var title = $('.info-map.active .subtitle').text();
    var worktime = $('.info-map.active .worktime').text();
    var time = $('.info-map.active .worktime-value').text();
    var address = $('.info-map.active .address').text();
    $('.order-post .order-type__name').text(title);
    $('.order-post .order-type__date').text(worktime);
    $('.order-post .order-type__text').text(address);
});
$('.order-delivery').click(function() {
    $('.modal--my-address').addClass('modal--active');
});
$('.order-man__change').click(function() {
    $('.modal--persons').addClass('modal--active');
});
$('.btn--address').click(function() {
    $('.modal--add-address').removeClass('modal--active');
});
$('.btn-new-address').click(function() {
    $('.modal--my-address').removeClass('modal--active');
    $('.modal--add-address').addClass('modal--active');
});
$('.btn-add-person').click(function() {
    $('.modal--persons').removeClass('modal--active');
    $('.modal--add-person').addClass('modal--active');
});
$('.modal-change_data__img').click(function() {
    let modal = $(this).parent('.modal-change_data__input').parent('.modal-change_data');
    if (modal.hasClass('modal-address')) {
        let inp = $('input[name="modal-address"]:checked');
        let time = $('input[name="modal-address"]:checked').val();
        let label = inp.siblings('.modal-change_data__label').text();
        let address = label.split(',');
        $('.modal--add-address .modal__city').val(address[0]);
        $('.modal--add-address .modal__street').val(address[1] + ', ' + address[2]);
        $('.modal--add-address .modal__house').val(address[3]);
        $('.modal--my-address').removeClass('modal--active');
        $('.modal--add-address').addClass('modal--active');
    } else if (modal.hasClass('modal-person')) {
        let inp = $('input[name="modal-person"]:checked');
        // let mail = $('input[name="modal-person"]:checked').val();
        let name = inp.siblings('.modal-change_data__label').text();
        let phone = inp.parent('.modal-change_data__radio').siblings('.modal-change_data__comment').text();
        // добавить данные в форму
        let fio = name.split(' ');
        $('.modal--add-person .modal__name').val(fio[0]);
        $('.modal--add-person .modal__second-name').val(fio[1]);
        $('.modal--add-person .modal__father-name').val(fio[2]);
        $('.modal--add-person .modal__phone').val(phone);
        $('.modal--persons').removeClass('modal--active');
        $('.modal--add-person').addClass('modal--active');
    }
});
$('.btn--address').click(function(e) {
    e.preventDefault();
    var inp = $('input[name="modal-address"]:checked');
    var time = $('input[name="modal-address"]:checked').val();
    var label = inp.siblings('.modal-change_data__label').text();
    $('.order-delivery>.order-type__text').text(label);
    // вопрос по времени работы
    $('.order-delivery>.order-type__date').text(time);
    $('.modal--my-address').removeClass('modal--active');
});
$('.btn--person').click(function(e) {
    e.preventDefault();
    var inp = $('input[name="modal-person"]:checked');
    var mail = $('input[name="modal-person"]:checked').val();
    var name = inp.siblings('.modal-change_data__label').text();
    var phone = inp.parent('.modal-change_data__radio').siblings('.modal-change_data__comment').text();

    $('.order-man>.order-type__name').text(name);
    $('.order-man>.order-type__date').text(phone);
    // вопрос по почте
    $('.order-man>.order-type__text').text(mail);
    $('.modal--persons').removeClass('modal--active');
});
$('.btn--auth').click(function() {
    $('.modal--auth').addClass('modal--active');
    $('body').addClass('body-modal');
    $('body').addClass('body-no-scroll');
});
$('.btn--code').click(function(e) {
    e.preventDefault();
    $('.modal--auth').removeClass('modal--active');
    $('.modal--code').addClass('modal--active');
});
$('.modal__back').click(function() {
    $('.modal--code').removeClass('modal--active');
    $('.modal--auth').addClass('modal--active');
});
$('.catalog__btn').click(function() {
    $('.catalog-content').toggleClass('catalog-content--active');
});
$('.header__media img[alt="menu"]').click(function() {
    $('.menu__media').toggleClass('menu__media--active');
});
$('.modal--moscow .btn-yes').click(function() {
    $('.modal--moscow').removeClass('modal--active');
    $('html').removeClass('body-no-scroll');
});
$('.modal--moscow .btn-no').click(function() {
    $('.modal--moscow').removeClass('modal--active');
    $('.modal--city').addClass('modal--active');
    $('html').addClass('body-no-scroll');
});
$('.modal--city .btn').click(function() {
    $('.modal--city').removeClass('modal--active');
    $('.modal--done').addClass('modal--active');
    $('html').addClass('body-no-scroll');
});
$(".input").change(function() {
    $(this).toggleClass('input--active');
});
$('.filter__category').click(function() {
    $('.filter__category').removeClass('filter__category--active');
    $(this).toggleClass('filter__category--active');
});
$('.brands__link').click(function(e) {
    e.preventDefault();
    $('.filter__brands--disable').removeClass("filter__brands--disable");
    $('.brands__link').css('display', 'none');
});
$('.card__icon').click(function(e) {
    e.preventDefault();
    $(this).toggleClass("card__icon--active");
    var count1 = $('.heart__num').text();
    if ($(this).hasClass('card__icon--active')) {
        count1++;
    } else {
        count1--;
    }
    $('.heart__num').text(count1);
});
$('.btn--basket').click(function(e) {
    e.preventDefault();
    $(this).parent('.card__bottom').css('display', 'none');
    $(this).parent('.card__bottom').siblings('.card__bottom--active').css('display', 'block');
    $(this).parent('.card__bottom').siblings('.slider').addClass('slider--active');
    var count = $('.basket__num').text();
    count++;
    $('.basket__num').text(count);
});
$('.btn--product').click(function() {
    $(this).css('display', 'none');
    $('.btn--link-basket').css('display', 'flex');
});
$('.btn--plus').click(function(e) {
    e.preventDefault();
    var count = $(this).siblings('.center').children('.center-num').text();
    count = parseInt(count) + 1;
    $(this).siblings('.center').children('.center-num').html(count);

    var count1 = $('.basket__num').text();
    count1++;
    $('.basket__num').text(count1);
});
$('.btn--minus').click(function(e) {
    e.preventDefault();
    var count = $(this).siblings('.center').children('.center-num').text();
    if (count == 1) {
        $(this).parent('.card__bottom').parent('.card__bottom--active').siblings('.slider').removeClass('slider--active');
        $(this).parent('.card__bottom').parent('.card__bottom--active').css('display', 'none');
        $(this).parent('.card__bottom').parent('.card__bottom--active').siblings('.card__bottom').css('display', 'flex');
    } else {
        count = parseInt(count) - 1;
    }
    $(this).siblings('.center').children('.center-num').html(count);

    var count1 = $('.basket__num').text();
    count1--;
    $('.basket__num').text(count1);
});
$('.product-card__color').click(function() {
    $('.product-card__color').removeClass('product-card__color--active');
    $(this).addClass('product-card__color--active');
    var name = $(this).attr('data-name');
    $('.product-card__name-color').text(name);
});
$('.product-card__title').click(function() {
    $(this).parent('.product-card__data').toggleClass('product-card__data--active');
});
$('.swiper_pagination_img').click(function() {
    $('.swiper_pagination_img').removeClass('swiper_pagination_img--active');
    $(this).addClass('swiper_pagination_img--active');
});
$('.item-li').click(function() {
    $('.item-li').removeClass('item-li--active');
    $(this).addClass('item-li--active');
    var number = $(this).index();
    $('.item-dop').removeClass('item-dop--active');
    $('.item-dop:eq(' + number + ')').addClass("item-dop--active");
});
const swiper = new Swiper('.slider', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
    },
    loop: false,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
});
const swiperProduct = new Swiper('.product-card__slider', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination-1',
        bulletClass: 'swiper_pagination_img',
        clickable: true,
        type: 'custom',
    },
    loop: true,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
});
const swiper1 = new Swiper('.hero__slider', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next5',
        prevEl: '.swiper-button-prev5',
    },
    loop: true,
    centeredSlides: true,
});

const swiper2 = new Swiper('.popular__slider', {
    slidesPerView: 5,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
    },
    loop: true,
    breakpoints: {
        1360: {
            slidesPerView: 5,
            centeredSlides: false,
        },
        1050: {
            slidesPerView: 4,
            centeredSlides: true,
        },
        680: {
            slidesPerView: 'auto',
        },
        0: {
            slidesPerView: 'auto',
        }
    }
});
const swiper0 = new Swiper('.popular__slider-1', {
    slidesPerView: 5,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next0',
        prevEl: '.swiper-button-prev0',
    },
    loop: true,
    breakpoints: {
        1360: {
            slidesPerView: 5,
        },
        1050: {
            slidesPerView: 4,
            centeredSlides: true,
        },
        680: {
            slidesPerView: 'auto',
        },
        0: {
            slidesPerView: 'auto',
        }
    }
});
const swiper3 = new Swiper('.sales__slider', {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
    loop: true,
    centeredSlides: false,
    breakpoints: {
        1360: {
            slidesPerView: 4,
        },
        1050: {
            slidesPerView: 3,
        },
        680: {
            slidesPerView: 3,
        },
        400: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1.5,
            centeredSlides: false,
        }
    }
});
const swiper4 = new Swiper('.brands__slider', {
    slidesPerView: 6,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper-button-next3',
        prevEl: '.swiper-button-prev3',
    },
    loop: true,
    centeredSlides: false,
    breakpoints: {
        1360: {
            slidesPerView: 5,
        },
        1050: {
            slidesPerView: 4,
        },
        680: {
            slidesPerView: 3,
        },
        0: {
            slidesPerView: 2,
        }
    }
});
const swiper5 = new Swiper('.blog__slider', {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper-button-next4',
        prevEl: '.swiper-button-prev4',
    },
    loop: true,
    centeredSlides: false,
    breakpoints: {
        1360: {
            slidesPerView: 4,
        },
        1050: {
            slidesPerView: 3,
        },
        680: {
            slidesPerView: 'auto',
        },
        0: {
            slidesPerView: 'auto',
        }
    }
});