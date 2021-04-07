$(function () {
    ForgotPassword.init();
});

var ForgotPassword = function () {
    var _form = '#forgot-password-form';

    function validForm() {
        $(_form).validate({
            rules: {
                username: {required: true},
                password: {required: true}
            },
            submitHandler: function (form) {
                jForm.post($(_form), function (res) {
                    if (res.status == 1) {
                        //location.reload();
                        popup.message(res.data.title, res.data.message, true);
                    }
                });
            }
        });
    }

    return {
        init: function () {
            validForm();
            $(_form+' button').click(function () {
                $(_form).submit();
            });
        }
    }
}();
