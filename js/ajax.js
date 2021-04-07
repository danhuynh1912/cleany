var ajax = {
    prepare: function (path, params1, params2) {
        var data = params2 == undefined ? null : params1;
        var callback = params2 == undefined ? params1 : params2;
        var method = 'POST';
        if (data != null && data._method != undefined) {
            method = data._method;
            delete data._method;
        }
        return {url: path, data: data, method: method, callback: callback};
    },
    get: function (path, params1, params2) {
        var params = this.prepare(path, params1, params2);
        $.get(params.url, params.data, function (res) {
            params.callback(res);
        }, 'json');
    },
    post: function (action, param1, param2) {
        var params = this.prepare(action, param1, param2);
        var method = 'POST';
        if (params.data != null) {
            var tmp_data = {};
            var list_data = typeof params.data !== 'object' ? $.parseParams(params.data) : params.data;
            $.each(list_data, function (i, val) {
                if (i != '_method') {
                    tmp_data[i] = val;
                }else{
                    method = val;
                }
            });
            params.data = tmp_data;
        }

        $.ajax({
            url: params.url,
            data: params.data,
            type: method,
            complete: function(response) {
                $('meta[name="csrf-token"]').attr('content', response.csrf_token);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': response.csrf_token
                    }
                });

                if (response.status == 422){
                    params.callback({status: 422, message: response.responseJSON.message, data: response.responseJSON.errors});
                }else{
                    params.callback(response.responseJSON);
                }

            }
        });
    },
    postJson: function (action, param1, param2) {
        var params = this.prepare(action, param1, param2);
        $.ajax({
            url: params.url,
            data: params.data,
            dataType: 'json',
            type: params.method,
            complete: function(response) {
                $('meta[name="csrf-token"]').attr('content', response.csrf_token);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': response.csrf_token
                    }
                });

                if (response.status == 422){
                    params.callback({status: 422, message: response.responseJSON.message, data: response.responseJSON.errors});
                }else{
                    params.callback(response.responseJSON);
                }

            }
        });
    },
    postFormData: function (action, param1, param2) {
        var params = this.prepare(action, param1, param2);

        $.ajax({
            type: params.method,
            url: params.url,
            data: params.data,
            contentType: false,
            cache: false,
            processData: false,
            complete: function(response) {
                $('meta[name="csrf-token"]').attr('content', response.csrf_token);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': response.csrf_token
                    }
                });

                if (response.status == 422){
                    params.callback({status: 422, message: response.responseJSON.message, data: response.responseJSON.errors});
                }else{
                    params.callback(response.responseJSON);
                }

            }
        });
    }
};
