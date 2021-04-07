$(function () {
    if (window.global.cart_order == null) {
        window.global.cart_order = new CartOrder();
        window.global.cart_order.init();
    }
});

var CartOrder = function () {
    var _cart_menu = '.list-order-cart';
    var _cart = '#cart-list';

    var height_default = 0;
    var height_default_sub = 0;
    var height_resize = 0;

    function showCart(fetchData) {
        if (fetchData === undefined) {
            fetchData = false;
        }
        $(_cart_menu).addClass('active');
        if (fetchData) {
            loadCart();
        }
    }

    function loadCart(callback) {
        //$(_cart+' .summary').hide();
        //$(_cart).html('')
        ajax.get($(_cart).data('url-list'), function (res) {
            prepareHtml(res);

            if (callback != undefined) {
                callback(data);
            }
        });
    }

    function prepareHtml(res) {
        let data = res.data.list;
        $(_cart+' .badge').text(data.length);
        $(_cart+' #cart').attr('data-total', data.length);

        let html = $(_.template($('#template-cart').html())({data: data, height: height_resize}));
        $(' .total-cart p', html).text(numeral(res.data.total).format('0,0')+'đ');
        $(_cart+' #cart-list-content').html(html);
    }

    function removeCart(id) {
        ajax.post($(_cart).data('url-remove'), {id: id}, function (res) {
            if (res.status == 1) {
                let data = res.data.list;
                $(_cart+' .badge').text(data.length);
                $(_cart+' #cart').attr('data-total', data.length);
                $('#cart-item-'+id).remove();
                if (data.length == 0 || $('body').data('page') === 'payment') {
                    location.reload();
                }else{
                    prepareHtml(res);
                }
            }else{
                popup.alert(res.message);
            }
        });
    }

    return {
        init: function () {
            this.events();
            loadCart();
        },
        showCart: function () {
            showCart(true);
        },
        events: function () {
            $(document).on("click", function (event) {
                let that = $(event.target);
                if (that.attr('id') === 'cart') {
                    event.preventDefault();
                    return false;
                }
                if ($(_cart_menu).hasClass('active') && (!that.closest('.shopping-cart').length || that.hasClass('overlay'))) {
                    $(_cart_menu).removeClass('active');
                    //$(_cart+' #cart-list-content').html('');
                }
            });

            /* Cart */
            $("#cart").on("click", function () {
                let total = parseInt($(this).attr('data-total'));
                if (total > 0 && !$(_cart_menu).hasClass('active')){
                    showCart();
                }
            });
            $(_cart_menu+" .close").click(function () {
                $(_cart_menu).removeClass('active');
            });

            $(_cart).on('click', '.remove-cart-item', function () {
                let that = $(this).closest('.cart-item');
                let title = that.find('h6').text();
                let message = $(this).attr('data-confirm');
                message = message.replace(':name', title);
                popup.confirm(message, function () {
                    removeCart(that.attr('data-id'));
                });
            });

            $(_cart).on('click', '#cart-product-show', function () {
                $('#cart-dropdown > a').trigger('click');
                if ($('body').data('page') == 'order') {
                    $('html, body').animate({
                        scrollTop: $(".order-additional").offset().top
                    }, 300);
                }else{
                    $.cookie('product-show', 1, { expires: 7, path: '/' });
                    window.location = $(this).attr('data-url');
                }
            });

        }
    }
};
