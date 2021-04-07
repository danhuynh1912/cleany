var popup = {
    confirm: function (message, callback) {
        bootbox.confirm({
            size: 'small',
            locale: window.global.lang,
            message: message,
            callback: function (result) {
                if (result) {
                    callback(result);
                }
            }
        });
    },
    alert: function (message) {
        bootbox.alert({
            message: message,
            size: 'small',
            locale: window.global.lang
        });
    },
    message: function (title, message, autoClose) {
        if (autoClose === undefined) autoClose = false;
        let modal = '#message-modal';
        $('.modal.fade.show').modal('hide');
        $(modal+' h2').html(title);
        $(modal+' p').html(message);
        $(modal).modal('show');
    }
};
