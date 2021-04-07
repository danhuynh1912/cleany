var jForm = {
    reset: function (form) {
        if (typeof form !== 'object') {
            form = $(form);
        }
        var serializedForm = form.serialize();
        form[0].reset(); // resets everything except hidden fields


        var formFields = decodeURIComponent(serializedForm).split('&'); //split up the serialized form into variable pairs

        //put it into an associative array
        var splitFields = new Array();
        for(var i in formFields){
            var vals = formFields[i].split('=');
            splitFields[vals[0]] = vals[1];
        }
        form.find('input[type=hidden]').each(function(){
            this.value = '';
        });
    },
    post: function (form, callback, errorCallback) {
        if (typeof form !== 'object') {
            form = $(form);
        }

        if (form.find('button[type=submit]').length > 0) {
            form.find('button[type=submit]').attr('disabled', 'disabled').prepend('<span class="loader"></span>');
        }

        if (form.find('button.submit').length > 0) {
            form.find('button.submit').attr('disabled', 'disabled').prepend('<span class="loader"></span>');
        }

        var method = 'POST';

        var checkboxs = [];
        form.find('input[type=checkbox]').each(function () {
            var name = $(this).attr('name');
            checkboxs.push(name);
        });

        var data_form = form.serializeArray();

        var temp_data = [];
        $.each(data_form, function (i, val) {
            if (val.name != '_method') {
                var index = checkboxs.indexOf(val.name);
                if (index > -1) {
                    val.value = 1;
                    checkboxs = _.without(checkboxs, val.name);
                }
                temp_data.push(val)
            }else{
                method = val.value;
            }
        });

        $.each(checkboxs, function(i, v){
            temp_data.push({name: v, value: 0})
        });

        data_form = [];
        $.each(temp_data, function (i, val) {
            data_form.push(val);
        });
        data_form._method = method;

        ajax.postJson(form.attr('action'), data_form, function (res) {
            callback(res);
            form.find('.validation-invalid-label').remove();
            form.find('.validation-valid-label').remove();
            form.find('button[type=submit]').attr('disabled', null).find('.loader').remove();
            form.find('button.submit').attr('disabled', null).find('.loader').remove();

            if (res.status == 422) {
                $.each(res.data, function (name, message) {
                    var ele = null;
                    if ($('input[name='+name+']',form).length > 0) ele = $('input[name='+name+']', form);
                    else if ($('select[name='+name+']', form).length > 0) ele = $('select[name='+name+']', form);

                    if (ele != null) {
                        var parent = ele.parent();
                        if (parent.find('.validation-invalid-label').length > 0) {
                            parent.find('.validation-invalid-label').text(message);
                            parent.find('.validation-invalid-label').show();
                        }else{
                            parent.append('<label id="'+name+'-error" class="validation-invalid-label" for="'+name+'" style="display: block;">'+message+'</label>')
                        }
                    }
                })
            }
        });
    },
    loading: function (form, isLoading, button) {
        if (typeof form !== 'object') {
            form = $(form);
        }
        if (isLoading == undefined) {
            isLoading = true;
        }
        let cmdButton = null;
        if (button == undefined) {
            if (form.find('button[type=submit]').length > 0) {
                cmdButton = form.find('button[type=submit]');//.attr('disabled', 'disabled').prepend('<span class="loader"></span>');
            }

            if (form.find('button.submit').length > 0) {
                cmdButton = form.find('button.submit');//.attr('disabled', 'disabled').prepend('<span class="loader"></span>');
            }
        } else {
            cmdButton = form.find(button);
        }

        if (cmdButton != null) {
            if (isLoading) {
                cmdButton.attr('disabled', 'disabled').prepend('<span class="loader"></span>');
                if (button != undefined) {
                    cmdButton.addClass('submit');
                }
            } else {
                cmdButton.attr('disabled', null).find('.loader').remove();
                if (button != undefined) {
                    cmdButton.removeClass('submit');
                }
            }
        }
    }
}
