$(function () {
    SignUp.init();
});

var SignUp = function () {
    var _form = '#sign-up-form';

    function validForm() {
        $(_form).validate({
            rules: {
                fullname: {required: true},
                username: {required: true},
                password: {required: true},
                password_confirm: {required: true},
                captcha: {required: true}
            },
            submitHandler: function (form) {
                jForm.post($(_form), function (res) {
                    if (res.status == 1) {
                        location.reload();
                    } else {
                        if (res.data.url_captcha != undefined) {
                            $('#img-captcha img').attr('src', res.data.url_captcha)
                            $('#captcha').val('');
                        }
                    }
                });
            }
        });
    }

    return {
        init: function () {
            this.events();
            validForm();
        },
        events: function () {
            $('#sign-up').on('show.bs.modal', function (e) {
                if ($('#main-navigation').hasClass('show')) {
                    $('.navbar-toggler').trigger('click');
                }
                $(_form)[0].reset();
            });

            $('#sign-up').on('hidden.bs.modal', function (e) {
                ajax.get($('#refresh-captcha').data('url'), function (res) {
                    $('#img-captcha img').attr('src', res.data.url)
                });
            })

            $('#refresh-captcha').click(function () {
                let that = $(this);
                ajax.get(that.data('url'), function (res) {
                    $('#img-captcha img').attr('src', res.data.url)
                });
            });
        }
    }
}();
