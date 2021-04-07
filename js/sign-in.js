$(function () {
    SignIn.init();
});

var SignIn = function () {
    var _form = '#sign-in-form';

    function validForm() {
        $(_form).validate({
            rules: {
                username: {required: true},
                password: {required: true}
            },
            submitHandler: function (form) {
                jForm.post($(_form), function (res) {
                    if (res.status == 1) {
                        location.reload();
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
            $('#sign-in').on('show.bs.modal', function (e) {
                if ($('#main-navigation').hasClass('show')) {
                    $('.navbar-toggler').trigger('click');
                }
                $(_form)[0].reset();
            });
        }
    }
}();
